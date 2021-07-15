const baseUri = "api/v1/deliverydocument/"

const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");


const reportStatus = message => {
    status.innerHTML += `${message}<br/>`;
    status.scrollTop = status.scrollHeight;
}



const getServiceSasUriForContainer = async () => {
    const request = {vendor : "701480"}


    fetch(baseUri + "uploadDeliveryAttachment", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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
        console.error('Couldn\'t Get SasString.', error);
    
    });

}


const uploadFiles = async (containerURL) => {
    try {
        reportStatus("Uploading files...");
        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, file.name);
            promises.push(azblob.uploadBrowserDataToBlockBlob(
                azblob.Aborter.none, file, blockBlobURL));
        }
        await Promise.all(promises);
        reportStatus("Done.");
        listFiles();
    } catch (error) {
        reportStatus(error.body.message);
    }
}


selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);

