const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";


class DeliveryItemsGrid extends DataGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryItemsGridContainer",
        key = ["asn", "asnline", "order", "orderline"],
        exportEnabled = true,
        searchPanelEnabled = true,
        masterDetail=null
    } = {}) {

        super(baseUrl, 'getDelivery', key, columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            exportEnabled: exportEnabled,
            searchPanelEnabled: searchPanelEnabled,
            masterDetail: masterDetail
        });

        this.state = state;
        this._asn = "";
    }

    async getUpdateArray() {
        let request = {
            vendor: sessionStorage[vendorKey],
            state: this.state,
            asn: this._asn
        };
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        if (data) {
            let items = [];
            data.data.forEach(d => {
                items = items.concat(Array.from(d.items));
            });

            return items;
        }
        return [];
    }

    setAsn(asn) {
        this._asn = asn;
    }
}

class DeliveryGrid extends DeliveryItemsGrid {
    constructor(state, columns, {
        enableGrouping = false,
        selectionMode = "single",
        gridContainerId = "#deliveryGridContainer",
        exportEnabled = true,
        searchPanelEnabled= true,
        masterDetail=null
    } = {}) {

        super(state, columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            key: "asn",
            exportEnabled: exportEnabled,
            searchPanelEnabled: searchPanelEnabled,
            masterDetail: masterDetail
        });
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
}