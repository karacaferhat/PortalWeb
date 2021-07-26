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

const productName = $("#productName");
const quantity = $("#quantity");
const lot = $("#lot");
const fileAttachment = $("#fileAttachment");



class DeliveryGrid extends DataGrid{

    constructor(state, columns){
        super(baseUrl, 'getDelivery', "pkey", columns);
        
        this.state = state;
    }

    async getUpdateArray(){
        let request ={
            vendor : "701480",
            state : this.state,
            asn : "701480-2021-00001"//asn.val()
        }
        let data = await fetchData(this.baseUrl + this.getMethod, request);
        console.log(data);

        return data.data;
    }

}


newAsnButton.on("click", async ()=>{
    let request = {
        vendor : "701480",
        updUser : "string"
    }

    let data = await fetchData(baseUrl + "generateasn", request);
    console.log(data);

    if(data && data.resultType){
        asn.val(data.asn);
    }
})