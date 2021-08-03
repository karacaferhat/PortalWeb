let deliveryGridWithItems = new DeliveryGridWithItems('WAI', [{
        dataField: "asn",
        caption: "Sevkiyat"
    },
    {
        dataField: "vendor",
        caption: "Tedarikçi"
    },
    {
        dataField: "vendorname",
        caption: "Tedarikçi Adi"
    }
]);

const refreshGridButton = $("#refreshGridButton");



refreshGridButton.on("click", () => deliveryGridWithItems.refreshButtonAction(refreshGridButton));

deliveryGridWithItems.updateGrid();