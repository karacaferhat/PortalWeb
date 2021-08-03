let deliveryGridWithItems = new DeliveryGridWithItems('WAI', [{
        dataField: "asn",
        caption: "Sevkiyat No",
        cellTemplate: function (container, options) {
            $(`<a> ${options.value} </a>`)
                .attr('href', "/Delivery/DeliveryProcess#" + options.value)
                .appendTo(container);
        }
    },
    {
        dataField: "transportcompany",
        caption: "Tasima Sirketi"
    },
    {
        dataField: "transporttype",
        caption: "Tasima Turu"
    },
    {
        dataField: "issdate",
        caption: "Sevkiyat Tarihi"
    },
    {
        caption: "E-Irsaliye",
        dataField: "edispatchfile",
        cellTemplate: function (container, options) {
            $(`<a> ${options.value.split('/').pop()} </a>`)
                .attr('href', blobStorageBaseUri + options.value)
                .attr('target', '_blank')
                .appendTo(container);
        }
    }
], {selectionMode: 'single'});

const refreshGridButton = $("#refreshGridButton");



refreshGridButton.on("click", () => deliveryGridWithItems.refreshButtonAction(refreshGridButton));

deliveryGridWithItems.updateGrid();