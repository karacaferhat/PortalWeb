const state = "SUS";

const waitingButton = $("#waitingButton");
const cancelButton = $("#cancelButton");

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");


waitingButton.on("click", () => {sendData(waitingButton, "suspend", state, $("waitingReasonText").val(), true);});
cancelButton.on("click", () => { sendData(cancelButton, "cancel", state, $("#cancelReasonText").val()) });

searchButton.on("click", () => refreshButtonAction(searchButton, state));
refreshGridButton.on("click", () => refreshButtonAction(refreshGridButton, state));


$("#waitingModalToggleButton").on("click", () => { toggleModal("#waitingModal") });
$("#cancelModalToggleButton").on("click", () => { toggleModal("#cancelModal") });


getOrdersAndUpdateTable(state);