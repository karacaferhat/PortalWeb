class DeliveryGridWithItems extends DeliveryGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryGridWithItemsContainer",
        key = "asn",
        exportEnabled = true,
        searchPanelEnabled = true,
    } = {}) {

        super(state, columns, {
            key: key,
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            exportEnabled: exportEnabled,
            searchPanelEnabled: searchPanelEnabled,
            masterDetail: {
                enabled: true,
                template: async (container, options) => {
                    var currentDelivery = options.data;

                    $("<div>")
                        .addClass("master-detail-caption")
                        .html(
                            `
                            <div class="d-flex justify-content-center">
                                <div><h4>ASN: ${currentDelivery.asn}</h4></div>
                            </div>
                            `)
                        .appendTo(container);


                    let itemGrid = await this._createItemGrid(currentDelivery.asn);
                    let attachmentsList = this._createAttachementsSection(currentDelivery.attachments);


                    $("<div>").dxTabPanel({
                        items: [{
                            title: "Urunler",
                            template: () => itemGrid
                        }, {
                            title: "Dosya Ekleri",
                            template: () => attachmentsList
                        }]
                    }).appendTo(container);
                }
            }
        });
    }

    async _createItemGrid(asn) {
        let itemsGrid = new DeliveryItemsGrid("WAI", [{
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
            selectionMode: 'single',
            gridContainerId: "<div>",
            enableGrouping: false,
            exportEnabled: false,
            searchPanelEnabled: false
        });

        itemsGrid.setAsn(asn);
        await itemsGrid.updateGrid();

        return itemsGrid.grid;
    }

    _createAttachementsSection(attachments) {
        let children = "";

        console.log(attachments)
        attachments.forEach(a => {
            children +=
                /*html*/
                `<li><a href = "${blobStorageBaseUri + a.fileurl}"> ${a.filename} </li>`;
        });

        return '<ul>' + children + '</ul>';
    }
}