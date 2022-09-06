/*
 * Copyright (c) 2019-2020. Author Hubert Formin <hformin@gmail.com>
 */
export interface PosPrintOptions {
  /**
   * number of copies to print
   */
  copies?: number;
  /**
   * preview in a window, default is false
   */
  preview?: boolean;
  /**
   * the printer's name
   */
  printerName?: string;
  /**
   * margin of a page, css values can be used
   */
  margin?: string;
  /**
   *  timeout per line, default is 400
   */
  timeOutPerLine?: number;
  /**
   * To print silently without printer selection pop-up, default is true
   */
  silent?: boolean;
  /**
   * Specify the width and height of the print out page, default is A4
   */
  pageSize?: SizeOptions;
}

export interface SizeOptions {
  height: number;
  width: number;
}
/**
 * @type PosPrintPosition
 * @description Alignment for type barCode and qrCode
 *
 */
export declare type PosPrintPosition = "left" | "center" | "right";
/**
 * @interface
 * @name PosPrintTableField
 * */
export interface PosPrintTableField {
  type: "text" | "image";
  value?: string;
  path?: string;
  css?: any;
  style?: string;
  width?: string; // for type image
  height?: string; // for type image
}

/**
 * @interface
 * @name PosPrintData
 * **/
export interface PosPrintData {
  /**
   * @property type
   * @description type data to print: 'text' | 'barCode' | 'qrcode' | 'image' | 'table'
   */
  type: PosPrintType;
  value?: string;
  css?: any;
  style?: string;
  width?: string;
  height?: string;
  fontsize?: number; // for barcodes
  displayValue?: boolean; // for barcodes
  position?: PosPrintPosition; // for type image, barcode and qrCode; values: 'left'| 'center' | 'right'
  path?: string; // image path
  tableHeader?: PosPrintTableField[] | string[]; // specify the columns in table header, to be used with type table
  tableBody?: PosPrintTableField[][] | string[][]; //  specify the columns in table body, to be used with type table
  tableFooter?: PosPrintTableField[] | string[]; //  specify the columns in table footer, to be used with type table
  tableHeaderStyle?: string; // (type table), set custom style for table header
  tableBodyStyle?: string; // (type table), set custom style for table body
  tableFooterStyle?: string; // (type table), set custom style for table footer
}
/**
 * @type PosPrintType
 * @name PosPrintType
 * **/
export declare type PosPrintType =
  | "text"
  | "barCode"
  | "qrCode"
  | "image"
  | "table";
