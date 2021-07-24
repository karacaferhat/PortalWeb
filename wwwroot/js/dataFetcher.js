const loginUrl = "https://tedarikportalapi.azurewebsites.net/api/v1/identity/";

const dateFormat = "yyyy-MM-dd";

const jwtTokenKey = "jwtTokenKey";
const refreshTokenKey = "refreshTokenKey";
const nameKey = "nameKey";
const surnameKey = "surnameKey";
const vendorNameKey = "vendorName";

var last_request_uri = null;




const fetchData = async (uri, request, useAuthorizationHeader = false, tryRefreshToken = true) => {
    if(last_request_uri === uri) return;//Prevent spamming at same uri
 
    last_request_uri = uri

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (useAuthorizationHeader) {
        let jwt = sessionStorage.getItem(jwtTokenKey);
        if (jwt === null)
            jwt = localStorage.getItem(jwtTokenKey);


        if (jwt)
            headers.Authorization = "Bearer " + jwt;
        else {
            console.log("You need to login");//Kullaniciyi giris ekranina yonlendir.
            window.location.href = "login.html";
        }
    }

    return await fetch(uri, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(request)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            else if (response.status === 401 && tryRefreshToken) {
                refresh().then(async () => {
                    await fetchData(uri, request, useAuthorizationHeader, false);
                    throw Error(response);
                });
            }

            else
                throw Error(response);
        })
        .then(data => {
            last_request_uri = null;

            if (data) {
                return data;
            }
        })
        .catch(error => {
            last_request_uri = null;

            console.error('Couldn\'t Fetch. ' + error);
            if (useAuthorizationHeader && tryRefreshToken)
                console.log("Trying to refresh tokens");

            return null;
        });
}

const refresh = async () => {
    let jwt = sessionStorage.getItem(jwtTokenKey);
    let refreshToken = sessionStorage.getItem(refreshTokenKey);

    if (!(jwt && refreshToken)) {
        jwt = localStorage.getItem(jwtTokenKey);
        refreshToken = localStorage.getItem(refreshTokenKey);
    }

    if (!(jwt && refreshToken))
        return false;


    let request = {
        token: jwt,
        refreshToken: refreshToken
    }

    let data = await fetchData(loginUrl + 'refresh', request, false);
    console.log(data);

    if (data) {
        setKeys(data)

        if (localStorage.getItem(jwtTokenKey) && localStorage.getItem(refreshTokenKey)) {
            storeKeysAtLocalStorage(data);
        }
    }
    else {
        removeKeys();

        if (localStorage.getItem(jwtTokenKey) && localStorage.getItem(refreshTokenKey)) {
            removeKeysFromLocalStorage();
        }
    }
}


const setKeys = (data) => {
    if (data) {
        sessionStorage.setItem(jwtTokenKey, data.token);
        sessionStorage.setItem(refreshTokenKey, data.refreshToken);
        sessionStorage.setItem(nameKey, data.userInfo.name);
        sessionStorage.setItem(surnameKey, data.userInfo.sirname);
        sessionStorage.setItem(vendorNameKey, data.userInfo.vendorname);
    }
}

const removeKeys = () => {
    sessionStorage.removeItem(jwtTokenKey);
    sessionStorage.removeItem(refreshTokenKey);
    sessionStorage.removeItem(nameKey);
    sessionStorage.removeItem(surnameKey);
    sessionStorage.removeItem(vendorNameKey);
}

const storeKeysAtLocalStorage = (data) => {
    if (data) {
        localStorage.setItem(jwtTokenKey, data.token);
        localStorage.setItem(refreshTokenKey, data.refreshToken);
        localStorage.setItem(nameKey, data.userInfo.name);
        localStorage.setItem(surnameKey, data.userInfo.sirname);
        localStorage.setItem(vendorNameKey, data.userInfo.vendorname);
    }
}

const removeKeysFromLocalStorage = (data) => {
    if (data) {
        localStorage.removeItem(jwtTokenKey);
        localStorage.removeItem(refreshTokenKey);
        localStorage.removeItem(nameKey);
        localStorage.removeItem(surnameKey);
        localStorage.removeItem(vendorNameKey);
    }
} 