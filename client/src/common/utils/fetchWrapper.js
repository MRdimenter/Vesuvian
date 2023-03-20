function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${process.env.REACT_APP_API_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

export {
    get,
};