const state = "WAI";

const acceptButton = $("#acceptButton");
const cancelButton = $("#cancelButton");
const suspendButton = $("#suspendButton");

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");

acceptButton.on("click", () => { sendData(acceptButton, "accept", state) });
cancelButton.on("click", () => { sendData(cancelButton, "cancel", state, $("#cancelReasonText").val()) });
suspendButton.on("click", () => { sendData(suspendButton, "suspend", state, $("#suspendReasonText").val()) });

searchButton.on("click", () => refreshButtonAction(searchButton, state));
refreshGridButton.on("click", () => refreshButtonAction(refreshGridButton, state));


$("#acceptModalToggleButton").on("click", () => { toggleModal("#acceptModal") });
$("#cancelModalToggleButton").on("click", () => { toggleModal("#cancelModal") });
$("#suspendModalToggleButton").on("click", () => { toggleModal("#suspendModal") });


getOrdersAndUpdateTable(state);