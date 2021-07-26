const deliveryGrid = new DeliveryGrid("WAI", [
    { dataField: "asn", caption: "ASN" },
    { dataField: "vendor", caption: "Tedarikçi" },
    { dataField: "vendorname", caption: "Tedarikçi Adi" },
    { dataField: "fromPartner", caption: "Gelen Ortak" },
    { dataField: "toPartner", caption: "Giden Ortak" },
    { dataField: "plate", caption: "Son Teslim Tarihi" },
    { dataField: "tcvkn", caption: "TCVKN"}
]);

const orderGrid = new OrderGrid("PRC",  [
    { dataField: "vendor", caption: "Tedarikçi" },
    { dataField: "orderno", caption: "Siparis No" },
    { dataField: "orderlineno", caption: "Siparis Sira No" },
    { dataField: "orderdate", caption: "Siparis Tarihi" },
    { dataField: "orduser", caption: "Siparisi Veren Kullanici" },
    { dataField: "ordunit", caption: "Siparis Birimi" },
    { dataField: "sku", caption: "SKU" }
]);


const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");


searchButton.on("click", () => deliveryGrid.refreshButtonAction(searchButton));
refreshGridButton.on("click", () => deliveryGrid.refreshButtonAction(refreshGridButton));



deliveryGrid.updateGrid();
$("#chooseProductsModal").on('shown', ()=>orderGrid.updateGrid());