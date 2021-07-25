function formatDate(mydate) {
    if (mydate === null)
        return null;

    try {
        var dateObj = new Date(mydate);

        var monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
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

class DataGrid{

    constructor(baseUrl, getMethod, keyColumn, columns){
        if(this.constructor == DataGrid)
            throw new Error("Abstract classes can't be instantiated.");


        this.baseUrl = baseUrl;
        this.getMethod = getMethod;
        this.keyColumn = keyColumn;
        this.columns = columns;
        this.gridContainer = $("#gridContainer");
    }


    async getUpdateArray(){
        throw new Error("This method must be implemented");
    }

    get selectedKeys() {
        let gridInstance = this.gridContainer.dxDataGrid("instance");
        return gridInstance.getSelectedRowKeys();
    }


    async updateGrid() {
        this.gridContainer.dxDataGrid({
            dataSource: await this.getUpdateArray(),
            keyExpr: this.keyColumn,
            columns: this.columns,
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
                        saveAs(new Blob([buffer], {
                            type: 'application/octet-stream'
                        }), 'Data.xlsx');
                    });
                });
                e.cancel = true;
            }

        });
    }

    async refreshButtonAction(button) {
        let text = button.html();

        button.html(
            /*html*/
            `         
            <div class="spinner-border text-white" role="status">
            <span class= "sr-only"> Loading...</span>
            </div>
        `
        );
        this.updateGrid().then(() => button.html(text));
    }
}