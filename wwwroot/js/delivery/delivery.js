const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";


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
    }

    async getUpdateArray() {
        let request = {
            vendor: sessionStorage[vendorKey],
            state: this.state,
            asn: "701480-2021-00001" //asn.val()
        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        return data.data;
    }

}