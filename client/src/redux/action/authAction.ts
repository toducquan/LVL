export const loginAction = (payload: any) => {
  return {
    type: 'LOGIN',
    payload: payload
  };
};

export const userLoggedIn = (user: any) => {
  return {
    type: 'USER_LOGGEDIN',
    payload: user,
  };
};

export const getUser = () =>{
  return {
    type: 'GET_USER'
  }
}
