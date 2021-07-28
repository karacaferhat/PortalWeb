const deliveryGrid = new DeliveryGrid("WAI", [{
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
  },
  {
    dataField: "fromPartner",
    caption: "Gelen Ortak"
  },
  {
    dataField: "toPartner",
    caption: "Giden Ortak"
  },
  {
    dataField: "plate",
    caption: "Plaka"
  },
  {
    dataField: "tcvkn",
    caption: "TCVKN"
  }
]);

const miniDeliveryGrid = new DeliveryGrid("WAI", [{
    dataField: "asn",
    caption: "ASN"
  },
  {
    dataField: "vendor",
    caption: "Tedarikçi"
  },
  {
    dataField: "vendorname",
    caption: "Tedarikçi Adi"
  }
], {
  enableGrouping: false,
  selectionMode: "single",
  gridContainerId: "#miniDeliveryGrid"
});

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


const quantity = $("#quantity");
const lot = $("#lot");


const createDeliveryButton = $("#createDeliveryButton");
const refreshGridButton = $("#refreshGridButton");

refreshGridButton.on("click", () => deliveryGrid.refreshButtonAction(refreshGridButton));


chooseProductsModal.on('shown.bs.modal', () => orderGrid.updateGrid());
chooseAsnModal.on('shown.bs.modal', () => miniDeliveryGrid.updateGrid());




fileAttachmentButton.on('click', () => {
  fileAttachment.trigger('click')
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
  }
});




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


chooseAsnButton.on("click", () => {
  if (miniDeliveryGrid.selectedKeys.length === 0)
    return

  asn.val(miniDeliveryGrid.selectedKeys[0]);

  deliveryGrid.setAsn(miniDeliveryGrid.selectedKeys[0]);
  deliveryGrid.updateGrid();
  chooseAsnModal.modal('toggle');
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


createDeliveryButton.on('click', async () => {
  if (orderGrid.selectedKeys.length === 0)
    return;

  let items = orderGrid.selectedRows;
  let files = Array.from(fileAttachment.get(0).files);
  let asnT = asn.val().trim()
  let ansLineNoT = `${deliveryGrid.totalRowCount + 1}`;
  let packageT = package.val().trim();
  let quantityT = quantity.val().trim();
  let lotT = lot.val().trim();
  let deliveryCompanyT = deliveryCompany.val().trim();
  let deliveryTypeT = deliveryType.val().trim();
  let deliveryDateT = formatDate(asnDate.option("value")).trim();
  let plateNoT = plateNo.val().trim();
  let taxNoT = taxNo.val().trim();


  await createDelivery(items, files, asnT, ansLineNoT, packageT, quantityT, lotT,
    deliveryCompanyT, deliveryTypeT, deliveryDateT, plateNoT, taxNoT);

  await deliveryGrid.updateGrid();
});


deliveryGrid.updateGrid();