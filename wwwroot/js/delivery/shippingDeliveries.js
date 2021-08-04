let deliveryGridWithItems = new DeliveryGridWithItems('TRA',
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

                if(link)
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