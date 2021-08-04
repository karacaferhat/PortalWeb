"use strict";


class DeliveryGridWithItems extends DeliveryGrid {

    constructor(state, parentColumns, childColumns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryGridWithItemsContainer",
        key = "asn",
        exportEnabled = true,
        searchPanelEnabled = true,
    } = {}) {

        super(state, parentColumns, {
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
                                <div><h4>Sevkiyat No: ${currentDelivery.asn}</h4></div>
                            </div>
                            `)
                        .appendTo(container);


                    let itemGrid = await this._createItemGrid(currentDelivery.asn, childColumns);
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


        this._childColumns = childColumns;
    }

    async _createItemGrid(asn, childColumns = null) {
        if (childColumns === null)
            childColumns = this._childColumns;

        console.log(childColumns);
        let itemsGrid = new DeliveryItemsGrid("WAI", childColumns, {
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

        if (attachments) {
            attachments.forEach(a => {
                children +=
                    /*html*/
                    `<li><a href = "${blobStorageBaseUri + a.fileurl}"> ${a.filename} </li>`;
            });
        }

        return '<ul>' + children + '</ul>';
    }
}