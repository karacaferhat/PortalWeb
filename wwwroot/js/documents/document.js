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
        asNo: "123456789",
        asLineNo: "123456"
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



selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", async () => {
    reportStatus("Uploading files...", true);

    let result = await uploadFiles(
        fileInput.files, processTypeInput.value.toString(),
         "asdfg", "123456789", "123456");

    if (Number.isInteger(result)) {
        if (result === 0)
            reportStatus("Done.", false);
        else if (result > 0)
            reportStatus(`${result} Files Already Exists. Couldn't Upload.`);
    } else
        reportStatus(result, false);
    

    await listFiles();
});

listButton.addEventListener("click", listFiles);
processTypeInput.addEventListener('change', listFiles);


listFiles();