"use strict";


const orderGrid = new OrderGrid("SUS",  [
    { dataField: "vendor", caption: "Tedarikçi" },
    { dataField: "orderno", caption: "Siparis No" },
    { dataField: "orderlineno", caption: "Siparis Sira No" },
    { dataField: "orderdate", caption: "Siparis Tarihi" },
    { dataField: "orduser", caption: "Siparisi Veren Kullanici" },
    { dataField: "ordunit", caption: "Siparis Birimi" },
    { dataField: "sku", caption: "Ürün Kodu" }
]);


const waitingButton = $("#waitingButton");
const cancelButton = $("#cancelButton");

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");


waitingButton.on("click", () => {orderGrid.sendData(waitingButton, "suspend", $("waitingReasonText").val(), true);});
cancelButton.on("click", () => { orderGrid.sendData(cancelButton, "cancel", $("#cancelReasonText").val()) });

searchButton.on("click", () => orderGrid.refreshButtonAction(searchButton));
refreshGridButton.on("click", () => orderGrid.refreshButtonAction(refreshGridButton));


$("#waitingModalToggleButton").on("click", () => { orderGrid.showModal("#waitingModal") });
$("#cancelModalToggleButton").on("click", () => { orderGrid.showModal("#cancelModal") });


orderGrid.updateGrid();