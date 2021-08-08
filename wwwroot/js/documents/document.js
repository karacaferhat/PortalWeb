"use strict";



const baseUrl = "https://tederikportaldocumentservice.azurewebsites.net/api/v1/deliverydocument/";


$("#beggingDateFilter").dxDateBox({
    showClearButton: true,
    useMaskBehavior: true,
    displayFormat: dateFormat,
    type: "date",
});
$("#endDateFilter").dxDateBox({
    showClearButton: true,
    useMaskBehavior: true,
    displayFormat: dateFormat,
    type: "date",
});


const beggingDate = $("#beggingDateFilter").dxDateBox("instance");
const endDate = $("#endDateFilter").dxDateBox("instance");
const asn = $("#asnFilter");


class DocumentGrid extends DataGrid {
    constructor(columns, {
        enableGrouping = false,
        selectionMode = "multiple",
        gridContainerId = "#documentGridContainer",
        key = "pkey",
        exportEnabled = true,
        searchPanelEnabled = true,
        masterDetail = null
    } = {}) {
        super(baseUrl, 'listDocumentData', key, columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId,
            key: key,
            exportEnabled: exportEnabled,
            searchPanelEnabled: searchPanelEnabled,
            masterDetail: masterDetail
        });
    }


    async getUpdateArray() {
        let request = {
            vendor: sessionStorage[vendorKey],
            beggingdateforvaliduntildate: beggingDate ? beggingDate.option("value") : null,
            enddateforvaliduntildate: endDate ? endDate.option("value") : null,
            asn : asn ? asn.val() : null,

        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        
        return data ? data.data : null;
    }
}



const saveDocumentData = async (filename, fileurl, validuntildate, sku, refcode, note) => {
    let vendor = sessionStorage[vendorKey];
    let email = sessionStorage[emailKey];

    let request = {
        "vendor": vendor,
        "doctype": {
            "typecode": "string",
            "lang": "string",
            "definition": "string"
        },
        "upldate": "string",
        "upluser": email,
        "filename": filename,
        "fileurl": fileurl,
        "refcode": refcode,
        "pconf": "string",
        "tobeconfirmedbyvendor": "string",
        "validuntildate": validuntildate,
        "orderno": "string",
        "orderline": "string",
        "asn": "string",
        "asnline": "string",
        "sku": sku,
        "lot": "string",
        "revno": "string",
        "devid": "string",
        "devnoteid": note
    };

    
    let data = await fetchData(documentServiceBaseUri + "saveDocumentData", request);
    console.log(data);

    return data;
}
