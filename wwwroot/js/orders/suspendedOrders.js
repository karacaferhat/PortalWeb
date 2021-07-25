const orderGrid = new OrderGrid("SUS",  [
    { dataField: "vendor", caption: "Tedarikçi" },
    { dataField: "orderno", caption: "Siparis No" },
    { dataField: "orderlineno", caption: "Siparis Sira No" },
    { dataField: "orderdate", caption: "Siparis Tarihi" },
    { dataField: "orduser", caption: "Siparisi Veren Kullanici" },
    { dataField: "ordunit", caption: "Siparis Birimi" },
    { dataField: "sku", caption: "SKU" }
]);


const waitingButton = $("#waitingButton");
const cancelButton = $("#cancelButton");

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");


waitingButton.on("click", () => {orderGrid.sendData(waitingButton, "suspend", $("waitingReasonText").val(), true);});
cancelButton.on("click", () => { orderGrid.sendData(cancelButton, "cancel", $("#cancelReasonText").val()) });

searchButton.on("click", () => orderGrid.refreshButtonAction(searchButton));
refreshGridButton.on("click", () => orderGrid.refreshButtonAction(refreshGridButton));


$("#waitingModalToggleButton").on("click", () => { toggleModal("#waitingModal") });
$("#cancelModalToggleButton").on("click", () => { toggleModal("#cancelModal") });


orderGrid.getOrdersAndUpdateTable();