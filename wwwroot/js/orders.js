const baseUrl = "https://tedarikportalorder.azurewebsites.net/api/v1/orders/";


$("#beggingDate").dxDateBox({
  showClearButton: true,
  useMaskBehavior: true,
  displayFormat: dateFormat,
  type: "date",
});
$("#endDate").dxDateBox({
  showClearButton: true,
  useMaskBehavior: true,
  displayFormat: dateFormat,
  type: "date",
});

const beggingDate = $("#beggingDate").dxDateBox("instance");
const endDate = $("#endDate").dxDateBox("instance");
const orderNo = $("#orderNo");
const sku = $("#sku");

const searchButton = $("#searchButton");
const acceptButton = $("#acceptButton");
const cancelButton = $("#cancelButton");
const suspendButton = $("#suspendButton");
const refreshGridButton = $("#refreshGridButton");

const confirmationModal = $("confirmationModal");

const cancelReasonText = $("#cancelReasonText");
const suspendReasonText = $("#suspendReasonText");


const gridContainer = $("#gridContainer");


const getOrdersAndUpdateTable = async () => {
  let bDate = null;
  if (beggingDate)
    bDate = beggingDate.option("value");

  let eDate = null;
  if (endDate)
    eDate = endDate.option("value");

  let request = {
    "vendor": "701480",
    "state": "WAI",
    "orderdatefrom": formatDate(bDate),
    "orderdateto": formatDate(eDate),
    "sku": sku.val().trim(),
    "orderno": orderNo.val().trim()
  };


  let data = await fetchData(baseUrl + 'getOrders', request);

  for (let i = 0; i < data.orders; i++) {
    data.orders[i].orderdate = new Date(data.orders[i].orderdate).formatDate("yyyy-MM-dd").toString();
  }


  gridContainer.dxDataGrid({
    dataSource: data.orders,
    keyExpr: "pkey",
    columns: [
      "pkey",
      { dataField: "vendor", caption: "Tedarikçi" },
      { dataField: "orderno", caption: "Siparis No" },
      { dataField: "orderlineno", caption: "Siparis Sira No" },
      { dataField: "orderdate", caption: "Siparis Tarihi" },
      { dataField: "orduser", caption: "Siparisi Veren Kullanici" },
      { dataField: "ordunit", caption: "Siparis Birimi" },
      { dataField: "sku", caption: "SKU" }
    ],
    showBorders: true,
    noDataText: "Kayıt Bulunamadı",
    allowColumnResizing: true,
    rowAlternationEnabled: true,
    columnAutoWidth: true,
    filterRow: {
      visible: true,
      applyFilter: "auto"
    },
    searchPanel: {
      visible: true,
      width: 240,
      placeholder: "Ara..."
    },
    scrolling: {
      mode: "standart"
    },
    paging: {
      enabled: true
    },
    headerFilter: {
      visible: true
    },
    selection: {
      mode: 'multiple'
    },
    columnChooser: {
      enabled: true,
      mode: "select",
      title: "Kolon Seçimi"
    },
    groupPanel: {
      visible: true,
      emptyPanelText: "Gruplamak için buraya sürükleyin"
    },
    export: {
      enabled: true,
      allowExportSelectedData: true,
      texts: {
        exportAll: "Tümü",
        exportSelectedRows: "Seçimi Aktar",
        exportTo: "excel"
      },
    },
    onExporting: function (e) {
      var workbook = new ExcelJS.Workbook();
      var worksheet = workbook.addWorksheet('Data');

      DevExpress.excelExporter.exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        autoFilterEnabled: true
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Data.xlsx');
        });
      });
      e.cancel = true;
    }

  });

  gridContainer.dxDataGrid("columnOption", "pkey", "visible", false);

}


function formatDate(mydate) {
  if (mydate === null)
    return null;

  try {
    var dateObj = new Date(mydate);

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var curr_date = dateObj.getDate();
    var curr_month = dateObj.getMonth();
    curr_month = curr_month + 1;
    var curr_year = dateObj.getFullYear();
    var curr_min = dateObj.getMinutes();
    var curr_hr = dateObj.getHours();
    var curr_sc = dateObj.getSeconds();
    if (curr_month.toString().length === 1)
      curr_month = '0' + curr_month;
    if (curr_date.toString().length === 1)
      curr_date = '0' + curr_date;
    if (curr_hr.toString().length === 1)
      curr_hr = '0' + curr_hr;
    if (curr_min.toString().length === 1)
      curr_min = '0' + curr_min;

    return curr_year + "-" + curr_month + "-" + curr_date + "T " + curr_hr + ":" + curr_min + ":" + curr_sc + ".0000000Z";
  } catch (e) {
    console.log(e);
    return '';
  }
}


const getSelectedKeys = _ => {
  let gridInstance = gridContainer.dxDataGrid("instance");
  return gridInstance.getSelectedRowKeys();
}


const sendData = async (button, method, reason = null) => {
  let array = getSelectedKeys();
  if (array.length === 0) return;

  let request = {
    orderKeys: array,
    isCancel: false,
    username: "string",
    lang: "string"
  };

  if (reason) request["reason"] = reason;


  let text = button.html();
  button.html(
    /*html*/
    `         
      <div class="spinner-border text-white" role="status">
        <span class= "sr-only"> Loading...</span>
      </div>
     `
    );

  let data = await fetchData(baseUrl + method, request, false);
  
  button.html(text);


  if (data) {
    button.parents().find("div.modal").modal("hide");
    getOrdersAndUpdateTable();
  }
  else {
    button.parents("div.modal:first").find(".container").html(
      /*html*/
      `<span class="text-danger"><b>Islem Basarisiz</b></span>`
    );
  }
}


acceptButton.on("click", () => { sendData(acceptButton, "accept") });
cancelButton.on("click", () => { sendData(cancelButton, "cancel", cancelReasonText.val()) });
suspendButton.on("click", () => { sendData(suspendButton, "suspend", suspendReasonText.val()) });


const refreshButtonAction = async (button) => {
  let text = button.html();

  button.html(
    /*html*/
    `         
      <div class="spinner-border text-white" role="status">
        <span class= "sr-only"> Loading...</span>
      </div>
     `
    );
getOrdersAndUpdateTable().then(() => button.html(text));
}

searchButton.on("click", () => refreshButtonAction(searchButton));
refreshGridButton.on("click", () => refreshButtonAction(refreshGridButton));

const toggleModal = id => {
  let array = gridContainer.dxDataGrid("instance").getSelectedRowsData();
  if (array.length === 0) return;

  var s = "";


  for (let i = 0; i < array.length; i++) {
    if (i != array.length - 1)
      s += array[i].orderno + ", ";
    else
      s += array[i].orderno + " ";
  }

  let plu = array.length > 1 ? 'ler' : '';

  $(id).find(".container").html(s + `sipariş numaralı sipariş${plu} seçildi.`);
  $(id).modal("show");
}

$("#acceptModalToggleButton").on("click", () => { toggleModal("#acceptModal") });
$("#cancelModalToggleButton").on("click", () => { toggleModal("#cancelModal") });
$("#suspendModalToggleButton").on("click", () => { toggleModal("#suspendModal") });


getOrdersAndUpdateTable();