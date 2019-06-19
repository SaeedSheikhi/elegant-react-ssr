import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
//
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import { getToken } from "./api";

export const AUTHENTICATE = "auth/AUTHENTICATE";
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";

export const setCurrentUser = user => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    user
  });
};

export const establishCurrentUser = () => dispatch =>
  new Promise(resolve => {
    const userFromCookie = Cookies.getJSON("your_site_name");
    if (userFromCookie) {
      dispatch(setCurrentUser(userFromCookie));
      resolve(userFromCookie);
    } else {
      resolve({});
    }
  });

export const renewToken = () => async dispatch => {
  const res = await getToken();
  const token = res.data;
  localStorage.setItem("jwtToken", token);
  setAuthorizationToken(token);
  dispatch(setCurrentUser(jwtDecode(token)));
};

export const loginUser = token => dispatch => {
  localStorage.setItem("jwtToken", token);
  setAuthorizationToken(token);
  dispatch(setCurrentUser(jwtDecode(token)));
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  Cookies.remove("your_site_name");
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};
