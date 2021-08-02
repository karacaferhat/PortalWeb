$("#openPrintDialog").on("click", () => {
    JsBarcode("#barcode", "701480000156", {
        width: 4,
        height: 100
    });
   $("#printDialog").modal("toggle");   
});



