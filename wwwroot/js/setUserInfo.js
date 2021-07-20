const userNameText = $("#userNameText");

if(userNameText){
    userNameText.text(sessionStorage.getItem(vendorNameKey));
}