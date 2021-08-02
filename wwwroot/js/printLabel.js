$("#openPrintDialog").on("click", () => {
    let row = deliveryGrid.selectedRows[0];


    JsBarcode("#barcode", row.package, {
        width: 4,
        height: 100
    });

    $("#printPackage").html(row.package);
    $("#printOrderNo").html(row.order);
    $("#printSku").html(row.sku);
    $("#printSkuName").html(row.skuname);
    $("#printQuantity").html(`${row.ordqty} - ${row.ordunit}`);
    $("#printLot").html(row.lot);
    $("#printVendor").html(row.vendor);

    $("#printDialog").modal("toggle");
});