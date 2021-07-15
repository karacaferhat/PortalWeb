const baseUri = "https://tederikportaldocumentservice.azurewebsites.net/api/v1/deliverydocument/"

const status = document.getElementById("status");
const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");


const reportStatus = message => {
    status.innerHTML += `${message}<br/>`;
    status.scrollTop = status.scrollHeight;
}



const getServiceSasUriForContainerAndUpload = async () => {
    const request = {vendor : "701480"}


    fetch(baseUri + "getServiceSasUriForContainer", {
        method: 'POST',
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
            reportStatus('Couldn\'t Get SasString.' + error);
        });

}


const uploadFiles = async (sasString) => {
    try {
        const containerURL = new azblob.ContainerURL(sasString, azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));

        reportStatus("Uploading files...");
        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, file.name);
            console.log("success");
            promises.push(azblob.uploadBrowserDataToBlockBlob(
                azblob.Aborter.none, file, blockBlobURL));
        }
        await Promise.all(promises);
        reportStatus("Done.");

    } catch (error) {
        console.log(error);
        reportStatus(error);
    }
}


selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", getServiceSasUriForContainerAndUpload);

