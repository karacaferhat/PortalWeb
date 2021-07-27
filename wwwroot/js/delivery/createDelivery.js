/*
    let documentType = "byDeliveryLine";
    let processType = "fromDeliveryProcess";
    let asn = "12345";
    let asnLine = "1";



    let files = fileAttachment.prop("files");
   */


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


const createDelivery = async ()=>{}