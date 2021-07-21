const baseUrl = "https://tedarikportalorder.azurewebsites.net/api/v1/orders/";

const beggingDate = $("beggingDate");
const endDate = $("endDate");
const orderNo = $("orderNo");
const sku = $("sku");
const searchButton = $("searchButton");


const getOrdersAndUpdateTable = async()=>{
    let request = {
        "vendor": "701480",
        "state": "WAI",
        "orderdatefrom": beggingDate.val(),
        "orderdateto": endDate.val(),
        "sku": sku.val(),
        "orderno": orderNo.val()
      };    

    let data = await fetchData(baseUrl + 'getOrders', request);

    $("#gridContainer").dxDataGrid({
        dataSource: data.orders,
        columns: ["vendor", "vendorname", "orderno", "orderlineno", "orderdate", "orduser"],
        showBorders: true
    });
}

getOrdersAndUpdateTable();

searchButton.on("click", getOrdersAndUpdateTable);