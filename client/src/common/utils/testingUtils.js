/*
    Функция сна ()
    https://open.zeba.academy/zatyagivaniya-son-pauzy-ozhidanie-v-js/

    пример использования:
    await sleep(1500).then(() => { refresh_token = getRefreshTokenFromCookie() })
*/

function sleep(ms) {        
    return new Promise(resolve => setTimeout(resolve, ms));
}