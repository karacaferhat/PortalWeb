const baseUri = "https://tedarikportalorder.azurewebsites.net/api/v1/orders/";



const loadSchedule = async () => {
    

    let request = {
        vendor : sessionStorage[vendorKey]        
    }

    let data = await fetchData(baseUri + "getSchedule", request, false);
    console.log(data);
    var ds= data.scheduleItems;
    if(data) {
        $("#scheduler").dxScheduler({
            timeZone: "Turkey",
            dataSource:ds,
            views: ["month"],
            currentView: "month",
            currentDate: new Date(),
            startDayHour: 9,
            height: 600
        });
    }
    else{
        console.log("Err");
    }
}



const loadInfobox = async () => {
    

    let request = {
        vendor : sessionStorage[vendorKey],
        username: sessionStorage[emailKey],
        lang: "TR"        
    }
    let url="https://tedarikportalcache.azurewebsites.net/api/v1/cache/getDashboard";
    let data = await fetchData(url, request, false);
    console.log(data);
    var ds= data.scheduleItems;
    if(data) {
       let dashboard=data.dashboard;
       $("#cancelledOrderInfoBox").html(dashboard.cancelledorders);
       $("#waitingOrderInfoBox").html(dashboard.waitingorders);
       $("#readyOrderInfoBox").html(dashboard.processorders);
       $("#suspendedOrderInfoBox").html(dashboard.suspendedorders);
       
       

    }
    else{
        console.log("Err");
    }
}

$(function(){
    var dataSource = [{
        day: "Ocak",
        oranges: 100
    }, {
        day: "Şubat",
        oranges: 90
    }, {
        day: "Mart",
        oranges: 100
    }, {
        day: "Nisan",
        oranges: 75 
    }, {
        day: "Mayıs",
        oranges: 100
    }, {
        day: "Haziran",
        oranges: 100
    }, {
        day: "Temmuz",
        oranges: 0
    }, {
        day: "Ağustos",
        oranges: 0
    }, {
        day: "Eylül",
        oranges: 0
    }, {
        day: "Ekim",
        oranges: 0
    }, {
        day: "Kasım",
        oranges: 0 
    }, {
        day: "Aralık",
        oranges: 0
    }];
    $("#chart").dxChart({
        dataSource: dataSource, 
        series: {
            argumentField: "day",
            valueField: "oranges",
            name: "Puan",
            type: "bar",
            color: '#0dcaf0'
        }
    });
});





$(function(){
    loadSchedule();
    loadInfobox();
});