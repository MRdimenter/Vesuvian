//const BASE_URL = 'http://45.141.103.134:8090'; // устаревший адрес сервера
const BASE_HOSTNAME = '212.113.120.198';
const BASE_PORT = '8090';
const BASE_URL = `http://${BASE_HOSTNAME}:${BASE_PORT}`;

const REGISTR_URL_PATH = 'api/v1/customers/create'; //TODO edit after clarification

const CUSTOMERS_URL = 'api/v1/customers';

const CURRENT_CUSTOMER_URL = 'api/v1/customers/me';

export {
    BASE_HOSTNAME,
    BASE_URL,
    REGISTR_URL_PATH,
    CUSTOMERS_URL,
    CURRENT_CUSTOMER_URL,
}