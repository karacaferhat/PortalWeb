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



class OrderGrid extends DataGrid {

    constructor(state, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#orderGridContainer"
    } = {}) {

        super("https://tedarikportalorder.azurewebsites.net/api/v1/orders/",
            'getOrders', "pkey", columns, {
                enableGrouping : enableGrouping,
                selectionMode : selectionMode,
                gridContainerId : gridContainerId
            }
        );

        this.state = state;
    }



    async getUpdateArray() {
        let bDate = null;
        let eDate = null;
        let s = null;
        let oNo = null;

        if (beggingDate)
            bDate = beggingDate.option("value");

        if (endDate)
            eDate = endDate.option("value");

        if (sku && sku.val())
            s = sku.val().trim();
        if (orderNo && orderNo.val())
            ono = orderNo.val().trim();


        let updateRequest = {
            "vendor": sessionStorage[vendorKey],
            "state": this.state,
            "orderdatefrom": formatDate(bDate),
            "orderdateto": formatDate(eDate),
            "sku": s,
            "orderno": oNo
        };


        let data = await fetchData(this.baseUrl + this.getMethod, updateRequest);

        for (let i = 0; i < data.orders; i++) {
            data.orders[i].orderdate = new Date(data.orders[i].orderdate).formatDate("yyyy-MM-dd").toString();
        }

        return data.orders;
    }


    async sendData(button, method, reason = null, isCancel = false) {
        if (this.selectedKeys.length === 0) return;


        let text = button.html();
        button.html(
            /*html*/
            `         
            <div class="spinner-border text-white" role="status">
            <span class= "sr-only"> Loading...</span>
            </div>
        `
        );


        let request = {
            orderKeys: this.selectedKeys,
            isCancel: isCancel,
            username: sessionStorage[vendorNameKey],
            lang: "string"
        };


        if (reason) request["reason"] = reason;


        let data = await fetchData(this.baseUrl + method, request, false);

        button.html(text);


        if (data) {
            button.parents().find("div.modal").modal("hide");
            this.updateGrid();
        } else {
            button.parents("div.modal:first").find(".container").html(
                /*html*/
                `<span class="text-danger"><b>Islem Basarisiz</b></span>`
            );
        }
    }


    showModal(id) {
        let array = this.gridContainer.dxDataGrid("instance").getSelectedRowsData();
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
}