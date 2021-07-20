const baseUri = "https://tedarikportalapi.azurewebsites.net/api/v1/identity/";

const emailInput = $("#emailInput");
const passwordInput = $("#passwordInput");
const rememberMeCheckbox = $("#rememberMeCheckbox");
const loginSubmitButton = $("#loginSubmitButton");

const login = async () => {
    let email = emailInput.val();
    let password = passwordInput.val();
    

    if(!(email && password))
        return;

    let request = {
        email : email,
        password : password
    }

    let data = await fetchData(baseUri + "login", request, false);
    console.log(data);

    if(data) {
        sessionStorage.setItem(jwtTokenKey, data.token);
        sessionStorage.setItem(refreshTokenKey, data.refreshToken);

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

        window.location.href = "https://tedarikportalwebapp.azurewebsites.net/Test";
    }
}


loginSubmitButton.on('click', login);