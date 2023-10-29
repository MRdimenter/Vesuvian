import { COLLECTION_DATA } from "../constants";

const initialState = {
  loading: false,
  error: null,
  collectionTags: [],
};

const collectionTagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_DATA.TAGS.START_LOADING_COLLECTION_TAGS:
      return { ...state, loading: true, error: null };
    case COLLECTION_DATA.TAGS.FINISH_LOADING_COLLECTION_TAGS:
      return { ...state, loading: false, error: action.payload?.error || null };
    case COLLECTION_DATA.TAGS.SET_COLLECTION_TAGS_DATA:
      return { ...state, loading: false, error: null, collectionTags: action.payload };
    default:
      return state;
  }
}

export {
  collectionTagsReducer,
}
