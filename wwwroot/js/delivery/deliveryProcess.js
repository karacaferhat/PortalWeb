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
    enableGrouping: false
  });


$("#asnDate").dxDateBox({
  showClearButton: true,
  useMaskBehavior: true,
  displayFormat: dateFormat,
  type: "date",
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

const quantity = $("#quantity");
const lot = $("#lot");


const createDeliveryButton = $("#createDeliveryButton");
const refreshGridButton = $("#refreshGridButton");
const deleteDeliveryItemButton = $("#deleteDeliveryItemButton");

let created = false;

refreshGridButton.on("click", () => deliveryGrid.refreshButtonAction(refreshGridButton));


chooseProductsModal.on('shown.bs.modal', () => orderGrid.updateGrid());
chooseAsnModal.on('shown.bs.modal', () => miniDeliveryGrid.updateGrid());




fileAttachmentButton.on('click', () => {
  fileAttachment.trigger('click')
});

fileEirsaliyeButton.on('click', () => {
  fileEirsaliye.trigger('click')
});


newAsnButton.on("click", async () => {
  let request = {
    vendor: sessionStorage[vendorKey],
    updUser: sessionStorage[vendorNameKey]
  }

  let data = await fetchData(baseUrl + "generateasn", request);

  if (data && data.resultType) {
    asn.val(data.asn);

    deliveryGrid.setAsn(data.asn);
    deliveryGrid.updateGrid();

    if (created) {
      clearInputs();
    }
  }
});



chooseAsnButton.on("click", () => {
  if (miniDeliveryGrid.selectedKeys.length === 0)
    return

  asn.val(miniDeliveryGrid.selectedKeys[0]);

  deliveryGrid.setAsn(miniDeliveryGrid.selectedKeys[0]);
  deliveryGrid.updateGrid();
  chooseAsnModal.modal('toggle');

  let row = miniDeliveryGrid.selectedRows[0];


  if (created) {
    clearInputs();
  }
});


const clearInputs = () => {
  asnDate.reset();

  deliveryCompany.val("");
  deliveryType.val("");
  plateNo.val("");
  taxNo.val("");
  quantity.val("");
  lot.val("");
  products.val("");
  fileAttachment.val("");
  package.val("");

  createDeliveryButton.html("Olustur");
  created = false;
}



newPackageButton.on("click", async () => {
  let request = {
    vendor: sessionStorage[vendorKey],
    updUser: sessionStorage[vendorNameKey]
  }

  let data = await fetchData(baseUrl + "generatePackage", request);

  if (data && data.resultType) {
    package.val(data.package);
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

  products.val(string);
  chooseProductsModal.modal('toggle');
});


deleteDeliveryItemButton.on('click', async () => {
  if (deliveryGrid.selectedKeys.length === 0)
    return;


  deleteDeliveryItemButton.html( /*html*/
    `         
    <div class="spinner-border text-white" role="status">
      <span class= "sr-only"> Loading...</span>
    </div>
    `
  );


  let items = [];
  deliveryGrid.selectedKeys.forEach(d => items.push(d.orderline));

  let result = await deleteDelivery(asn.val(), miniDeliveryGrid.selectedRows[0].asnline, items);

  if (result) {
    await deliveryGrid.updateGrid();
    deleteDeliveryItemButton.html("Sevkiyat Silindi");
  } else {
    deleteDeliveryItemButton.html("Islem Basarisiz");
  }
});


createDeliveryButton.on('click', async () => {
  if (orderGrid.selectedKeys.length === 0)
    return;

  let newItems = orderGrid.selectedRows;
  let oldItems = deliveryGrid?deliveryGrid.allRows : null;
  let files = Array.from(fileAttachment.get(0).files);
  let eirsailye = fileEirsaliye.get(0).files[0];


  let asnT = asn.val()?.trim()
  let ansLineNoT = `${deliveryGrid.totalRowCount + 1}`;
  let packageT = package.val()?.trim();
  let quantityT = quantity.val()?.trim();
  let lotT = lot.val()?.trim();
  let deliveryCompanyT = deliveryCompany.val()?.trim();
  let deliveryTypeT = deliveryType.val()?.trim();
  let deliveryDateT = formatDate(asnDate.option("value")).trim();
  let plateNoT = plateNo.val()?.trim();
  let taxNoT = taxNo.val()?.trim();


  createDeliveryButton.html( /*html*/
    `         
    <div class="spinner-border text-white" role="status">
      <span class= "sr-only"> Loading...</span>
    </div>
    `
  );


  let result = await createDelivery(newItems, oldItems, files, eirsailye, asnT, ansLineNoT, packageT, quantityT, lotT,
    deliveryCompanyT, deliveryTypeT, deliveryDateT, plateNoT, taxNoT);

  if (result) {
    await deliveryGrid.updateGrid();
    createDeliveryButton.html("Sevkiyat Kaydedildi");
    created = true;
  } else {
    createDeliveryButton.html("Islem Basarisiz");
  }
});


deliveryGrid.updateGrid();