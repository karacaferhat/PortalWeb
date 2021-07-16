//!!!!ONEMLI!!!! azure dan cors u duzelt
const baseUri = "https://tederikportaldocumentservice.azurewebsites.net/api/v1/deliverydocument/"

const status = document.getElementById("status");
const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");
const processType = document.getElementById("process-type");

const uploadText = $("#upload-text");
const uploadSpinner = $("#upload-spinner");


const reportStatus = (message, isSpinning) => {
    status.innerHTML = `${message}<br/>`;

    if(isSpinning){
        uploadText.css("display", "none");
        uploadSpinner.css("display", "block");
    }
    else{
        uploadText.css("display", "block");
        uploadSpinner.css("display", "none");
    }

}


const getServiceSasUriForContainerAndUpload = () => {
    reportStatus("Uploading files...", true);


    const request = {vendor : "701480",
        processType: processType.value.toString(),
        documentType: "asdfg",
        asno: "123456789",
        asLineNo: "123456"}


    fetch(baseUri + "getServiceSasUriForContainer", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else
                throw Error(response);
        })
        .then(data => {
            if (data) {
                uploadFiles(data.sasString);
            }
        })
        .catch(error => {
            console.error('Couldn\'t Get SasString.' + error);
            reportStatus('Couldn\'t Get SasString.' + error, false);
        });

}


const uploadFiles = async (sasString) => {
    try {
        const containerURL = new azblob.ContainerURL(sasString, azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));

        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, file.name);
            promises.push(azblob.uploadBrowserDataToBlockBlob(
                azblob.Aborter.none, file, blockBlobURL));
        }
        await Promise.all(promises);
        reportStatus("Done.", false);

    } catch (error) {
        console.log(error);
        reportStatus(error, false);
    }
}

selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", getServiceSasUriForContainerAndUpload);