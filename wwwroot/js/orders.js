const baseUrl = "https://tedarikportalorder.azurewebsites.net/api/v1/orders/";

const beggingDate = $("#beggingDate");
const endDate = $("#endDate");
const orderNo = $("#orderNo");
const sku = $("#sku");
const searchButton = $("#searchButton");


const getOrdersAndUpdateTable = async()=>{
    let request = {
        "vendor": "701480",
        "state": "WAI",
        "orderdatefrom": beggingDate.val(),
        "orderdateto": endDate.val(),
        "sku": sku.val().trim(),
        "orderno": orderNo.val().trim()
      };    

    let data = await fetchData(baseUrl + 'getOrders', request);
    console.log(data.orders);


    for(let i = 0; i < data.orders.length; i++){
      data.orders[i].orderdate = formatDate(data.orders[i].orderdate);
    }


    $("#gridContainer").dxDataGrid({
        dataSource: data.orders,
        columns: ["vendor", "vendorname", "orderno", "orderlineno", "orderdate", "orduser", "ordunit", "sku"],
        showBorders: true
    });
}


getOrdersAndUpdateTable();

searchButton.on("click", getOrdersAndUpdateTable);



function formatDate(mydate) {
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

      return curr_year + "-" + curr_month + "-" + curr_date + "T " + curr_hr + ":" + curr_min + ":" + curr_sc+".0000000Z";
  } catch (e) {
      console.log(e);
      return '';
  }

}
