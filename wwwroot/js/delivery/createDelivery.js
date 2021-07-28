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


const convertOrdersToDeliveryItems = (orders, asn, asnline, lot, package, quantity, attachments) => {
    delivires = [];
    orders.forEach(o => {
        delivires.push({
            "asn": asn,
            "asnline": asnline,
            "crdate": o.orderdate,
            "order": o.orderno,
            "orderline": o.orderlineno,
            "sku": o.sku,
            "lot": lot,
            "package": package,
            "skuname": o.skuname,
            "ordqty": o.qty,
            "ordunit": o.ordunit,
            "dlvqty": quantity,
            "dlvunit": o.ordunit,
            "lastdlvdate": o.orderdlvdate,
            "revno": o.revno,
            "drwno": o.drwno,
            "drwdate" : o.drwrevdate,
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


const createDelivery = async (items, files, asn, asnline, package, quantity, lot, deliveryCompany, deliveryType, deliveryDate, plateNo, taxNo) => {
    let vendor = sessionStorage[vendorKey];
    let vendorName = sessionStorage[vendorNameKey];
    let documentType = "fromDeliveryProcess";
    let processType = "byDeliveryLine";

    let attachments = null;
    if(files.length > 0)
        attachments = await uploadAttachment(files, processType, documentType, asn, asnline);

    items = convertOrdersToDeliveryItems(items, asn, asnline, lot, package, quantity, attachments);

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
            "edispatchno": "string",
            "edispatchfile": "string",
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
    console.log(data);

}