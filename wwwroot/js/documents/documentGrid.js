"use strict";


const baseUrl = "https://tederikportaldocumentservice.azurewebsites.net/api/v1/deliverydocument/";


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

        this._documentType = "";
    }


    async getUpdateArray() {
        let request = {
            doctype: this._documentType,
            vendor: null,
            tobeconfirmedbyvendor : null,
            beggingdateforvaliduntildate:  null,
            enddateforvaliduntildate:  null
        }

        console.log(request);

        let data = await fetchData(this.baseUrl + this.getMethod, request);

        
        return data ? data.data : [];
    }

    setDocumentType(documentType){this._documentType = documentType;}
}



const saveDocumentData = async (documentType, filename, fileurl, validuntildate, sku, refcode, note) => {
    let vendor = sessionStorage[vendorKey];
    let email = sessionStorage[emailKey];

    let request = {
        "vendor": vendor,
        "doctype": {
            "typecode": documentType,
            "lang": "string",
            "definition": "string"
        },
        "upluser": email,
        "filename": filename,
        "fileurl": fileurl,
        "refcode": refcode,
        "tobeconfirmedbyvendor": "DONMEZ",
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
