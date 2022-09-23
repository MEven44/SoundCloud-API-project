import { csrfFetch } from "./csrf";

const LOAD_ALBUMS = "album/loadAlbum";
const CREATE_ALBUM = "album/createAlbum";
const DELETE_ALBUM = "album/deleteAlbum";


export const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums,
  };
};

export const createAlbum = (album) => {
  return {
    type: CREATE_ALBUM,
    album,
  };
};

export const deleteAlbum = (id) => {
  return {
    type: DELETE_ALBUM,
    id,
  };
};




// get all albums thunk
export const fetchAlbums = () => async (dispatch) => {
  const response = await fetch("/api/albums");
  const albums = await response.json();
 
  dispatch(loadAlbums(albums));
};

//post a song Thunk
export const createAlbumThunk = (payload) => async (dispatch) => {

  
  const response = await csrfFetch("/api/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const album = await response.json();
    dispatch(createAlbum(album));
    return album;
  }
};

//delete a song thunk

export const removeAlbum = (id) => async (dispatch) => {


  const response = await csrfFetch(`/api/albums/${+id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // const song = await response.json();
    dispatch(deleteAlbum(+id));
    return response;
  }
};


const initialState = { }; //???

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALBUMS: {
      const newState = {...state, ...action.albums};
    
      
      newState.Albums.forEach((album) => {
      newState[album.id] = album;})
      

      return newState;
    }
    case CREATE_ALBUM: {
      const newState = { ...state, [action.album.id]: action.album };
      newState.Albums.push(action.album);
      return newState;
    }
   

    case DELETE_ALBUM: {
      const newState = {...state};
   
      delete newState[action.id]
      return newState;
    }
    
    default:
      return state;
  }
};

export default albumReducer;
