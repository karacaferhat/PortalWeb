"use strict";

const documentGrid = new DocumentGrid([{
        dataField: "doctype.typecode",
        caption: "Dokuman Tipi"
    },
    {
        dataField: "upldate",
        caption: "Yuklenme Tarihi"
    },
    {
        dataField: "upluser",
        caption: "Yukleyen Kullanici"
    },
    {
        dataField: "fileurl",
        caption: "Dosya Adi",
        cellTemplate: (container, options) => {
            let link = options.value;

            if (link)
                $(`<a> ${link.split('/').pop()} </a>`)
                .attr('href', blobStorageBaseUri + link)
                .attr('target', '_blank')
                .appendTo(container);
            else
                $('').appendTo(container);
        }
    },
    {
        dataField: "refcode",
        caption: "Referans Kodu"
    },
    {
        dataField: "pconf",
        caption: "Onaylanma Durumu"
    },
    {
        dataField: "confuser",
        caption: "Onaylayan Kullanici"
    },
    {
        dataField: "confdate",
        caption: "Onaylama Tarihi"
    },
    {
        dataField: "tobeconfirmedbyvendor",
        caption: "Onaylayacak Kullanici"
    },
    {
        dataField: "validuntildate",
        caption: "Onaylama Gecerlilik Tarihi"
    },
    {
        dataField: "orderno",
        caption: "Siparis Numarasi"
    },
    {
        dataField: "orderline",
        caption: "Siparis Sira Numarasi"
    },
    {
        dataField: "asn",
        caption: "Sevkiyat No"
    },
    {
        dataField: "asnline",
        caption: "Sevkiyat Sira No"
    },
    {
        dataField: "sku",
        caption: "Ürün Kodu"
    },
    {
        dataField: "lot",
        caption: "LOT Numarasi"
    },
    {
        dataField: "revno",
        caption: "Revizyon Numarasi"
    },
    {
        dataField: "devid",
        caption: "Gelistirici ID"
    },
    {
        dataField: "devnoteid",
        caption: "Gelistirici Notu ID'si"
    }
]);


const refreshGridButton = $("#refreshGridButton");
const createButton = $("#createButton");
const deleteItemButton = $("#deleteItemButton");
const fileInput = $("#fileInput");
const fileSelectButton = $("#fileSelectButton");
const confirmItemButton = $("#confirmItemButton");


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


refreshGridButton.on('click', async () => {
    let text = refreshGridButton.html();
    refreshGridButton.html( /*html*/
        `         
        <div class="spinner-border text-white" role="status">
          <span class= "sr-only"> Loading...</span>
        </div>
        `
    );

    await documentGrid.updateGrid();

    refreshGridButton.html(text);
});
fileSelectButton.on("click", () => fileInput.click());

fileInput.on('change', () => {
    let files = fileInput.prop('files');

    let children = "";
    for (let i = 0; i < files.length; ++i) {
        children += '<li>' + files[i].name + '</li>';
    }
    $("#fileList").html('<ul>' + children + '</ul>');
})

createButton.on('click', async () => {
    let files = fileInput.prop('files');
    if (files.length < 1) return;


    let text = createButton.html();
    createButton.html( /*html*/
        `         
        <div class="spinner-border text-white" role="status">
          <span class= "sr-only"> Loading...</span>
        </div>
        `
    );


    let processType = "byDelivery";
    let documentType = "qualityDocument";
    let asn = "123456789";
    let vendor = sessionStorage[vendorKey];
    let fileurl = vendor + '/' + getFilePath(processType, files[0].name, vendor, documentType, asn)


    let result = await uploadFiles(files, processType, documentType, asn);

    console.log("Upload: ");
    console.log(result);

    if (Number.isInteger(result) && result < 1) {
        result = await saveDocumentData(files[0].name, fileurl, validUntilDate.option("value"), sku.val(), refcode.val(), note.val());
        console.log("Save: ");
        console.log(result.success);

        if (result.success) {
            logUpload(vendor, asn, null, files[0].name, fileurl);
            console.log("Log: ");
            console.log(result.success);
        }
    }


    createButton.html(text);
    documentGrid.updateGrid();
});

deleteItemButton.on('click', async () => {
    let rows = documentGrid.selectedRows;
    if (rows.length < 1) return;

    let vendor = sessionStorage[vendorKey];

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let url = row.fileurl.substring(row.fileurl.indexOf('/') + 1);

        let result = await fetchData(documentServiceBaseUri + "deleteFile", {
            vendor: vendor,
            fileurl: url
        })


        if (result.success) {
            let result = await fetchData(documentServiceBaseUri + "deleteDocumentData", {
                id: row.id
            });
            console.log(result);
        }
    }


    documentGrid.updateGrid();
});


confirmItemButton.on('click', async () => {
    let rows = documentGrid.selectedRows;
    if (rows.length < 1) return;

    let email = sessionStorage[emailKey];

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let request = {
            id: row.id,
            confuser: email
        };

        let result = await fetchData(documentServiceBaseUri + "confirmDocument", request);
        console.log(result)
        
        documentGrid.updateGrid();
    }
});


documentGrid.updateGrid();