import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_BEGIN,
  ADD_GRADE_BEGIN,
  ADD_GRADE_SUCCESS,
  ADD_GRADE_ERROR,
  GET_GRADES_BEGIN,
  GET_GRADES_SUCCESS,
  GET_GRADES_ERROR,
  GET_SUBJECTS_BEGIN,
  GET_SUBJECTS_SUCCESS,
  GET_SUBJECTS_ERROR,
  UPDATE_GRADE_BEGIN,
  UPDATE_GRADE_SUCCESS,
  UPDATE_GRADE_ERROR,
  DELETE_GRADE_BEGIN,
  UPDATE_SUBJECT_BEGIN,
  UPDATE_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_ERROR,
  DELETE_SUBJECT_BEGIN,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_ERROR,
  ADD_SUBJECT_BEGIN,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_ERROR,
} from "./action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: "",
  token: "",
  isLogedIn: false,
  grades: [],
  subjects: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/auth/register",
        currentUser
      );
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //login

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/auth/login",
        currentUser
      );

      const { user, token } = response.data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      // AsyncStorage.setItem("user", JSON.stringify(user));
      // AsyncStorage.setItem("token", token);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // adminShowStats();
  };

  const logOutUser = async () => {
    dispatch({ type: LOGOUT_BEGIN });
  };

  //ADD USER TO LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token }) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    AsyncStorage.setItem("token", token);
  };
  //REMOVE USER FROM LOCAL STORAGE
  const removeUserFromLocalStorage = () => {
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("token");
  };

  //get all users
  const getAllUsers = async () => {
    dispatch({ type: GET_USERS_BEGIN });

    try {
      const response = await axios.get("http://10.0.2.2:5000/api/auth/users");
      const { users } = response.data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { users },
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //subscribe handler
  const subscribeHandler = async (subData) => {
    dispatch({ type: SUBSCRIBE_TEACHER_BEGIN });
    try {
      const response = await axios.patch(
        `http://10.0.2.2:5000/api/v1/students/subscribe/${state.user._id}`,
        subData
      );
      await getAllUsersStd();
      dispatch({
        type: SUBSCRIBE_TEACHER_SUCCESS,
        // payload: { AllSubjects },
        payload: { userID: state.user._id },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SUBSCRIBE_TEACHER_END,
        payload: { msg: error.response.data.msg },
      });
    }
    // getAllSubjects();
  };
  //get all notices
  const getAllNoticesStd = async () => {
    getAllUsersStd();
    dispatch({ type: STUDENT_GET_ALL_NOTICES_BEGIN });

    try {
      const response = await axios.get(
        "http://10.0.2.2:5000/api/v1/students/notices",
        { params: { subscribeIds: state.mySubscribeList } }
      );
      const { notices } = response.data;
      dispatch({
        type: STUDENT_GET_ALL_NOTICES_SUCCESS,
        payload: { notices },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_USERS_ERROR,
      });
    }
  };

  //add grade by admin
  const addGrade = async (gradeData) => {
    dispatch({ type: ADD_GRADE_BEGIN });

    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/v1/admin/grades",
        gradeData
      );
      dispatch({
        type: ADD_GRADE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_GRADE_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //get all Grades
  const getAllGrades = async () => {
    dispatch({ type: GET_GRADES_BEGIN });

    try {
      const response = await axios.get(
        "http://10.0.2.2:5000/api/v1/admin/grades"
      );
      const { AllGrades } = response.data;
      dispatch({
        type: GET_GRADES_SUCCESS,
        payload: { AllGrades },
      });
    } catch (error) {
      dispatch({
        type: GET_GRADES_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };
  //add subject
  const addSubject = async (subjectdata) => {
    dispatch({ type: ADD_SUBJECT_BEGIN });

    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/v1/admin/",
        subjectdata
      );
      dispatch({
        type: ADD_SUBJECT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_SUBJECT_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //get all subjects
  const getAllSubjects = async () => {
    dispatch({ type: GET_SUBJECTS_BEGIN });

    try {
      const response = await axios.get("http://10.0.2.2:5000/api/v1/admin/");
      const { AllSubjects } = response.data;

      dispatch({
        type: GET_SUBJECTS_SUCCESS,
        payload: { AllSubjects },
      });
    } catch (error) {
      dispatch({
        type: GET_SUBJECTS_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //update subject
  const updateGrade = async (smongoGradeeID, gradeData) => {
    dispatch({ type: UPDATE_GRADE_BEGIN });

    try {
      const response = await axios.patch(
        `http://10.0.2.2:5000/api/v1/admin/grades/${smongoGradeeID}`,
        gradeData
      );
      dispatch({
        type: UPDATE_GRADE_SUCCESS,
        // payload: { AllSubjects },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_GRADE_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
    getAllGrades();
  };

  //delete subject
  const deleteGrade = async (GradeIDMongo) => {
    dispatch({ type: DELETE_GRADE_BEGIN });

    try {
      const response = await axios.delete(
        `http://10.0.2.2:5000/api/v1/admin/grades/${GradeIDMongo}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  //update subject
  const updateSubject = async (subjectID, subData) => {
    dispatch({ type: UPDATE_SUBJECT_BEGIN });

    try {
      const response = await axios.patch(
        `http://10.0.2.2:5000/api/v1/admin/${subjectID}`,
        subData
      );
      dispatch({
        type: UPDATE_SUBJECT_SUCCESS,
        // payload: { AllSubjects },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBJECT_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
    getAllSubjects();
  };

  //delete subject
  const deleteSubject = async (subjectID) => {
    dispatch({ type: DELETE_SUBJECT_BEGIN });

    try {
      const response = await axios.delete(
        `http://10.0.2.2:5000/api/v1/admin/${subjectID}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logOutUser,
        getAllNoticesStd,
        subscribeHandler,
        getAllUsers,
        addGrade,
        getAllGrades,
        getAllSubjects,
        updateGrade,
        deleteGrade,
        deleteSubject,
        updateSubject,
        addSubject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
