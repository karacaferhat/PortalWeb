"use strict";


const deliveryGrid = new DeliveryItemsGrid("WAI", [{
  dataField: "asn",
  caption: "Sevkiyat"
},
{
  dataField: "asnline",
  caption: "Sevk Satır No"
},
{
  dataField: "crdate",
  caption: "Oluşturulma Tarihi"
},
{
  dataField: "order",
  caption: "Sipariş"
},
{
  dataField: "sku",
  caption: "Ürün Kodu"
},
{
  dataField: "skuname",
  caption: "Ürün Adı"
},
{
  dataField: "ordqty",
  caption: "Sipariş Miktari"
},
{
  dataField: "ordunit",
  caption: "Sipariş Birimi"
},
{
  dataField: "dlvqty",
  caption: "Sevk Miktari"
},
{
  dataField: "dlvunit",
  caption: "Sevk Birimi"
},
{
  dataField: "lastdlvdate",
  caption: "Son Gönderim Tarihi"
},
{
  dataField: "package",
  caption: "Paket No"
}
], {
  selectionMode: 'single'
});

const miniDeliveryGrid = new DeliveryGrid("WAI", [{
    dataField: "asn",
    caption: "Sevkiyat"
  },
  {
    dataField: "vendor",
    caption: "Tedarikçi"
  },
  {
    dataField: "vendorname",
    caption: "Tedarikçi Adi"
  }
]);

const orderGrid = new OrderGrid("PRC",
  [{
      dataField: "sku",
      caption: "Ürün Kodu"
    },
    {
      dataField: "skuname",
      caption: "Ürün Adi"
    },
    {
      dataField: "ordqty",
      caption: "Ürün Miktari",
      dataType: "number"
    },
    {
      dataField: "orderno",
      caption: "Sipariş No"
    }
  ], {
    enableGrouping: false,
    selectionMode: 'single'
  });


$("#asnDate").dxDateBox({
  showClearButton: true,
  useMaskBehavior: true,
  displayFormat: dateFormat,
  dateFormat: {
    type: "date",
    value: Date.now()
  },
  value: Date.now()
});


const packageInput = $("#package");
const newPackageButton = $("#newPackageButton");


const asnDate = $("#asnDate").dxDateBox("instance");
const asn = $("#asn");
const newAsnButton = $("#newAsnButton");
const chooseAsnModal = $("#chooseAsnModal");
const chooseAsnButton = $("#chooseAsnButton")

const deliveryCompany = $("#deliveryCompany");
const deliveryType = $("#deliveryType");
const plateNo = $("#plateNo");
const taxNo = $("#taxNo");


const products = $("#products");
const chooseProductsModal = $("#chooseProductsModal");
const chooseProductsButton = $("#chooseProductsButton")


const fileAttachment = $("#fileAttachment");
const fileAttachmentButton = $("#fileAttachmentButton");

const fileEirsaliye = $("#fileEirsaliye");
const fileEirsaliyeButton = $("#fileEirsaliyeButton");

const fileAttachmentList = $("#fileAttachmentList")
const fileEirsaliyeList = $("#fileEirsaliyeList")

const uploadedFilesList = $("#uploadedFilesList");
const uploadedEirsaliyeList = $("#uploadedEirsaliyeList");

const quantity = $("#quantity");
const lot = $("#lot");


const createDeliveryButton = $("#createDeliveryButton");
const refreshGridButton = $("#refreshGridButton");
const deleteDeliveryItemButton = $("#deleteDeliveryItemButton");
const exitButton = $("#exitButton");

const productInfo = $("#productInfo");
const uploadFilesButton = $("#uploadFilesButton");

const fileAttachmentClearButton = $("#fileAttachmentClearButton");
const fileEirsaliyeClearButton = $("#fileEirsaliyeClearButton");

let created = false;



const setAsnWithUrl = () => {
  let currentUrlSplitedWithParameters = window.location.href.split("#");

  if (currentUrlSplitedWithParameters && currentUrlSplitedWithParameters.length > 1) {
    let asnValue = currentUrlSplitedWithParameters[1];


    let obj = miniDeliveryGrid.allRows.find(a => a.asn === asnValue);


    if (obj) {
      let row = miniDeliveryGrid.allRows.indexOf(obj);
      if (row !== null)
        miniDeliveryGrid.gridContainer.dxDataGrid("instance").selectRowsByIndexes([row]).then(() =>
          chooseAsnButton.click()
        );
    }
  }
}





const clearInputs = () => {
  asn.val("");
  asnDate.option('value', Date.now());

  deliveryCompany.val("");
  deliveryType.val("cargo");
  plateNo.val("");
  taxNo.val("");
  products.val("");

  packageInput.val("");

  quantity.val("");
  lot.val("");

  fileAttachment.val("");
  fileEirsaliye.val("");

  fileAttachmentList.html("");
  fileEirsaliyeList.html("");

  productInfo.html("");

  uploadedFilesList.html("");
  uploadedEirsaliyeList.html("");

  deliveryGrid.setAsn("########");
  deliveryGrid.updateGrid();

  createDeliveryButton.html("Urun Olustur");
  created = false;
}


