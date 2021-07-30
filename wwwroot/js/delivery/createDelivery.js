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



const convertOrdersToDeliveryItems = (orders, oldItemsLength, asn, asnline, lot, package, quantity, attachments) => {
    delivires = [];
    let i = oldItemsLength;
    orders.forEach(o => {
        console.log(o);
        delivires.push({
            "asn": asn,
            "asnline": `${i++}`,
            "crdate": o.lastdlvdate,
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
            "revno": o.revno,
            "drwno": o.drwno,
            "drwdate": o.drwrevdate,
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



const deleteDeliveryLines = async (asn, items) => {
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
        console.log(request);
        let result = await fetchData(baseUrl + "deleteline", request);

        if (result == null || !result.resultType) {
            console.log(result);
            failed++;
        }
    }

    return failed;
}


const createDelivery = async (newItems, oldItems, files, eirsailye, asn, asnline, package, quantity, lot, deliveryCompany, deliveryType, deliveryDate, plateNo, taxNo) => {
    let vendor = sessionStorage[vendorKey];
    let vendorName = sessionStorage[vendorNameKey];
    let documentType = "fromDeliveryProcess";
    let processType = "byDeliveryLine";

    let attachments = null;
    if (files.length > 0)
        attachments = await uploadAttachment(files, processType, documentType, asn, asnline);

    let edis = null
    if (eirsailye)
        edis = await uploadAttachment([eirsailye], processType, documentType, asn, asnline);


    items = []

    if (oldItems)
        items = items.concat(oldItems);

    newItems = convertOrdersToDeliveryItems(newItems, oldItems ? oldItems.length : 0, asn, asnline, lot, package, quantity, attachments);
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
            "edispatchno": edis ? edis[0].filename : null,
            "edispatchfile": edis ? edis[0].fileurl : null,
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