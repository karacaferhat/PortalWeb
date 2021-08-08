"use strict";

//!!!!ONEMLI!!!! azure dan cors u duzelt

const documentServiceBaseUri = "https://tederikportaldocumentservice.azurewebsites.net/api/v1/deliverydocument/";
const loggerServiceBaseUri = "https://tedarikportallogger.azurewebsites.net/api/v1/log/";
const blobStorageBaseUri = "https://tedarikportalstorage.blob.core.windows.net/";

const uploadFiles = async (files, processType, documentType, asn = "", asnline = "") => {
    let vendor = sessionStorage[vendorKey];

    let request = {
        vendor: vendor,
        documentType: documentType,
        asNo: asn,
        asLineNo: asnline
    }

    
    let sasString = (await fetchData(documentServiceBaseUri + `getServiceSasUriForContainer/${processType}`, request)).sasString;

    try {
        if (!sasString)
            throw Error("SasString is Null")

        const containerURL = new azblob.ContainerURL(sasString, azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));

        let failedUploads = 0;
        const promises = [];
        for (const file of files) {
            let exists = await checkIfFileExists(processType, file.name, vendor, documentType, asn, asnline);
            if (exists) {
                console.log(`${file.name} Already Exists. Couldn't Upload.`);
                failedUploads += 1;
                continue;
            }

            const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, file.name);

            promises.push(azblob.uploadBrowserDataToBlockBlob(
                azblob.Aborter.none, file, blockBlobURL));

            let filePath = vendor + '/' + getFilePath(processType, file.name, vendor, documentType, asn, asnline);
            await logUpload(vendor, file.name, filePath, asn, asnline);
        }

        if (promises.length > 0)
            await Promise.all(promises);

        return failedUploads;

    } catch (error) {
        console.log(error);
        return error;
    }
}

const logUpload = async (vendor, filename, fileurl, asno, asLineNo = null) => {
    let request = {
        vendor: vendor,
        asn: asno,
        asnline: asLineNo,
        filename: filename,
        fileurl: fileurl,
        resultType: "Success",
        resultMessage: "Document has been succesfully uploaded."
    };

    let data = await fetchData(loggerServiceBaseUri + "addDocStoreLog", request);
}

const getFilePath = (processType, fileName, vendor, documentType, asno, asLineNo) => {
    let filePath = documentType + '/';
    if (processType === "byType")
        filePath += fileName;
    else if (processType === "byDelivery")
        filePath += asno + '/' + fileName;
    else if (processType === "byDeliveryLine")
        filePath += asno + '/' + asLineNo + '/' + fileName;

    return filePath;
}

const checkIfFileExists = async (processType, fileName, vendor, documentType, asno, asLineNo) => {
    let filePath = getFilePath(processType, fileName, vendor, documentType, asno, asLineNo);


    return await checkIfFilePathExists(vendor, filePath);
}

const checkIfFilePathExists = async (vendor, filePath) => {
    let request = {
        containerName: vendor,
        filePath: filePath
    };

    let data = false;
    try {
        data = await fetchData(documentServiceBaseUri + "checkIfFileExists", request);
    } catch (error) {
        return false
    }

    return data.result;
}