//const BASE_URL = 'http://45.141.103.134:8090'; // устаревший адрес сервера
const BASE_HOSTNAME = '212.113.120.198';
const BASE_PORT = '8090';
const TEMP_BASE_PORT = '8099';
const BASE_URL = `http://${BASE_HOSTNAME}:${BASE_PORT}`;
const TEMP_BASE_URL = `http://${BASE_HOSTNAME}:${TEMP_BASE_PORT}`;

const REGISTR_URL_PATH = 'api/v1/customers/create'; //TODO edit after clarification

const CUSTOMERS_URL = 'api/v1/customers';

//TODO возможно есть смысл объединить константы по коллекциям в общий объект
const CURRENT_CUSTOMER_URL = 'api/v1/customers/me';
const CURRENT_CUSTOMER_COLLECTIONS_URL = 'api/v1/collections/me';
const COLLECTION_URL = 'api/v1/collections';
const COLLECTION_CARDS_URL_TAIL = 'cards';
const CREATE = 'create';
//TODO api/v1/ in its own constatnt
const COLLECTION_TAGS_URL = 'api/v1/collections'; // TODO удалить теперь ненужную константу
const COLLECTION_TAGS_URL_TAIL = 'tags';

const METHOD = {
    POST: 'POST',
    PUT: 'PUT'
}

export {
    BASE_HOSTNAME,
    BASE_URL,
    REGISTR_URL_PATH,
    CUSTOMERS_URL,
    CURRENT_CUSTOMER_URL,
    CURRENT_CUSTOMER_COLLECTIONS_URL,
    TEMP_BASE_PORT,
    TEMP_BASE_URL,
    COLLECTION_URL,
    COLLECTION_CARDS_URL_TAIL,
    CREATE,
    COLLECTION_TAGS_URL,
    COLLECTION_TAGS_URL_TAIL,
    METHOD,
}