$("#openPrintDialog").on("click", () => {
    JsBarcode("#barcode", "701480000156", {
        width: 3,
        height: 150
    });
   $("#printDialog").modal("toggle");   
});



