class DeliveryGridWithItems extends DataGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryGridWithItemsContainer",
        key = ["asn", "asnline", "order", "orderline"]
    } = {}) {

        super(baseUrl, 'getDelivery', key, columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            masterDetail: {
                enabled: true,
                template: (container, options) => {
                    var currentDelivery = options.data;

                    $("<div>")
                        .addClass("master-detail-caption")
                        .html(
                            `
                            <div class="d-flex justify-content-center">
                                <div><h4>ASN: ${currentDelivery.asn}</h4></div>
                            </div>
                            <div class="d-flex justify-content-begin">
                                <div><h4>Siparisler</h4><div>
                            </div>
                            `)
                        .appendTo(container);


                    this._createItemGrid(currentDelivery).then(a => {
                        $("<div>").dxTabPanel({
                            items: [{
                                title: "Siparisler",
                                template: ()=>a
                            }]
                        }).appendTo(container);
                    });
                }
            }
        });

        this.state = state;
        this._asn = "";
    }

    async _createItemGrid(currentDelivery) {
        let itemsGrid = new DeliveryItemsGrid("WAI", [{
                dataField: "asn",
                caption: "Sevkiyat"
            },
            {
                dataField: "asnline",
                caption: "Sevkiyat Sirasi"
            },
            {
                dataField: "order",
                caption: "Siparis No"
            }
        ], {
            selectionMode: 'single',
            gridContainerId: "<div>",
            enableGrouping: false,
            exportEnabled: false,
            searchPanelEnabled: false
        });

        itemsGrid.setAsn(currentDelivery.asn);
        await itemsGrid.updateGrid();

        return itemsGrid.grid;
    }

    async getUpdateArray() {
        let request = {
            vendor: sessionStorage[vendorKey],
            state: this.state,
            asn: this._asn
        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        return data.data;
    }

    setAsn(asn) {
        this._asn = asn;
    }
}