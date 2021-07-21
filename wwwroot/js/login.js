const baseUri = "https://tedarikportalapi.azurewebsites.net/api/v1/identity/";

const emailInput = $("#emailInput");
const passwordInput = $("#passwordInput");
const rememberMeCheckbox = $("#rememberMeCheckbox");
const loginSubmitButton = $("#loginSubmitButton");

const errorStatus = $("#errorStatus");

const loginText = $("#login-text");
const loginSpinner = $("#login-spinner");


const reportStatus = (isSpinning, buttonText = null, status = null) => {
    if(status)
        errorStatus.text(status);
    else
        errorStatus.text("");

    if(buttonText)
        loginText.text(buttonText);

    if (isSpinning) {
        loginText.css("display", "none");
        loginSpinner.css("display", "block");
    } else {
        loginText.css("display", "block");
        loginSpinner.css("display", "none");
    }

}


const login = async () => {
    reportStatus(true, "Checking User");

    let email = emailInput.val();
    let password = passwordInput.val();

    //email = "mete.arslan8@hotmail.com";
    //password = "Qwer123!!!";

    if(!(email && password)) {
        reportStatus(false, "Login", "Please, Enter Username And Password ");
        return;
    }

    let request = {
        email : email,
        password : password
    }

    let data = await fetchData(baseUri + "login", request, false);
    console.log(data);

    if(data) {
        reportStatus(false, "Success");

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
        reportStatus(false, "Login", "Username Or Password is Wrong");
    }
}


loginSubmitButton.on('click', login);