PosPrinter.getPrinters()
  .then((printers) =>
    printers.map((item, index) => {
      // list detected printers in the screen
      document.getElementById("list_printers").innerHTML +=
        ' <input type="radio" id="printer_' +
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

function print(isPreview) {
  let printerName;
  let data;

  const p = document.getElementsByName("printer");
  const contentMargin = document.getElementById("margin").value;
  const dataText = document.getElementById("data").value;
  const pageWidth = document.getElementById("pageWidth").value;
  const pageHeight = document.getElementById("pageHeight").value;

  try {
    data = JSON.parse(dataText);
  } catch (error) {
    console.error(error);
    alert(`Invalid data: ${error.message}`);
    return;
  }

  for (var i = 0, length = p.length; i < length; i++) {
    if (p[i].checked) {
      printerName = p[i].value;

      break;
    }
  }

  const options = {
    preview: isPreview,
    margin: contentMargin,
    copies: 1,
    printerName,
    timeOutPerLine: 400,
    silent: true,
    pageSize: {
      height: +pageHeight,
      width: +pageWidth,
    },
  };

  console.log("options", options);

  PosPrinter.print(data, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}
