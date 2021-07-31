const uploadAttachment = async (files, processType, documentType, asn, asnLine) => {
    let vendor = sessionStorage[vendorKey];

    let result = await uploadFiles(files, processType, documentType, asn, asnLine);

    attachments = [];
    if (Number.isInteger(result)) {
        files.forEach(file => {
            let filePath = vendor + '/' + getFilePath(processType, file.name, vendor, documentType, asn, asnLine);
            attachments.push({
                doctype: documentType,
                filename: file.name,
                fileurl: filePath
            });
        });
    }


    return attachments;
}



const convertOrdersToDeliveryItems = (orders, lastItemAsn, asn, lot, package, quantity, attachments) => {
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
            "package": package,
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
    let vendorName = sessionStorage[vendorNameKey];

    let failed = 0
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let request = {
            vendor: vendor,
            asn: item.asn,
            asnline: item.asnline,
            updUser: vendorName
        };

        let result = await fetchData(baseUrl + "deleteline", request);

        if (result == null || !result.resultType) {
            failed++;
        }
    }

    return failed;
}



const createDelivery = async (newItems, oldItems, asn, package, quantity, lot, deliveryCompany, deliveryType, deliveryDate, plateNo, taxNo, attachments, edispatchno, edispatchfile) => {
    let vendor = sessionStorage[vendorKey];
    let vendorName = sessionStorage[vendorNameKey];


    let items = []
    let lastItemAsn = 0;

    if (oldItems) {
        items = items.concat(oldItems);
        lastItemAsn = Number.parseInt(oldItems[oldItems.length - 1].asnline);
    }

    newItems = convertOrdersToDeliveryItems(newItems, lastItemAsn, asn, lot, package, quantity, []);
    items = items.concat(newItems);


    let request = {
        "vendor": vendor,
        "asn": asn,
        "updUser": vendorName,
        "delivery": {
            "id": asn,
            "pkey": asn,
            "asn": asn,
            "vendor": vendor,
            "vendorname": vendorName,
            "crdate": "2021-05-24T00:00:00.0000000Z",
            "cruser": vendorName,
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

    console.log(request);
    let data = await fetchData(baseUrl + "upsert", request);
    return data;
}



const updateFiles = async (asn, asnline, files, eirsailye) => {
    let result = 0; //0 Yuklenmedi;  1 Dosyalar Yuklendi;    2 Eirsailye Yuklendi;   3 Ikiside yuklendi

    let vendor = sessionStorage[vendorKey];
    let vendorName = sessionStorage[vendorNameKey];
    let documentType = "fromDeliveryProcess";
    let processType = "byDeliveryLine";


    let attachments = null;
    if (files.length > 0) {
        attachments = await uploadAttachment(files, processType, documentType, asn, asnline);
        let data = null;

        attachments.forEach(async a => {
            let request = {
                "vendor": vendor,
                "asn": asn,
                "updUser": vendorName,
                "fileurl": a.fileurl,
                "filename": a.filename
            };


            data = await fetchData(baseUrl + "addheaderAttachment", request);
        });
        
        if (data && data.resultType) result += 1;
    }


    if (eirsailye) {
        let edis = await uploadAttachment([eirsailye], processType, documentType, asn, asnline);


        let request = {
            "vendor": vendor,
            "asn": asn,
            "updUser": vendorName,
            "edispatchfilename": edis[0].filename,
            "edispatchfileUrl": edis[0].fileurl
        };


        let data = await fetchData(baseUrl + "addedispatch", request);

        if (data && data.resultType) result += 2;
    }

    return result;
}