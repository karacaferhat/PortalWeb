let deliveryGridWithItems = new DeliveryGridWithItems('WAI',
    [{
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
    ],
    [{
            dataField: "asn",
            caption: "Sevkiyat"
        },
        {
            dataField: "asnline",
            caption: "Sevk Satır No"
        },
        {
            dataField: "crdate",
            caption: "Oluşturulma Tarihi"
        },
        {
            dataField: "order",
            caption: "Sipariş"
        },
        {
            dataField: "sku",
            caption: "Ürün Kodu"
        },
        {
            dataField: "skuname",
            caption: "Ürün Adı"
        },
        {
            dataField: "ordqty",
            caption: "Sipariş Miktari"
        },
        {
            dataField: "ordunit",
            caption: "Sipariş Birimi"
        },
        {
            dataField: "dlvqty",
            caption: "Sevk Miktari"
        },
        {
            dataField: "dlvunit",
            caption: "Sevk Birimi"
        },
        {
            dataField: "lastdlvdate",
            caption: "Son Gönderim Tarihi"
        },
        {
            dataField: "package",
            caption: "Paket No"
        }
    ], {
        selectionMode: 'single'
    });

const refreshGridButton = $("#refreshGridButton");



refreshGridButton.on("click", () => deliveryGridWithItems.refreshButtonAction(refreshGridButton));

deliveryGridWithItems.updateGrid();