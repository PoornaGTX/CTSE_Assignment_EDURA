import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_BEGIN,
  STUDENT_GET_ALL_NOTICES_BEGIN,
  STUDENT_GET_ALL_NOTICES_SUCCESS,
  STUDENT_GET_ALL_NOTICES_ERROR,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SUBSCRIBE_TEACHER_BEGIN,
  SUBSCRIBE_TEACHER_SUCCESS,
  SUBSCRIBE_TEACHER_END,
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

  //get users
  if (action.type === GET_USERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      users: action.payload.users,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === GET_USERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  //subscribe handler
  if (action.type === SUBSCRIBE_TEACHER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SUBSCRIBE_TEACHER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Success",
    };
  }

  if (action.type === SUBSCRIBE_TEACHER_END) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === STUDENT_GET_ALL_NOTICES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === STUDENT_GET_ALL_NOTICES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      studentNotices: action.payload.notices,
      alertType: "success",
      alertText: "Success",
      // mySubscribeList: action.payload.users.find(
      //   (user) => user._id === action.payload.userId
      // ).subscribeIds,
    };
  }

  if (action.type === STUDENT_GET_ALL_NOTICES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  throw new Error(`no such action : ${action.type}`);
};
export default reducer;
