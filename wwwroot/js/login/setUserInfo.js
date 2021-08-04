"use strict";


const nameText = $("#loginNameText");
const surnameText = $("#loginSurnameText");
const vendorNameText = $("#loginVendorNameText");
const vendorNameHeadText = $("#vendorHeaderName");


if(nameText) nameText.text(sessionStorage.getItem(nameKey));
if(surnameText) surnameText.text(sessionStorage.getItem(surnameKey));
if(vendorNameText) vendorNameText.text(sessionStorage.getItem(vendorNameKey));
if(vendorNameHeadText) vendorNameHeadText.html(sessionStorage.getItem(vendorNameKey));
