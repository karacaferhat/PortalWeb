const uploadFiles = async (processType, documentType, asNo = null, asLineNo = null) => {
    reportStatus("Uploading files...", true);

    let vendor = sessionStorage[vendorKey];

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