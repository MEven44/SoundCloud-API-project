import { csrfFetch } from "./csrf";



const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
    console.log('THUNK LOGIN', user)
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  console.log('login thunk data from API:', data)
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    console.log('SESSION REDUCER INITIAL STATE', state)
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      console.log('USER SESSION NEW STATE:' ,newState)
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
