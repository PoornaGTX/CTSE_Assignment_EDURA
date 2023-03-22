import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_BEGIN,
} from "./action";

const reducer = (state, action) => {
  //Register user
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      isLogedIn: true,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //Login User

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      isLogedIn: true,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //logOut user
  if (action.type === LOGOUT_BEGIN) {
    return {
      ...state,
      isLoading: false,
      token: "",
      user: "",
      isLogedIn: false,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting",
    };
  }

  throw new Error(`no such action : ${action.type}`);
};
export default reducer;