const listFiles = function (files, fileList) {
  let children = "";
  for (let i = 0; i < files.length; ++i) {
    children += '<li>' + files[i].name + '</li>';
  }
  fileList.html('<ul>' + children + '</ul>');
}

const updateUploadedFileList = (attachments, edispatchfilename, edispatchfileUrl) => {
  if (attachments && attachments.length > 0) {
    let row = miniDeliveryGrid.selectedRows[0];
    let string = "";

    let i = 0;
    attachments.forEach(f => {
      let id = `${row.asn}filedeletebutton${i++}`;

      string +=
        /*html*/
        `<a href="${blobStorageBaseUri + f.fileurl}">${f.filename}</a>
      <button class="btn btn-danger" id="${id}">Sil</button>
      <br/>`;
    });

    uploadedFilesList.html(string);

    for (let i = 0; i < attachments.length; i++) {
      let f = attachments[i];
      let id = `${row.asn}filedeletebutton${i}`;
      $(`#${id}`).on('click', () => deleteHeaderAttachment(row.asn, f.fileurl, f.filename));
    }
  } else {
    uploadedFilesList.html("");
  }

  if (edispatchfilename && edispatchfileUrl) {
    let row = miniDeliveryGrid.selectedRows[0];

    let id = `${row.asn}edispatchdeletebutton`
    let string =
      /*html*/
      `<a href="${blobStorageBaseUri + edispatchfileUrl}">${edispatchfilename}</a><br/>
      <button class="btn btn-danger" id="${id}">Sil</button>`;

    uploadedEirsaliyeList.html(string);


    $(`#${id}`).on('click', () => deleteEirsaliyeAttachment(row.asn, edispatchfileUrl));

  } else {
    uploadedEirsaliyeList.html("");
  }


}


refreshGridButton.on("click", () => deliveryGrid.refreshButtonAction(refreshGridButton));
chooseProductsModal.on('shown.bs.modal', () => orderGrid.updateGrid());
chooseAsnModal.on('shown.bs.modal', () => miniDeliveryGrid.updateGrid());


fileAttachmentButton.on('click', () => {
  fileAttachment.trigger('click')
});


fileEirsaliyeButton.on('click', () => {
  fileEirsaliye.trigger('click')
});

fileAttachmentClearButton.on('click', () => {
  fileAttachmentList.html("");
  fileAttachment.val(null);
});

fileEirsaliyeClearButton.on('click', () => {
  fileEirsaliyeList.html("");
  fileEirsaliye.val(null);
})


fileAttachment.on('change', () => listFiles(Array.from(fileAttachment.get(0).files), fileAttachmentList));


fileEirsaliye.on('change', () => listFiles(Array.from(fileEirsaliye.get(0).files), fileEirsaliyeList));


newAsnButton.on("click", async () => {
  let request = {
    vendor: sessionStorage[vendorKey],
    updUser: sessionStorage[emailKey]
  }

  let data = await fetchData(baseUrl + "generateasn", request);

  if (data && data.resultType) {
    if (created) {
      clearInputs();
    }

    asn.val(data.asn);

    deliveryGrid.setAsn(data.asn);
    deliveryGrid.updateGrid();
  }
});


chooseAsnButton.on("click", () => {
  if (miniDeliveryGrid.selectedKeys.length === 0)
    return


  if (created) {
    clearInputs();
  }


  let row = miniDeliveryGrid.selectedRows[0];


  asnDate.option('value', row.crdate);


  deliveryCompany.val(row.transportcompany);
  deliveryType.val(row.transporttype);
  plateNo.val(row.plate);
  taxNo.val(row.tcvkn);

  asn.val(miniDeliveryGrid.selectedKeys[0]);


  deliveryGrid.setAsn(miniDeliveryGrid.selectedKeys[0]);
  deliveryGrid.updateGrid();

  updateUploadedFileList(row.attachments, row.edispatchno, row.edispatchfile);

  chooseAsnModal.modal('hide');
});


newPackageButton.on("click", async () => {
  let request = {
    vendor: sessionStorage[vendorKey],
    updUser: sessionStorage[emailKey]
  }

  let data = await fetchData(baseUrl + "generatePackage", request);

  if (data && data.resultType) {
    packageInput.val(data.package);
    createDeliveryButton.html("Urun Olustur");
  }
});


chooseProductsButton.on("click", () => {
  if (orderGrid.selectedKeys.length === 0)
    return

  let string = "";
  let keys = orderGrid.selectedKeys;

  for (let i = 0; i < keys.length; i++) {
    if (i < keys.length - 1)
      string += `${keys[i]}, `;
    else
      string += `${keys[i]} `;
  }




  string = "";
  let rows = orderGrid.selectedRows;
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]
    string +=
      /*html*/
      ` <div>
          <span class="mx-4">Ürün Kodu: ${row.sku}</span>          
          <span class="mx-4">Sipariş Miktar: ${row.ordqty}</span>          
          <span class="mx-4">Sipariş Birimi: ${row.ordunit}</span>
          <span class="mx-4">Sipariş No: ${row.orderno}</span>    
          <span class="mx-4">Sipariş Satır No: ${row.orderlineno}</span>    
          <span class="mx-4">Ürün Çizim Revizyon No: ${row.drwrevisionno}</span>    
          <span class="mx-4">Sipariş Notu: ${row.ordlinedesc}</span>    
          
        </div>
      `;
    products.val(row.skuname);
  }


  productInfo.html(string);
  chooseProductsModal.modal('toggle');
});


