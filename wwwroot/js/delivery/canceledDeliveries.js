let deliveryGridWithItems = new DeliveryGridWithItems('CAN',
    [{
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
            caption: "E-Irsaliye",
            dataField: "edispatchfile",
            cellTemplate: function (container, options) {
                let link = options.value;

                if (link)
                    $(`<a> ${link.split('/').pop()} </a>`)
                    .attr('href', blobStorageBaseUri + link)
                    .attr('target', '_blank')
                    .appendTo(container);
                else
                    $('').appendTo(container);
            }
        }
    ],
    [{
            dataField: "asnline",
            caption: "Sevkiyat Sırası"
        },
        {
            dataField: "sku",
            caption: "SKU"
        },
        {
            dataField: "skuname",
            caption: "SKU Adi"
        },
        {
            dataField: "ordqty",
            caption: "Siparis Miktari"
        },
        {
            dataField: "ordunit",
            caption: "Siparis Miktar Birimi"
        },
        {
            dataField: "dlvqty",
            caption: "Sevkiyat Miktari"
        },
        {
            dataField: "dlvunit",
            caption: "Sevkiyat Miktari"
        },
        {
            dataField: "revno",
            caption: "Revizyon Numarasi"
        }
    ], {
        selectionMode: 'single'
    });

const refreshGridButton = $("#refreshGridButton");



refreshGridButton.on("click", () => deliveryGridWithItems.refreshButtonAction(refreshGridButton));

deliveryGridWithItems.updateGrid();