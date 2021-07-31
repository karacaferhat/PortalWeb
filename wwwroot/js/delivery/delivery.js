const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";


class DeliveryGrid extends DataGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryGridContainer",
        key = ["asn", "asnline", "order", "orderline"]
    } = {}) {

        super(baseUrl, 'getDelivery', key, columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
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

        let items = [];
        data.data.forEach(d => {
            items = items.concat(Array.from(d.items));
        });

        return items;

    }

    setAsn(asn) {
        this._asn = asn;
    }
}

class MiniDeliveryGrid extends DeliveryGrid {
    constructor(state, columns, {
        enableGrouping = false,
        selectionMode = "single",
        gridContainerId = "#miniDeliveryGrid"
    } = {}) {

        super(state, columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            key: "asn"
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