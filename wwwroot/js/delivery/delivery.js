const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";


class DeliveryGrid extends DataGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#deliveryGridContainer"
    } = {}) {

        super(baseUrl, 'getDelivery', "pkey", columns, {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            gridContainerId: gridContainerId
        });

        this.state = state;
    }

    async getUpdateArray() {
        let request = {
            vendor: sessionStorage[vendorKey],
            state: this.state,
            asn: "701480-2021-00001" //asn.val()
        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        return data.data;
    }

}


const uploadAttachment = async (documentType, processType, asn, asnLine)=>{
    let vendor = sessionStorage[vendorKey];  
    let files = fileAttachment.prop("files");
  
    let result = await uploadFiles(files, documentType, processType, asn, asnLine);
    if (Number.isInteger(result)) {
      if (result === 0) {
        let filePath = vendor + '/' + getFilePath(processType, files[0].name, vendor, documentType, asn, asnLine);
  
        let request = {
          vendor: vendor,
          asn: asn,
          asnline: asnLine,
          updUser: vendor,
          filename: files[0].name,
          fileurl: filePath
        }
        let data = await fetchData(baseUrl + 'additemAttachment', request);
        console.log(data);
      }
    }
}