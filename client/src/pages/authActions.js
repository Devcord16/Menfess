// authActions.js
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/register`,
      {
        email,
        password,
      }
    );

    // Jika login berhasil, dispatch aksi yang sesuai, misalnya LOGIN_SUCCESS dengan payload data pengguna.
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    // Jika login gagal, dispatch aksi yang sesuai, misalnya LOGIN_FAILURE dengan payload error.
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const signUp =
  (email, password, fullname, username, aboutme) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/register`,
        {
          fullname,
          username,
          email,
          password,
        }
      );

      // Jika login berhasil, dispatch aksi yang sesuai, misalnya LOGIN_SUCCESS dengan payload data pengguna.
      dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
    } catch (error) {
      // Jika login gagal, dispatch aksi yang sesuai, misalnya LOGIN_FAILURE dengan payload error.
      dispatch({ type: "SIGNUP_FAILURE", payload: error });
    }
  };

export const googleSignIn = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/google`
    );

    // Jika login berhasil, dispatch aksi yang sesuai, misalnya LOGIN_SUCCESS dengan payload data pengguna.
    dispatch({ type: "GOOGLE_SUCCESS", payload: response.data });
  } catch (error) {
    // Jika login gagal, dispatch aksi yang sesuai, misalnya LOGIN_FAILURE dengan payload error.
    dispatch({ type: "GOOGLE_FAILURE", payload: error });
  }
};
export const setAccessToken = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/refresh_token`
    );

    // Jika berhasil, dispatch action dengan payload data token.
    dispatch({ type: "SET_TOKEN", payload: response.data });
  } catch (error) {
    // Jika gagal, dispatch action dengan payload error.
    dispatch({ type: "SET_TOKEN_ERROR", payload: error });
  }
};
