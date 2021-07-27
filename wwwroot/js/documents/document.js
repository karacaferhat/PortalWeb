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



const listFiles = async () => {
    const request = {
        vendor: sessionStorage[vendorKey],
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
fileInput.addEventListener("change", ()=>
    uploadFiles(processTypeInput.value.toString(), "asdfg", "123456789", "123456")
    );

listButton.addEventListener("click", listFiles);

listFiles();