deleteDeliveryItemButton.on('click', async () => {
  if (asn.val() == null || deliveryGrid.selectedKeys.length === 0)
    return;


  deleteDeliveryItemButton.html( /*html*/
    `         
    <div class="spinner-border text-white" role="status">
      <span class= "sr-only"> Loading...</span>
    </div>
    `
  );


  let items = [];
  deliveryGrid.selectedKeys.forEach(d => {
    items.push({
      asn: d.asn,
      asnline: d.asnline
    });
  });

  let result = await deleteDeliveryLines(items);

  if (result === 0) {
    deleteDeliveryItemButton.html("Siparisler Silindi");
  } else {
    deleteDeliveryItemButton.html("Bazi Islemler Basarisiz");
  }

  await deliveryGrid.updateGrid();
});


createDeliveryButton.on('click', async () => {
  if (orderGrid.selectedKeys.length === 0)
    return;

  let newItems = orderGrid.selectedRows;
  let oldItems = (deliveryGrid && deliveryGrid.allRows.length > 0) ? deliveryGrid.allRows : null;
  let row = miniDeliveryGrid.selectedRows;


  let asnT = asn.val()?.trim();
  let packageT = packageInput.val()?.trim();
  let quantityT = quantity.val()?.trim();
  let lotT = lot.val()?.trim();
  let deliveryCompanyT = deliveryCompany.val()?.trim();
  let deliveryTypeT = deliveryType.val()?.trim();
  let deliveryDateT = formatDate(asnDate.option("value"))?.trim();
  let plateNoT = plateNo.val()?.trim();
  let taxNoT = taxNo.val()?.trim();

  let attachments = row.attachments;
  let edispatchno = row.edispatchno;
  let edispatchfile = row.edispatchfile;


  /*html*/
  createDeliveryButton.html(

    `         
          <div class="spinner-border text-white" role="status">
            <span class= "sr-only"> Loading...</span>
          </div>
          `
  );




  let result = await createDelivery(newItems, oldItems, asnT, packageT, quantityT, lotT, deliveryCompanyT,
    deliveryTypeT, deliveryDateT, plateNoT, taxNoT, attachments, edispatchno, edispatchfile);


  if (result) {
    await deliveryGrid.updateGrid();
    createDeliveryButton.html("Sevkiyat Kaydedildi");

    packageInput.val("");
    quantity.val("");
    lot.val("");
    fileAttachment.val("");
    products.val("");
    productInfo.html("");


    created = true;
  } else {
    createDeliveryButton.html("Islem Basarisiz");
  }
});


exitButton.on("click", async () => {
  if (asn.val() == null)
    return

  let request = {
    vendor: sessionStorage[vendorKey],
    asn: asn.val(),
    updUser: sessionStorage[emailKey]
  }

  let data = await fetchData(baseUrl + "post", request);

  if (data && data.resultType) {
    $("#exitModal").modal("toggle");
    clearInputs();
  }
})


uploadFilesButton.on('click', async () => {
  if (miniDeliveryGrid.selectedKeys.length === 0) return;

  let files = Array.from(fileAttachment.get(0).files);
  let eirsailye = fileEirsaliye.get(0).files[0];

  let asnT = asn.val()?.trim();
  let asnLineNoT = `${deliveryGrid.totalRowCount + 1}`;
  let oldAttachments = miniDeliveryGrid.selectedRows[0].attachments;

  let text = uploadFilesButton.html();
  uploadFilesButton.html(
    /*html*/
    `         
      <div class="spinner-border text-white" role="status">
        <span class= "sr-only"> Loading...</span>
      </div>
    `);


  let result = await updateFiles(asnT, asnLineNoT, files, eirsailye, oldAttachments);
  console.log(result);


  uploadFilesButton.html("Dosyalar Kaydedildi");

  fileAttachment.val("");
  fileEirsaliye.val("");

  fileAttachmentList.html("");
  fileEirsaliyeList.html("");

  await miniDeliveryGrid.updateGrid();
  let row = miniDeliveryGrid.selectedRows[0];
  updateUploadedFileList(row.attachments, row.edispatchno, row.edispatchfile);

  setTimeout(() => {
    uploadFilesButton.html(text);
  }, 5000);
});

const loadGrids = async () => {
  deliveryGrid.setAsn("#######"); //Grid'i bosaltmak icin olmayacak bir deger yaz

  await miniDeliveryGrid.updateGrid();
  await deliveryGrid.updateGrid();
  await orderGrid.updateGrid();
}
loadGrids().then(() => setAsnWithUrl());


$("#printLabelButton").on("click", () => {
  $("#printArea").printThis({
    loadCSS: "css/print.css",
  });
});