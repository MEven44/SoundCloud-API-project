import { csrfFetch } from "./csrf";

const LOAD_SONGS = "tunes/loadSongs";
const CREATE_SONG = "tunes/createSong";
const DELETE_SONG = "tunes/deleteSong";
const EDIT_SONG = "tunes/editSong";
const CURRENT_SONG ='tunes/currentSong'

export const loadSongs = (songs) => {
  return {
    type: LOAD_SONGS,
    songs,
  };
};

export const createSong = (song) => {
  return {
    type: CREATE_SONG,
    song,
  };
};

export const deleteSong = (id) => {
  return {
    type: DELETE_SONG,
    id,
  };
};

export const editSong = (song) => {
  return {
    type: EDIT_SONG,
    song,
  };
};

export const currentSong = (song) => {
  return {
    type: CURRENT_SONG,
    song,
  };
};

// get all songs thunk
export const fetchSongs = () => async (dispatch) => {
  const response = await fetch("/api/songs");
  const data = await response.json();
 
  dispatch(loadSongs(data.songs));
};

//create a song Thunk
export const createSongThunk = (payload) => async (dispatch) => {
  
  if (!payload.albumId) payload.albumId = null;
  const { title, description,file, imageUrl, albumId } = payload
  const formData = new FormData();
  formData.append('title', title)
  formData.append("description", description);
  formData.append("imageUrl", imageUrl);
  formData.append("albumId", albumId);

  if (file) formData.append("tune", file)

    const response = await csrfFetch("/api/songs", {
    method: "POST",
    // headers: {},
    body: formData,
  });

  if (response.ok) {
    const song = await response.json();
    dispatch(createSong(song));
    return song;
  }
};

//delete a song thunk

export const removeSong = (id) => async (dispatch) => {


  const response = await csrfFetch(`/api/songs/${+id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    
    dispatch(deleteSong(+id));
    return response;
  }
};

//edit song thunk
export const editSongThunk = (song,songId) => async (dispatch) => {

 
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });

  if (response.ok) {
    const song = await response.json();
    dispatch(editSong(song));
    return song;
  }
};
const initialState = { songList: [] }; 

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS: {
      const newState = { ...state, songList: [...action.songs] };
      newState.songList.forEach((song) => {
        newState[song.id] = song;
      });

      return newState;
    }
    case CREATE_SONG: {
      const newState = { ...state, [action.song.id]: action.song };
      newState.songList.push(action.song);
      return newState;
    }
    case EDIT_SONG: {
      const newState = {...state, [action.song.id]: action.song}
      return newState
    }

    case DELETE_SONG: {
     
      const newState = {...state};
      return newState;
    }
    case CURRENT_SONG: {
      const newState = {...state}
      newState.currentSong = action.song
      
    
      return newState
      
    }
// case current song: newstate that will define a currentsong key in the song state [currentSong]:actions.song {...state}
    default:
      return state;
  }
};

export default songsReducer;
