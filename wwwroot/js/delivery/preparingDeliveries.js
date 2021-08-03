let deliveryGridWithItems = new DeliveryGridWithItems('WAI', [{
        dataField: "asn",
        caption: "Sevkiyat No"
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
        dataField: "edispatchno",
        caption: "E-Irsaliye Dosya Adi"
    },
    {
        caption: "Indir",
        dataField: "edispatchfile",
        cellTemplate: function (container, options) {
            $('<a> Indir  </a>')
                .attr('href', blobStorageBaseUri + options.value)
                .attr('target', '_blank')
                .appendTo(container);
        }
    }
], {selectionMode: 'single'});

const refreshGridButton = $("#refreshGridButton");



refreshGridButton.on("click", () => deliveryGridWithItems.refreshButtonAction(refreshGridButton));

deliveryGridWithItems.updateGrid();