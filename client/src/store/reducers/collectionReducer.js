import { COLLECTION_DATA } from "../constants";

const initialState = {
  loading: false,
  error: null,
  collectionData: {
    collectionId: null,
    collectionCards: []
  },
  isDeleted: false,
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_DATA.CARDS.START_LOADING_COLLECTION:
      return { ...state, loading: true, error: null };
    case COLLECTION_DATA.CARDS.FINISH_LOADING_COLLECTION:
      return { ...state, loading: false, error: action.payload?.error || null };
    case COLLECTION_DATA.CARDS.SET_COLLECTION_DATA:
      return { ...state, collectionData: action.payload, error: null };
    case COLLECTION_DATA.DATA.DELETE_COLLECTION_DATA:
      console.log('DELETE_COLLECTION_DATA: action.payload: ', action.payload);
      return { ...state, isDeleted: action.payload, error: null };
    default:
      return state;
  }
}

export {
  collectionReducer,
}
