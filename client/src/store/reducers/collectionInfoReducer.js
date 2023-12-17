import { COLLECTION_DATA } from "../constants";

const initialState = {
  loading: false,
  error: null,
  collectionInfo: {},
  isDeleted: false,
};

const collectionInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    // todo остальные этапы загрузки (start, finish, error)
    case COLLECTION_DATA.INFO.SET_COLLECTION_INFO:
      return { ...state, collectionInfo: action.payload, error: null };
    case COLLECTION_DATA.INFO.DELETE_COLLECTION_INFO:
      return { ...state, isDeleted: action.payload, error: null };
    default:
      return state;
  }
}

export {
  collectionInfoReducer,
}
