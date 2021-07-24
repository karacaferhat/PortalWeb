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

var dataSourcePie = [{
    reason: "Sevk Hataları",
    ratio: 112
}, {
    reason: "Ambalaj Hataları",
    ratio: 100
}, {
    reason: "Kalite Hataları",
    ratio: 60
}];

var types = ["shift", "hide", "none"];


$(function(){
    $("#pie").dxPieChart({
        palette: "bright",
        dataSource: dataSourcePie,
        title: "Sevk İptal Nedenleri",
        legend: {
            orientation: "horizontal",
            itemTextPosition: "right",
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            columnCount: 4
        },
        "export": {
            enabled: true
        },
        series: [{
            argumentField: "reason",
            valueField: "ratio",
            label: {
                visible: true,
                font: {
                    size: 16
                },
                connector: {
                    visible: true,
                    width: 0.5
                },
                position: "columns",
                customizeText: function(arg) {
                    return arg.valueText + " (" + arg.percentText + ")";
                }
            }
        }]
    });
});



var data = [
    {
        text: "Website Re-Design Plan",
        startDate: new Date("2021-04-26T16:30:00.000Z"),
        endDate: new Date("2021-04-26T18:30:00.000Z")
    }, {
        text: "Book Flights to San Fran for Sales Trip",
        startDate: new Date("2021-04-26T19:00:00.000Z"),
        endDate: new Date("2021-04-26T20:00:00.000Z"),
        allDay: true
    }, {
        text: "Install New Router in Dev Room",
        startDate: new Date("2021-04-26T21:30:00.000Z"),
        endDate: new Date("2021-04-26T22:30:00.000Z")
    }, {
        text: "Approve Personal Computer Upgrade Plan",
        startDate: new Date("2021-04-27T17:00:00.000Z"),
        endDate: new Date("2021-04-27T18:00:00.000Z")
    }, {
        text: "Final Budget Review",
        startDate: new Date("2021-04-27T19:00:00.000Z"),
        endDate: new Date("2021-04-27T20:35:00.000Z")
    }, {
        text: "New Brochures",
        startDate: new Date("2021-04-27T21:30:00.000Z"),
        endDate: new Date("2021-04-27T22:45:00.000Z")
    }, {
        text: "Install New Database",
        startDate: new Date("2021-04-28T16:45:00.000Z"),
        endDate: new Date("2021-04-28T18:15:00.000Z")
    }, {
        text: "Approve New Online Marketing Strategy",
        startDate: new Date("2021-04-28T19:00:00.000Z"),
        endDate: new Date("2021-04-28T21:00:00.000Z")
    }, {
        text: "Upgrade Personal Computers",
        startDate: new Date("2021-04-28T22:15:00.000Z"),
        endDate: new Date("2021-04-28T23:30:00.000Z")
    }, {
        text: "Customer Workshop",
        startDate: new Date("2021-04-29T18:00:00.000Z"),
        endDate: new Date("2021-04-29T19:00:00.000Z"),
        allDay: true
    }, {
        text: "Prepare 2021 Marketing Plan",
        startDate: new Date("2021-04-29T18:00:00.000Z"),
        endDate: new Date("2021-04-29T20:30:00.000Z")
    }, {
        text: "Brochure Design Review",
        startDate: new Date("2021-04-29T21:00:00.000Z"),
        endDate: new Date("2021-04-29T22:30:00.000Z")
    }, {
        text: "Create Icons for Website",
        startDate: new Date("2021-04-30T17:00:00.000Z"),
        endDate: new Date("2021-04-30T18:30:00.000Z")
    }, {
        text: "Upgrade Server Hardware",
        startDate: new Date("2021-04-30T21:30:00.000Z"),
        endDate: new Date("2021-04-30T23:00:00.000Z")
    }, {
        text: "Submit New Website Design",
        startDate: new Date("2021-04-30T23:30:00.000Z"),
        endDate: new Date("2021-05-01T01:00:00.000Z")
    }, {
        text: "Launch New Website",
        startDate: new Date("2021-04-30T19:20:00.000Z"),
        endDate: new Date("2021-04-30T21:00:00.000Z")
    }
];

$(function(){
    $("#scheduler").dxScheduler({
        timeZone: "Turkey",
        dataSource: data,
        views: ["day", "week", "month"],
        currentView: "day",
        currentDate: new Date(2021, 3, 29),
        startDayHour: 9,
        height: 600
    });
});