const uploadAttachment = async (file, documentType, processType, asn, asnLine)=>{
    let vendor = sessionStorage[vendorKey];  
  
    let result = await uploadFiles([file], documentType, processType, asn, asnLine);
    if (Number.isInteger(result)) {
      if (result === 0) {
        let filePath = vendor + '/' + getFilePath(processType, file.name, vendor, documentType, asn, asnLine);
  
        let request = {
          vendor: vendor,
          asn: asn,
          asnline: asnLine,
          updUser: vendor,
          filename: file.name,
          fileurl: filePath
        }
        let data = await fetchData(baseUrl + 'additemAttachment', request);
        console.log(data);
      }
    }
}


const createDelivery = async (file)=>{
    let documentType = "byDeliveryLine";
    let processType = "fromDeliveryProcess";
    let asn = "12345";
    let asnLine = "1";

    await uploadAttachment(file, documentType, processType, asn, asnLine);

    let request = {
        "vendor": "701480",
        "asn": "701480-2021-00002",
        "updUser": "ferhat.karaca@gmail.com",
        "delivery": {
        "id": "701480-2021-00002",
          "pkey": "701480-2021-00002",
          "asn": "701480-2021-00002",
          "vendor": "701480",
          "vendorname": "ABC Makina",
          "crdate": "2021-05-24T00:00:00.0000000Z",
          "cruser": "ferhat.karaca@gmail.com",
          "issdate": "2021-07-19T19:08:16.6651583Z",
          "fromPartner": "701480",
          "toPartner": "000000",
          "state": "WAI",
          "items": [
              {
                  "asn": "701480-2021-00002",
                  "asnline": "1",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": "string",
                  "package": "string",
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
                  "asn": "701480-2021-00002",
                  "asnline": "4",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": "string",
                  "package": "string",
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
                  "asn": "701480-2021-00002",
                  "asnline": "5",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": "string",
                  "package": "string",
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
                  "asn": "701480-2021-00002",
                  "asnline": "6",
                  "crdate": "string",
                  "order": "string",
                  "orderline": "string",
                  "sku": "string",
                  "lot": "string",
                  "package": "string",
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
}