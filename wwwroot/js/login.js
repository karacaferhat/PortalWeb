const baseUri = "https://tedarikportalapi.azurewebsites.net/api/v1/identity/";

const emailInput = $("#emailInput");
const passwordInput = $("#passwordInput");
const rememberMeCheckbox = $("#rememberMeCheckbox");
const loginSubmitButton = $("#loginSubmitButton");

const status = document.getElementById("status");

const uploadText = $("#login-text");
const uploadSpinner = $("#login-spinner");

const selectButton = document.getElementById("select-button");

const reportStatus = (message, isSpinning) => {
    status.innerHTML = `${message}<br/>`;

    if (isSpinning) {
        uploadText.css("display", "none");
        uploadSpinner.css("display", "block");
    } else {
        uploadText.css("display", "block");
        uploadSpinner.css("display", "none");
    }

}


const login = async () => {
    reportStatus("Logging", true)

    let email = emailInput.val();
    let password = passwordInput.val();

    //email = "mete.arslan8@hotmail.com";
    //password = "Qwer123!!!";

    if(!(email && password)) {
        reportStatus("Please, Enter Username And Password ", false);
        return;
    }

    let request = {
        email : email,
        password : password
    }

    let data = await fetchData(baseUri + "login", request, false);
    console.log(data);

    if(data) {
        reportStatus("Success", false)

        sessionStorage.setItem(jwtTokenKey, data.token);
        sessionStorage.setItem(refreshTokenKey, data.refreshToken);
        sessionStorage.setItem(vendorNameKey, data.userInfo.vendorname);
        

        if(rememberMeCheckbox.val() === true){
            localStorage.setItem(jwtTokenKey, data.token);
            localStorage.setItem(refreshTokenKey, data.refreshToken);
        }
        else{
            if(localStorage.getItem(jwtTokenKey)) {
                localStorage.removeItem(jwtTokenKey);
                localStorage.removeItem(refreshTokenKey);
            }
        }

        window.location.href = "Test";
    }
    else{
        reportStatus("Username Or Password is Wrong", false);
    }
}


loginSubmitButton.on('click', login);