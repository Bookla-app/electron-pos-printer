/*
 * Copyright (c) 2019-2020. Author Hubert Formin <hformin@gmail.com>
 */

import { PosPrintData, PosPrintOptions } from "./models";

if ((process as any).type == "renderer") {
  throw new Error(
    'electron-pos-printer: use remote.require("electron-pos-printer") in render process'
  );
}

const { BrowserWindow, ipcMain } = require("electron");

export class PosPrinter {
  public static print(
    data: PosPrintData[],
    options: PosPrintOptions
  ): Promise<{ complete: boolean }> {
    return new Promise((resolve, reject) => {
      let printedState = false; // If the job has been printer or not
      let window_print_error: unknown = null; // The error returned if the printing fails
      let timeOutPerline = options.timeOutPerLine
        ? options.timeOutPerLine
        : 400;

      if (!options.preview || !options.silent) {
        setTimeout(() => {
          if (!printedState) {
            const errorMsg = window_print_error
              ? window_print_error
              : "TimedOut";
            reject(errorMsg);
            printedState = true;
          }
        }, timeOutPerline * data.length + 200);
      }

      let mainWindow = new BrowserWindow({
        // TODO: calculate correct preview page size based on options.pageSize
        width: 210,
        height: 1200,
        show: !!options.preview,
        webPreferences: {
          nodeIntegration: true, // For electron >= 4.0.0
          contextIsolation: false,
        },
      });

      mainWindow.on("closed", () => {
        ipcMain.removeAllListeners();
        mainWindow = null;
      });

      mainWindow.loadFile(__dirname + "/pos.html");

      mainWindow.webContents.on("did-finish-load", async () => {
        // start initialization of render process page
        await sendIpcMsg("body-init", mainWindow.webContents, options);

        // Render print data as html in the mainwindow render process
        return PosPrinter.renderPrintDocument(mainWindow, data)
          .then(() => {
            if (options.preview) {
              resolve({ complete: true });
              return;
            }
            mainWindow.webContents.print(
              {
                silent: !!options.silent,
                printBackground: true,
                deviceName: options.printerName,
                copies: options.copies ? options.copies : 1,
                pageSize: options.pageSize ? options.pageSize : "A4",
              },
              (success, err) => {
                if (err) {
                  window_print_error = err;
                  reject(err);
                }
                if (!printedState) {
                  resolve({ complete: success });
                  printedState = true;
                }
                mainWindow.close();
              }
            );
          })
          .catch((err) => {
            reject(err);
            mainWindow.close();
          });
      });
    });
  }

  private static renderPrintDocument(
    window: any,
    data: PosPrintData[]
  ): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      let finishedLines = 0;
      ipcMain.on("render-line-reply", function (event, result) {
        if (result.status) {
          finishedLines++;
          if (finishedLines === data.length) {
            // when the render process is done rendering the page, resolve
            resolve({ message: "page-rendered" });
          }
        } else {
          reject(result.error);
        }
      });
      data.forEach((line, lineIndex) => {
        if (line.type === "image" && !line.path) {
          reject(
            new Error("An Image path is required for type image").toString()
          );
          return;
        }
        window.webContents.send("render-line", { line, lineIndex });
      });
    });
  }
}

function sendIpcMsg(channel: string, webContents: any, arg: unknown) {
  return new Promise((resolve, reject) => {
    ipcMain.once(`${channel}-reply`, function (event, result) {
      if (result.status) {
        resolve(result);
      } else {
        reject(result.error);
      }
    });
    webContents.send(channel, arg);
  });
}
