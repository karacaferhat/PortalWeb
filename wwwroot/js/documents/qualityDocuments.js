"use strict";

const documentGrid = new DocumentGrid(null);

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");
const createButton = $("#createButton");
const fileInput = $("#fileInput");
const fileSelectButton = $("#fileSelectButton");



$("#validUntilDate").dxDateBox({
    showClearButton: true,
    useMaskBehavior: true,
    displayFormat: dateFormat,
    type: "date",
});

const validUntilDate = $("#validUntilDate").dxDateBox("instance");
const sku = $("#sku");
const note = $("#note");
const refcode = $("#refcode");


searchButton.on('click', () => documentGrid.updateGrid());
refreshGridButton.on('click', () => documentGrid.updateGrid());
fileSelectButton.on("click", () => fileInput.click());


createButton.on('click', async () => {
    let files = fileInput.prop('files');
    if (files.length < 1) return;

    let processType = "byDelivery";
    let documentType = "qualityDocument";
    let asn = "123456789";
    let vendor = sessionStorage[vendorKey];
    let fileurl = getFilePath(processType, files[0].name, vendor, documentType, asn)


    let result = await uploadFiles(files, processType, documentType, asn);

    console.log("Upload: ");
    console.log(result);

    if (result) {
        result = await saveDocumentData(files[0].name, fileurl, validUntilDate.option("value"), sku.val(), refcode.val(), note.val());
        console.log("Save: ");
        console.log(result);

        if (result){
            logUpload(vendor, asn, null, files[0].name, fileurl);
            console.log("Log: ");
            console.log(result);
        }
    }
});





documentGrid.updateGrid();