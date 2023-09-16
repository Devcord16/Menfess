// authReducer.js
const initialState = {
  user: null, // Ini akan menyimpan data pengguna setelah login berhasil
  error: null, // Ini akan menyimpan pesan kesalahan jika login gagal
  accessToken: null, //ini akan menyimpan aksesToken
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
