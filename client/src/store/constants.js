export const DARK_MODE_REDUCER = {
  DARK_MODE: 'DARK_MODE',
}

export const AUTHENTICATION_STATUS = {
  AUTH_STATUS: 'AUTH',
  AUTH_STATE: 'STATE',
}

export const CURRENT_CUSTOMER_DATA = {
  APPEND_DATA: 'APPEND_DATA',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR'
}

export const COLLECTION_DATA = {
  CARDS: {
    START_LOADING_COLLECTION: 'START_LOADING_COLLECTION',
    FINISH_LOADING_COLLECTION: 'FINISH_LOADING_COLLECTION',
    SET_COLLECTION_DATA: 'COLLECTION_DATA',
    SET_ERROR_COLLECTION: 'SET_ERROR_COLLECTION',
  },
  TAGS: {
    START_LOADING_COLLECTION_TAGS: 'START_LOADING_COLLECTION_TAGS',
    FINISH_LOADING_COLLECTION_TAGS: 'FINISH_LOADING_COLLECTION_TAGS',
    SET_COLLECTION_TAGS_DATA: 'SET_COLLECTION_TAGS_DATA',
    SET_ERROR_COLLECTION_TAGS: 'SET_ERROR_COLLECTION_TAGS',
  },
  DATA: {
    SET_COLLECTION_DATA_DATA: 'SET_COLLECTION_TAGS_DATA',
    DELETE_COLLECTION_DATA: 'DELETE_COLLECTION_DATA',
    SET_ERROR_DELETE_COLLECTION_DATA: 'SET_ERROR_DELETE_COLLECTION_DATA',
  },
}

export const CUSTOMER_DATA = {
  START_LOADING_CUSTOMER_DATA: 'START_LOADING_CUSTOMER_DATA',
  FINISH_LOADING_CUSTOMER_DATA: 'FINISH_LOADING_CUSTOMER_DATA',
  SET_CUSTOMER_DATA: 'SET_CUSTOMER_DATA',
  SET_ERROR_CUSTOMER_DATA: 'SET_ERROR_CUSTOMER_DATA',
}