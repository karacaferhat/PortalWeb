const state = "PRC";

const cancelButton = $("#cancelButton");
const suspendButton = $("#suspendButton");

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");

cancelButton.on("click", () => { sendData(cancelButton, "cancel", state, $("#cancelReasonText").val()) });
suspendButton.on("click", () => { sendData(suspendButton, "suspend", state, $("#suspendReasonText").val()) });

searchButton.on("click", () => refreshButtonAction(searchButton, state));
refreshGridButton.on("click", () => refreshButtonAction(refreshGridButton, state));


$("#cancelModalToggleButton").on("click", () => { toggleModal("#cancelModal") });
$("#suspendModalToggleButton").on("click", () => { toggleModal("#suspendModal") });


getOrdersAndUpdateTable(state);