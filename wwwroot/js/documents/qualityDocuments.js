const documentGrid = new DocumentGrid(null);

const createButton = $("#createButton");

const refcode = $("#refcode");
const sku = $("#sku");
const note = $("#note");


createButton.on('click', saveDocumentData());


documentGrid.updateGrid();
