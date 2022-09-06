PosPrinter.getPrinters()
  .then((printers) =>
    printers.map((item, index) => {
      //write in the screen the printers for choose
      document.getElementById("list_printers").innerHTML +=
        ' <input type="radio" checked=' +
        !index +
        ' id="printer_' +
        index +
        '" name="printer" value="' +
        item.name +
        '"><label for="printer_' +
        index +
        '">' +
        item.name +
        "</label><br>";
    })
  )
  .catch((err) => console.error(err));

// TODO: allow to set it in demo
function getData() {
  return [];
}

function print() {
  let printerName;
  let widthPage;

  var p = document.getElementsByName("printer");
  var w = document.getElementsByName("width");

  for (var i = 0, length = p.length; i < length; i++) {
    if (p[i].checked) {
      printerName = p[i].value;

      break;
    }
  }

  for (var i = 0, length = w.length; i < length; i++) {
    if (w[i].checked) {
      widthPage = w[i].value;

      break;
    }
  }

  // TODO: allow to change options in demo
  const options = {
    preview: true, // Preview in window or print
    width: widthPage, //  width of content body
    margin: "10px", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };

  PosPrinter.print(getData(), options).catch((error) => {
    console.log(error);
  });
}
