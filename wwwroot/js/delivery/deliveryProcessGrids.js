"use strict";


const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";


class DeliveryGrid extends DataGrid {
    constructor(state, columns, {
        enableGrouping = false,
        selectionMode = "single",
        gridContainerId = "#deliveryGridContainer",
        key = "asn",
        exportEnabled = true,
        searchPanelEnabled= true,
        masterDetail=null
    } = {}) {

        super(baseUrl, 'getDelivery', key, columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            key: key,
            exportEnabled: exportEnabled,
            searchPanelEnabled: searchPanelEnabled,
            masterDetail: masterDetail
        });

        this._state = state;
        this._asn = "";
    }

    async getUpdateArray() {
        let request = {
            vendor: sessionStorage[vendorKey],
            state: this._state,
            asn: this._asn
        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        
        return data ? data.data : null;
    }


    setAsn(asn) {
        this._asn = asn;
    }
}



class DeliveryItemsGrid extends DeliveryGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryItemsGridContainer",
        key = ["asn", "asnline", "order", "orderline"],
        exportEnabled = true,
        searchPanelEnabled = true,
        masterDetail=null
    } = {}) {

        super(state, columns, {
            key: key,
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            exportEnabled: exportEnabled,
            searchPanelEnabled: searchPanelEnabled,
            masterDetail: masterDetail
        });
    }

    async getUpdateArray() {
        let data = await super.getUpdateArray();
        
        if (data) {
            let items = [];
            data.forEach(d => {
                items = items.concat(Array.from(d.items));
            });

            return items;
        }
        return [];
    }
}