import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    // could not find API for login so simulated the scenario
    axios
      .get(`api/people/?search=${username}`)
      .then((data) => {
        const getUser = data.data.results.filter(
          (user) => user.name === username && user.birth_year === password
        );
        if (getUser.length) {
          dispatch(authSuccess(getUser[0]));
        } else {
          dispatch(authFail("user not found!!"));
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
// Luke Skywalker
// 19BBY

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
