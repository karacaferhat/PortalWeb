const deliveryGrid = new DeliveryGrid("WAI", [
    { dataField: "asn", caption: "ASN" },
    { dataField: "vendor", caption: "Tedarikçi" },
    { dataField: "vendorname", caption: "Tedarikçi Adi" },
    { dataField: "fromPartner", caption: "Gelen Ortak" },
    { dataField: "toPartner", caption: "Giden Ortak" },
    { dataField: "plate", caption: "Son Teslim Tarihi" },
    { dataField: "tcvkn", caption: "TCVKN"}
]);

const orderGrid = new OrderGrid("PRC",  [
    { dataField: "vendor", caption: "Tedarikçi" },
    { dataField: "orderno", caption: "Siparis No" },
    { dataField: "orderlineno", caption: "Siparis Sira No" },
    { dataField: "orderdate", caption: "Siparis Tarihi" },
    { dataField: "orduser", caption: "Siparisi Veren Kullanici" },
    { dataField: "ordunit", caption: "Siparis Birimi" },
    { dataField: "sku", caption: "SKU" }
]);


const productName = $("#productName");
const chooseProductsButton = $("#chooseProductsButton");
const chooseProductsModal = $("#chooseProductsModal");

const quantity = $("#quantity");
const lot = $("#lot");

const fileAttachment = $("#fileAttachment");
const fileAttachmentButton = $("#fileAttachmentButton");


const createDeliveryButton = $("#createDeliveryButton");
const refreshGridButton = $("#refreshGridButton");

refreshGridButton.on("click", () => deliveryGrid.refreshButtonAction(refreshGridButton));


deliveryGrid.updateGrid();
chooseProductsModal.on('shown.bs.modal', ()=>orderGrid.updateGrid());
chooseProductsButton.on('click', ()=>{chooseProductsModal.modal('toggle')});


createDeliveryButton.on('click', async ()=>{
    if(orderGrid.selectedKeys.length === 0)
        return;
    

    let request = {
        "vendor": "701480",
        "asn": asn.val(),
        "updUser": "701480",
        "delivery": {
          "id": asn.val(),
          "pkey": asn.val(),
          "asn": asn.val(),
          "vendor": "701480",
          "vendorname": "string",
          "crdate": "string",
          "cruser": "string",
          "issdate": "string",
          "fromPartner": "string",
          "toPartner": "string",
          "state": "WAI",
          "items": [/////////
            {
              "asn": asn.val(),
              "asnline": asn.val(),
              "crdate": "string",
              "order": "string",
              "orderline": "string",
              "sku": "string",
              "lot": lot.val(),
              "package": "string",
              "skuname": "string",
              "ordqty": quantity.val(),
              "ordunit": "string",
              "dlvqty": 0,
              "dlvunit": "string",
              "lastdlvdate": "string",
              "revno": "string",
              "drwno": "string",
              "drwspecno": "string",
              "drwrevisionno": "string",
              "lineattachments": [
                {
                  "doctype": "string",
                  "filename": "string",
                  "fileurl": "string"
                }
              ],
              "linenotes": [
                "string"
              ]
            }
          ],
          "attachments": [
            {
              "doctype": "string",
              "filename": "string",
              "fileurl": "string"
            }
          ],
          "edispatchno": "string",
          "edispatchfile": "string",
          "transporttype": "string",
          "transportcompany": "string",
          "plate": "string",
          "tcvkn": "string",
          "notes": [
            "string"
          ]
        }
    }

    let data = await fetchData(baseUrl + "upsert", request);
    console.log(data);

    deliveryGrid.updateGrid();
});

fileAttachment.on('click', uploadFiles);