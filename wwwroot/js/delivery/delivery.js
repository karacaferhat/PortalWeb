const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";

$("#asnDate").dxDateBox({
    showClearButton: true,
    useMaskBehavior: true,
    displayFormat: dateFormat,
    type: "date",
});
const asnDate = $("#asnDate").dxDateBox("instance");
const asn = $("#asn");
const newAsnButton = $("#newAsnButton");

const productName = $("#productName");
const chooseProductsButton = $("#chooseProductsButton");

const quantity = $("#quantity");
const lot = $("#lot");

const fileAttachment = $("#fileAttachment");
const fileAttachmentButton = $("#fileAttachmentButton");




class DeliveryGrid extends DataGrid{

    constructor(state, columns, gridContainerId = "#deliveryGridContainer"){
        super(baseUrl, 'getDelivery', "pkey", columns, gridContainerId);
        
        this.state = state;
    }

    async getUpdateArray(){
        let request ={
            vendor : "701480",
            state : this.state,
            asn : "701480-2021-00001"//asn.val()
        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        return data.data;
    }

}


newAsnButton.on("click", async ()=>{
    let request = {
        vendor : "701480",
        updUser : "string"
    }

    let data = await fetchData(baseUrl + "generateasn", request);

    if(data && data.resultType){
        asn.val(data.asn);
    }
})

const uploadFiles = async () => {
    reportStatus("Uploading files...", true);

    let vendor = "701480";
    let processType = processTypeInput.value.toString();
    let documentType = "asdfg";
    let asNo = "123456789";
    let asLineNo = "123456";

    let request = {
        vendor: vendor,
        documentType: documentType,
        asNo: asNo,
        asLineNo: asLineNo
    }

    let sasString = (await fetchData(documentServiceBaseUri + `getServiceSasUriForContainer/${processType}`, request)).sasString;


    try {
        if (!sasString)
            throw Error("SasString is Null")

        const containerURL = new azblob.ContainerURL(sasString, azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));


        const promises = [];
        for (const file of fileInput.files) {
            if(await checkIfFileExists(processType, file.name, vendor, documentType, asNo, asLineNo)) {
                console.log("File Already Exists. It Won't Upload.");
                reportStatus(`${file.name} Already Exists. Couldn't Upload`, false);
                continue;
            }

            const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, file.name);

            promises.push(azblob.uploadBrowserDataToBlockBlob(
                azblob.Aborter.none, file, blockBlobURL));

            let filePath = vendor + '/' + getFilePath(processType, file.name, vendor, documentType, asNo, asLineNo);
            await logUpload(vendor, asNo, asLineNo, file.name, filePath);
        }
        await Promise.all(promises);
        reportStatus("Done.", false);
        await listFiles();

    } catch (error) {
        console.log(error);
        reportStatus(error, false);
    }
}


fileAttachment.on('click', uploadFiles);