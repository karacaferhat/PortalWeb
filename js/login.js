const baseUri = "https://tedarikportalapi.azurewebsites.net/api/v1/identity/";

const emailInput = $("#emailInput");
const passwordInput = $("#passwordInput");
const rememberMeCheckbox = $("#rememberMeCheckbox");
const loginSubmitButton = $("#loginSubmitButton");

const errorStatus = $("#errorStatus");

const loginText = $("#login-text");


const reportStatus = (buttonText = null, status = null) => {
    if(status)
        errorStatus.text(status);
    else
        errorStatus.text("");

    if(buttonText)
        loginText.text(buttonText);


}


const login = async () => {
    reportStatus("Checking User");

    let email = emailInput.val();
    let password = passwordInput.val();

    //email = "mete.arslan8@hotmail.com";
    //password = "Qwer123!!!";

    if(!(email && password)) {
        reportStatus("Login", "Please, Enter Username And Password ");
        return;
    }

    let request = {
        email : email,
        password : password
    }

    let data = await fetchData(baseUri + "login", request, false);
    console.log(data);

    if(data) {
        reportStatus("Success");

        setKeys(data);

        if(rememberMeCheckbox.val() === true){
            storeKeysAtLocalStorage(data);
        }
        else{
            if(localStorage.getItem(jwtTokenKey)) {
                removeKeysFromLocalStorage();
            }
        }

        window.location.href = "Index";
    }
    else{
        reportStatus("Login", "Username Or Password is Wrong");
    }
}


loginSubmitButton.on('click', login);