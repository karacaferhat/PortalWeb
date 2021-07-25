//!!!!ONEMLI!!!! azure dan cors u duzelt
const documentServiceBaseUri = "https://tederikportaldocumentservice.azurewebsites.net/api/v1/deliverydocument/";
const loggerServiceBaseUri = "https://tedarikportallogger.azurewebsites.net/api/v1/log/";
const blobStorageBaseUri = "https://tedarikportalstorage.blob.core.windows.net/";

const status = document.getElementById("status");
const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");
const processTypeInput = document.getElementById("process-type");
const listButton = document.getElementById("list-button");
const fileList = document.getElementById("file-list");


const uploadText = $("#upload-text");
const uploadSpinner = $("#upload-spinner");


const reportStatus = (message, isSpinning) => {
    status.innerHTML = `${message}<br/>`;

    if (isSpinning) {
        uploadText.css("display", "none");
        uploadSpinner.css("display", "block");
    } else {
        uploadText.css("display", "block");
        uploadSpinner.css("display", "none");
    }

}

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

const listFiles = async () => {
    const request = {
        vendor: "701480",
        documentType: "asdfg",
        asNo : "123456789",
        asLineNo : "123456"
    };

    let processType = processTypeInput.value.toString();

    reportStatus("Listing Files...", false);
    let data = await fetchData(documentServiceBaseUri + `getFilesByFilter/${processType}`, request);
    //reportStatus("Listed", false);


    fileList.innerHTML = "";

    data.forEach(f => {
        fileList.innerHTML += `<a href="${blobStorageBaseUri + f.filePath}">
            ${f.fileName}
        </a><br/>`;
    });
};

const logUpload = async (vendor, asno, asLineNo, filename, fileurl) => {
    let request = {
        vendor: vendor,
        asn: asno,
        asnline: asLineNo,
        filename : filename,
        fileurl : fileurl,
        resultType : "Success",
        resultMessage : "Document has been succesfully uploaded."
    };

    let data = await fetchData(loggerServiceBaseUri + "addDocStoreLog", request);
    console.log(data);
}

const getFilePath = (processType, fileName, vendor, documentType, asno, asLineNo) => {
    let filePath = documentType + '/';
    if (processType === "documentByType")
        filePath += fileName;
    else if (processType === "deliveryDocument")
        filePath += asno + '/' + fileName;
    else if (processType === "deliveryLineDocument")
        filePath += asno + '/' + asLineNo + '/' + fileName;

    return filePath;
}

const checkIfFileExists = async (processType, fileName, vendor, documentType, asno, asLineNo) => {
    let filePath = getFilePath(processType, fileName, vendor, documentType, asno, asLineNo);

    let request = {
        containerName : vendor,
        filePath : filePath
    };

    let data = false;
    try {
        data = await fetchData(documentServiceBaseUri + "checkIfFileExists", request);
    }
    catch (error){
        return false
    }

    return data.result;
}



selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);

listButton.addEventListener("click", listFiles);

listFiles();