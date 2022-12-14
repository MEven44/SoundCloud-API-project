import { csrfFetch } from "./csrf";


const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const DEMO_USER = 'session/demoUser'

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


//login user thunk
export const login = (user) => async (dispatch) => {

  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
 
  dispatch(setUser(data.user));

  return response;
};
//demo user thunk 
export const demoLogin = (user) => async (dispatch) => {

  const { credential, password } = user; //what this line is doing?
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
 
  dispatch(setUser(data.user));

  return response;
};
//rstore user thunk
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


//sign up thunk 
export const signup = (user) => async (dispatch) => {
  const { username, email,firstName,lastName, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      firstName,
      lastName,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  
  return response;
};

//logOut
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
   
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
     
      return newState;
    case DEMO_USER:
      newState = Object.assign({}, state)
      newState.user = action.payload
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
