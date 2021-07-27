const baseUrl = "https://tedarikportaldelivery.azurewebsites.net/api/v1/delivery/";

$("#asnDate").dxDateBox({
    showClearButton: true,
    useMaskBehavior: true,
    displayFormat: dateFormat,
    type: "date",
});
const asnDate = $("#asnDate").dxDateBox("instance");
const asn = $("#asn");
const newAsnButton = $("#newAsnButton");



class DeliveryGrid extends DataGrid{

    constructor(state, columns, gridContainerId = "#deliveryGridContainer"){
        super(baseUrl, 'getDelivery', "pkey", columns, gridContainerId);
        
        this.state = state;
    }

    async getUpdateArray(){
        let request ={
            vendor : sessionStorage[vendorKey],
            state : this.state,
            asn : "701480-2021-00001"//asn.val()
        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);

        return data.data;
    }

}


newAsnButton.on("click", async ()=>{
    let request = {
        vendor : sessionStorage[vendorKey],
        updUser : "string"
    }

    let data = await fetchData(baseUrl + "generateasn", request);

    if(data && data.resultType){
        asn.val(data.asn);
    }
});