import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  isAuthenticated: null,
  username: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      // save token inside local/session storage
      // we are not saving into local/session storage as we dont have token from API
      return updateObject(state, {
        isAuthenticated: true,
        username: action.data.name,
        error: null,
        loading: false,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
      // remove token from local/session storage
      return updateObject(state, {
        token: null,
        isAuthenticated: null,
        username: null,
      });
    default:
      return state;
  }
};

export default reducer;
