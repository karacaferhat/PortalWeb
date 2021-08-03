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

class DataGrid {

    constructor(baseUrl, getMethod, keyColumn, columns, {
        enableGrouping = true,
        selectionMode = "multiple",
        gridContainerId = "#gridContainer",
        masterDetail = null,
        exportEnabled = true,
        searchPanelEnabled = true
    } = {}) {
        if (this.constructor == DataGrid)
            throw new Error("Abstract classes can't be instantiated.");

        this.baseUrl = baseUrl;
        this.getMethod = getMethod;
        this.keyColumn = keyColumn;
        this.columns = columns;
        this._gridContainer = $(gridContainerId);
        this._options = {
            enableGrouping: enableGrouping,
            selectionMode: selectionMode,
            masterDetail: masterDetail,
            exportEnabled: exportEnabled,
            searchPanelEnabled: searchPanelEnabled
        };
        this._data = null;
        this._grid = null;
    }


    async getUpdateArray() {
        throw new Error("This method must be implemented");
    }

    get selectedKeys() {
        if (this._gridContainer == null)
            throw new Error("DataGrid Must Be Initiliazed")

        let gridInstance = this._gridContainer.dxDataGrid("instance");
        return gridInstance.getSelectedRowKeys();
    }

    get selectedRows() {
        if (this._gridContainer == null)
            throw new Error("DataGrid Must Be Initiliazed")

        let rows = [];

        this.selectedKeys.forEach(key => {
            if (Array.isArray(this.keyColumn)) {
                let numberOfKeys = this.keyColumn.length;

                rows.push(this._data.find(d => {
                    for (let i = 0; i < numberOfKeys; i++) {    
                        if (d[Object.keys(key)[i]] !== key[Object.keys(key)[i]]) {
                            return false;
                        }
                    }
                    return true;
                }));                
            } else {
                rows.push(this._data.find(d =>
                    (key === d[Object.keys(d)[0]])
                ));

            }
        });

        return rows;
    }

    get grid(){
        return this._grid;
    }

    get gridContainer(){
        return this._gridContainer;
    }

    get allRows() {
        return this._data;
    }

    get totalRowCount() {
        return this._data.length
    }


    async updateGrid() {
        this._data = await this.getUpdateArray();

        let settings = {
            dataSource: this._data,
            keyExpr: this.keyColumn,
            columns: this.columns,
            showBorders: true,
            noDataText: "Kayıt Bulunamadı",
            allowColumnResizing: true,
            rowAlternationEnabled: true,
            columnAutoWidth: true,
            loadPanel: {
                enabled: true,
                text: "Yukleniyor"
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            searchPanel: {
                visible: this._options.searchPanelEnabled,
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
                mode: this._options.selectionMode
            },
            export: {
                enabled: this._options.exportEnabled,
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

        };

        if (this._options.enableGrouping) {
            settings["columnChooser"] = {
                enabled: true,
                mode: "select",
                title: "Kolon Seçimi"
            };
            settings["groupPanel"] = {
                visible: true,
                emptyPanelText: "Gruplamak için buraya sürükleyin"
            };
        }
        if(this._options.masterDetail){
            settings["masterDetail"] = this._options.masterDetail;
        }


        this._grid = this._gridContainer.dxDataGrid(settings);
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