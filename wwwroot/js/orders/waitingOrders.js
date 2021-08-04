const orderGrid = new OrderGrid("WAI",  [
    { dataField: "vendor", caption: "Tedarikçi" },
    { dataField: "orderno", caption: "Siparis No" },
    { dataField: "orderlineno", caption: "Siparis Sira No" },
    { dataField: "orderdate", caption: "Siparis Tarihi" },
    { dataField: "orduser", caption: "Siparisi Veren Kullanici" },
    { dataField: "ordunit", caption: "Siparis Birimi" },
    { dataField: "sku", caption: "Ürün Kodu" }
]);

const acceptButton = $("#acceptButton");
const cancelButton = $("#cancelButton");
const suspendButton = $("#suspendButton");

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");

acceptButton.on("click", () => { orderGrid.sendData(acceptButton, "accept") });
cancelButton.on("click", () => { orderGrid.sendData(cancelButton, "cancel", $("#cancelReasonText").val()) });
suspendButton.on("click", () => { orderGrid.sendData(suspendButton, "suspend", $("#suspendReasonText").val()) });

searchButton.on("click", () => orderGrid.refreshButtonAction(searchButton));
refreshGridButton.on("click", () => orderGrid.refreshButtonAction(refreshGridButton));


$("#acceptModalToggleButton").on("click", () => { orderGrid.showModal("#acceptModal") });
$("#cancelModalToggleButton").on("click", () => { orderGrid.showModal("#cancelModal") });
$("#suspendModalToggleButton").on("click", () => { orderGrid.showModal("#suspendModal") });


orderGrid.updateGrid();