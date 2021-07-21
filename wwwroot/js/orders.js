const baseUrl = "https://tedarikportalorder.azurewebsites.net/api/v1/orders/";

const getOrdersAndUpdateTable = async()=>{
    let request = {
        "vendor": "701480",
        "state": "WAI",
        "orderdatefrom": null,
        "orderdateto": null,
        "sku": null,
        "orderno": null
      };    

    let data = await fetchData(baseUrl + 'getOrders', request);

    $("#gridContainer").dxDataGrid({
        dataSource: data.orders,
        columns: ["vendor", "vendorname", "orderno", "orderlineno", "orderdate", "orduser"],
        showBorders: true
    });
}

getOrdersAndUpdateTable();
