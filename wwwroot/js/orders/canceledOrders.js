const state = "CAN";
const waitingButton = $("#waitingButton");

const searchButton = $("#searchButton");
const refreshGridButton = $("#refreshGridButton");


waitingButton.on("click", () => {sendData(waitingButton, "cancel", state, $("waitingReasonText").val(), true);});

searchButton.on("click", () => refreshButtonAction(searchButton, state));
refreshGridButton.on("click", () => refreshButtonAction(refreshGridButton, state));


$("#waitingModalToggleButton").on("click", () => { toggleModal("#waitingModal") });


getOrdersAndUpdateTable(state);