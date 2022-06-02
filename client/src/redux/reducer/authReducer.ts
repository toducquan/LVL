const initialState = {
  user: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'USER_LOGGEDIN':
      const data = {...action.payload}
      return {
        ...initialState,
        user: data,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: null,
      };

    default:
      return state;
  }
};
