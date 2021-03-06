"use strict";


const uploadAttachment = async (files, processType, documentType, asn, asnLine, oldAttachments) => {
    let vendor = sessionStorage[vendorKey];

    let result = await uploadFiles(files, processType, documentType, asn, asnLine);
    console.log(oldAttachments);

    let attachments = [];
    if (Number.isInteger(result)) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            let filePath = getFilePath(processType, file.name, vendor, documentType, asn, asnLine);
            let obj = {
                doctype: documentType,
                filename: file.name,
                fileurl: vendor + '/' + filePath
            };

            let exists = oldAttachments ? oldAttachments.find(o => o.fileurl === obj.fileurl) != undefined : false;

            if (!exists)
                attachments.push(obj);

        }
    }


    return attachments;
}



const convertOrdersToDeliveryItems = (orders, lastItemAsn, asn, lot, packageInput, quantity, attachments) => {
    let delivires = [];
    let i = lastItemAsn;
    orders.forEach(o => {
        delivires.push({
            "asn": asn,
            "asnline": `${++i}`,
            "crdate": o.orderdate,
            "order": o.id,
            "orderline": o.orderlineno,
            "sku": o.sku,
            "lot": lot,
            "package": packageInput,
            "skuname": o.skuname,
            "ordqty": o.ordqty,
            "ordunit": o.ordunit,
            "dlvqty": quantity,
            "dlvunit": o.ordunit,
            "lastdlvdate": o.orderdlvdate,
            "revno": "",
            "drwno": o.drwno,
            "drwrevdate": o.drwrevdate,
            "drwspecno ": o.drwspecno,
            "drwrevisionno": o.drwrevisionno,
            "lineattachments": attachments,
            "linenotes": [
                "string"
            ]
        });
    });


    return delivires;
}



const deleteDeliveryLines = async (items) => {
    let vendor = sessionStorage[vendorKey];
    let email = sessionStorage[emailKey];

    let failed = 0
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let request = {
            vendor: vendor,
            asn: item.asn,
            asnline: item.asnline,
            updUser: email
        };

        let result = await fetchData(baseUrl + "deleteline", request);

        if (result == null || !result.resultType) {
            failed++;
        }
    }

    return failed;
}



const createDelivery = async (newItems, oldItems, asn, packageInput, quantity, lot, deliveryCompany, deliveryType, deliveryDate, plateNo, taxNo, attachments, edispatchno, edispatchfile) => {
    let vendor = sessionStorage[vendorKey];
    let vendorName = sessionStorage[vendorNameKey];
    let email = sessionStorage[emailKey];


    let items = []
    let lastItemAsn = 0;

    if (oldItems) {
        items = items.concat(oldItems);
        lastItemAsn = Number.parseInt(oldItems[oldItems.length - 1].asnline);
    }

    newItems = convertOrdersToDeliveryItems(newItems, lastItemAsn, asn, lot, packageInput, quantity, []);
    items = items.concat(newItems);


    let request = {
        "vendor": vendor,
        "asn": asn,
        "updUser": emailKey,
        "delivery": {
            "id": asn,
            "pkey": asn,
            "asn": asn,
            "vendor": vendor,
            "vendorname": vendorName,
            "crdate": "2021-05-24T00:00:00.0000000Z",
            "cruser": email,
            "issdate": deliveryDate,
            "fromPartner": vendor,
            "toPartner": "DONMEZ",
            "state": "WAI",
            "items": items,
            "attachments": attachments,
            "edispatchno": edispatchno,
            "edispatchfile": edispatchfile,
            "transporttype": deliveryType,
            "transportcompany": deliveryCompany,
            "plate": plateNo,
            "tcvkn": taxNo,
            "notes": [
                "string"
            ]
        }
    };

    let data = await fetchData(baseUrl + "upsert", request);
    return data;
}



const updateFiles = async (asn, asnline, files, eirsailye, oldAttachments) => {
    let result = 0; //0 Yuklenmedi;  1 Dosyalar Yuklendi;    2 Eirsailye Yuklendi;   3 Ikiside yuklendi

    let vendor = sessionStorage[vendorKey];
    let email = sessionStorage[emailKey];
    let documentType = "DELV";
    let processType = "byDelivery";


    let attachments = null;
    if (files.length > 0) {
        attachments = await uploadAttachment(files, processType, documentType, asn, asnline, oldAttachments);
        let data = null;


        for (let i = 0; i < attachments.length; i++) {
            let a = attachments[i];
            let request = {
                "vendor": vendor,
                "asn": asn,
                "updUser": email,
                "fileurl": a.fileurl,
                "filename": a.filename
            };

            console.log(request);

            data = await fetchData(baseUrl + "addheaderAttachment", request);
            console.log(data);
        }

        if (data && data.resultType) result += 1;
    }


    if (eirsailye) {
        let edis = await uploadAttachment([eirsailye], processType, documentType, asn, asnline, []);
        console.log(edis);

        let request = {
            "vendor": vendor,
            "asn": asn,
            "updUser": email,
            "edispatchfilename": edis[0].filename,
            "edispatchfileUrl": edis[0].fileurl
        };


        let data = await fetchData(baseUrl + "addedispatch", request);

        if (data && data.resultType) result += 2;
    }

    return result;
}


const deleteHeaderAttachment = async (asn, fileurl, filename) => {
    let vendor = sessionStorage[vendorKey];
    let email = sessionStorage[emailKey];

    let request = {
        "vendor": vendor,
        "asn": asn,
        "updUser": email,
        "fileurl": fileurl,
        "filename": filename
    };

    let data = await fetchData(baseUrl + "deleteheaderAttachment", request);
    console.log(data);


    request = {
        vendor: vendor,
        fileurl: fileurl.replace(`${vendor}/`, '')
    };
    let result = await fetchData(documentServiceBaseUri + "deleteFile", request);
    console.log(result);


    await miniDeliveryGrid.updateGrid();
    let row = miniDeliveryGrid.selectedRows[0];
    updateUploadedFileList(row.attachments, row.edispatchno, row.edispatchfile);
}


const deleteEirsaliyeAttachment = async (asn, fileurl) => {
    let vendor = sessionStorage[vendorKey];
    let email = sessionStorage[emailKey];

    let request = {
        "vendor": vendor,
        "asn": asn,
        "updUser": email
    };

    let result = await fetchData(baseUrl + "deleteedispatch", request);


    request = {
        vendor: vendor,
        fileurl: fileurl.replace(`${vendor}/`, '')
    };
    result = await fetchData(documentServiceBaseUri + "deleteFile", request);



    await miniDeliveryGrid.updateGrid();
    let row = miniDeliveryGrid.selectedRows[0];
    updateUploadedFileList(row.attachments, row.edispatchno, row.edispatchfile);
}