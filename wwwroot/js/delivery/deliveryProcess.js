const deliveryGrid = new DeliveryGrid("WAI", [{
    dataField: "asn",
    caption: "Sevkiyat"
  },
  {
    dataField: "asnline",
    caption: "Sevkiyat Sirasi"
  },
  {
    dataField: "order",
    caption: "Siparis No"
  },
  {
    dataField: "orderline",
    caption: "Siparis Sirasi"
  },
  {
    dataField: "sku",
    caption: "SKU"
  },
  {
    dataField: "skuname",
    caption: "SKU Adi"
  },
  {
    dataField: "ordqty",
    caption: "Urun Miktari"
  },
  {
    dataField: "package",
    caption: "Paket"
  }
]);

const miniDeliveryGrid = new MiniDeliveryGrid("WAI", [{
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
      caption: "SKU"
    },
    {
      dataField: "skuname",
      caption: "SKU Adi"
    },
    {
      dataField: "ordqty",
      caption: "Urun Miktari",
      dataType: "number"
    },
    {
      dataField: "orderno",
      caption: "Sevkiyat No"
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


const package = $("#package");
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


const quantity = $("#quantity");
const lot = $("#lot");


const createDeliveryButton = $("#createDeliveryButton");
const refreshGridButton = $("#refreshGridButton");
const deleteDeliveryItemButton = $("#deleteDeliveryItemButton");
const exitButton = $("#exitButton");

const productInfo = $("#productInfo");
const uploadFilesButton = $("#uploadFilesButton");


let created = false;



const clearInputs = () => {
  asn.val("");
  asnDate.option('value', Date.now());

  deliveryCompany.val("");
  deliveryType.val("cargo");
  plateNo.val("");
  taxNo.val("");
  products.val("");

  package.val("");

  quantity.val("");
  lot.val("");

  fileAttachment.val("");
  fileEirsaliye.val("");

  fileAttachmentList.html("");
  fileEirsaliyeList.html("");

  productInfo.html("");

  createDeliveryButton.html("Urun Olustur");
  created = false;
}


const listFiles = function(files, fileList) {
  var children = "";
  for (var i = 0; i < files.length; ++i) {
      children += '<li>' + files[i].name + '</li>';
  }
  fileList.html('<ul>'+ children +'</ul>');
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


fileAttachment.on('change', () => listFiles(Array.from(fileAttachment.get(0).files), fileAttachmentList));


fileEirsaliye.on('change', () => listFiles(Array.from(fileEirsaliye.get(0).files), fileEirsaliyeList));


newAsnButton.on("click", async () => {
  let request = {
    vendor: sessionStorage[vendorKey],
    updUser: sessionStorage[vendorNameKey]
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
  chooseAsnModal.modal('toggle');
});


newPackageButton.on("click", async () => {
  let request = {
    vendor: sessionStorage[vendorKey],
    updUser: sessionStorage[vendorNameKey]
  }

  let data = await fetchData(baseUrl + "generatePackage", request);

  if (data && data.resultType) {
    package.val(data.package);
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
  let oldItems = (deliveryGrid && deliveryGrid.allRows.length > 0)?deliveryGrid.allRows : null;
  let row = miniDeliveryGrid.selectedRows;
  

  let asnT = asn.val()?.trim();
  let packageT = package.val()?.trim();
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

    package.val("");
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
    updUser: sessionStorage[vendorNameKey]
  }

  let data = await fetchData(baseUrl + "post", request);
  console.log(data);
  if (data && data.resultType) {
    $("#exitModal").modal("toggle");
    clearInputs();
  }
})


uploadFilesButton.on('click', async ()=> {
  let files = Array.from(fileAttachment.get(0).files);
  let eirsailye = fileEirsaliye.get(0).files[0];

  let asnT = asn.val()?.trim();
  let asnLineNoT = `${deliveryGrid.totalRowCount + 1}`;

  
  let result = await updateFiles(asnT, asnLineNoT, files, eirsailye);
  console.log(result);
});


miniDeliveryGrid.updateGrid();
orderGrid.updateGrid();
deliveryGrid.setAsn("#######"); //Grid'i bosaltmak icin olmayacak bir deger yaz
deliveryGrid.updateGrid();
