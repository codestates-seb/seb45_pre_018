// actions.js

export const loginSuccess = () => {
    return {
      type: 'LOGIN_SUCCESS',
    };
  }
  
  export const loginFail = (message) => {
    return {
      type: 'LOGIN_FAIL',
      payload: message,
    };
  }