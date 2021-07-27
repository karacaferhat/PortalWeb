const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";

const asn = $("#asn");

class DeliveryGrid extends DataGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryGridContainer"
    } = {}) {

        super(baseUrl, 'getDelivery', "pkey", columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId
        });

        this.state = state;
        this._asn = "";
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

    setAsn(asn){
        this._asn.val()
    }
}