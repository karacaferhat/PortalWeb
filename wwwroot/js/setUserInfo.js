const nameText = $("#loginNameText");
const surnameText = $("#loginSurnameText");
const vendorNameText = $("#loginVendorNameText");



if(nameText) nameText.text(sessionStorage.getItem(nameKey));
if(surnameText) surnameText.text(sessionStorage.getItem(surnameKey));
if(vendorNameText) vendorNameText.text(sessionStorage.getItem(vendorNameKey));
