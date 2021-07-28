const uploadAttachment = async (file, documentType, processType, asn, asnLine)=>{
    let vendor = sessionStorage[vendorKey];  
  
    let result = await uploadFiles([file], documentType, processType, asn, asnLine);
    if (Number.isInteger(result)) {
      if (result === 0) {
        let filePath = vendor + '/' + getFilePath(processType, file.name, vendor, documentType, asn, asnLine);
      }
    }
}


const createDelivery = async (items, files, asn, package, quantity, lot)=>{
    let vendor = sessionStorage[vendorKey];
    let vendorName = sessionStorage[vendorNameKey];
    let documentType = "byDeliveryLine";
    let processType = "fromDeliveryProcess";


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
          "issdate": "2021-07-19T19:08:16.6651583Z",
          "fromPartner": vendor,
          "toPartner": "000000",
          "state": "WAI",
          "items": [
              {
                  "asn": asn,
                  "asnline": "1",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": lot,
                  "package": package,
                  "skuname": "string",
                  "ordqty": 1,
                  "ordunit": "string",
                  "dlvqty": quantity,
                  "dlvunit": "string",
                  "lastdlvdate": "string",
                  "revno": "string",
                  "drwno": "string",
                  "drwspecno ": "string",
                  "drwrevisionno": "string",
                  "lineattachments": [
                      {
                          "doctype": "string",
                          "filename": "string",
                          "fileurl": "string"
                      }
                  ],
                  "linenotes": [
                      "string"
                  ]
              },
              {
                  "asn": asn,
                  "asnline": "4",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": lot,
                  "package": package,
                  "skuname": "string",
                  "ordqty": 0,
                  "ordunit": "string",
                  "dlvqty": 0,
                  "dlvunit": "string",
                  "lastdlvdate": "string",
                  "revno": "string",
                  "drwno": "string",
                  "drwspecno ": "string",
                  "drwrevisionno": "string",
                  "lineattachments": [
                      {
                          "doctype": "string",
                          "filename": "string",
                          "fileurl": "string"
                      }
                  ],
                  "linenotes": [
                      "string"
                  ]
              },
              {
                  "asn": asn,
                  "asnline": "5",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": lot,
                  "package": package,
                  "skuname": "string",
                  "ordqty": 0,
                  "ordunit": "string",
                  "dlvqty": 0,
                  "dlvunit": "string",
                  "lastdlvdate": "string",
                  "revno": "string",
                  "drwno": "string",
                  "drwspecno ": "string",
                  "drwrevisionno": "string",
                  "lineattachments": [
                      {
                          "doctype": "string",
                          "filename": "string",
                          "fileurl": "string"
                      }
                  ],
                  "linenotes": [
                      "string"
                  ]
              },
              {
                  "asn": asn,
                  "asnline": "6",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": lot,
                  "package": package,
                  "skuname": "string",
                  "ordqty": 0,
                  "ordunit": "string",
                  "dlvqty": 0,
                  "dlvunit": "string",
                  "lastdlvdate": "string",
                  "revno": "string",
                  "drwno": "string",
                  "drwspecno ": "string",
                  "drwrevisionno": "string",
                  "lineattachments": [
                      {
                          "doctype": "string",
                          "filename": "string",
                          "fileurl": "string"
                      }
                  ],
                  "linenotes": [
                      "string"
                  ]
              }
          ],
          "attachments": [
              {
                  "doctype": "string",
                  "filename": "string",
                  "fileurl": "string"
              }
          ],
          "edispatchno": "string",
          "edispatchfile": "string",
          "transporttype": "string",
          "transportcompany": "string",
          "plate": "string",
          "tcvkn": "string",
          "notes": [
              "string"
          ]
      
        }
    };

    let data = await fetchData(baseUrl + "upsert", request);
    console.log(data);


    let attachments = [];
    for (const file in files) {
        let data = await uploadAttachment(file, documentType, processType, asn);
        console.log(data);
        attachments.push(data);
    }
}