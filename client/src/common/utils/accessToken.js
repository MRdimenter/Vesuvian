import Cookies from "js-cookie";

const REFRESH_TOKEN = 'refreshToken';

/*
    TODO Description
*/
function setAccessToken(refreshToken) {
    Cookies.set('refreshToken', refreshToken);
    
}

function getAccessToken(refreshToken) {
    Cookies.set('refreshToken', refreshToken);
}

function checkRefreshTokenExist() {
    return !!Cookies.get('refreshToken');
}
// проверка на актуальность рефреш-токена

async function checkRefreshTokenValidity() {
    // а вот тут самое интересное:
    // нужно сделать запрос, и только после этого дать ответ.
    //т..е получается, что функция будет асинхронной
}



export {checkRefreshTokenExist, setRefreshToken};