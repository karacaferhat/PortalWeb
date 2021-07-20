const loginUrl = "https://tedarikportalapi.azurewebsites.net/api/v1/identity/";


const jwtTokenKey = "jwtTokenKey";
const refreshTokenKey = "refreshTokenKey";


const fetchData = async (uri, request, useAuthorizationHeader = false, tryRefreshToken = true) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if(useAuthorizationHeader) {
        let jwt = sessionStorage.getItem(jwtTokenKey);
        if(jwt === null)
            jwt = localStorage.getItem(jwtTokenKey);


        if(jwt)
            headers.Authorization = "Bearer " + jwt;
        else{
            console.log("You need to login");//Kullaniciyi giris ekranina yonlendir.
            window.location.href = "https://tedarikportalwebapp.azurewebsites.net/Login";
        }
    }


    return await fetch( uri, {
        method: 'POST',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(request)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
                }

            else if(response.status === 401 && tryRefreshToken){
                refresh().then(async ()=>{
                    await fetchData(uri, request, useAuthorizationHeader, false);
                    throw Error(response);
                });
            }

            else
                throw Error(response);
        })
        .then(data => {
            if (data) {
                return data;
            }
        })
        .catch(error => {
            console.error('Couldn\'t Fetch. ' + error);
            if(useAuthorizationHeader && tryRefreshToken)
                console.log("Trying to refresh tokens");

            return null;
        });
}

const refresh = async ()=>{
    let jwt = sessionStorage.getItem(jwtTokenKey);
    let refreshToken = sessionStorage.getItem(refreshTokenKey);

    if(!(jwt && refreshToken)){
        jwt = localStorage.getItem(jwtTokenKey);
        refreshToken = localStorage.getItem(refreshTokenKey);
    }

    if(!(jwt && refreshToken))
        return false;


    let request = {
        token: jwt,
        refreshToken : refreshToken
    }

    let data = await fetchData(loginUrl + 'refresh', request, false);
    console.log(data);

    if(data) {
        sessionStorage.setItem(jwtTokenKey, data.token);
        sessionStorage.setItem(refreshTokenKey, data.refreshToken);

        if(localStorage.getItem(jwtTokenKey) && localStorage.getItem(refreshTokenKey)){
            localStorage.setItem(jwtTokenKey, data.token);
            localStorage.setItem(refreshTokenKey, data.token);
        }
    }
    else{
        sessionStorage.removeItem(jwtTokenKey);
        sessionStorage.removeItem(refreshTokenKey);
        if(localStorage.getItem(jwtTokenKey) && localStorage.getItem(refreshTokenKey)){
            localStorage.removeItem(jwtTokenKey);
            localStorage.removeItem(refreshTokenKey);
        }
    }
}