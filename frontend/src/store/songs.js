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
  console.log("SONGS REDUCER GET ALL SONGS", data.songs);
  dispatch(loadSongs(data.songs));
};

//post a song Thunk
export const createSongThunk = (payload) => async (dispatch) => {
  console.log("CREAT SONG THUNK", payload);
  if (!payload.albumId) payload.albumId = null;
  const response = await csrfFetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const song = await response.json();
    dispatch(createSong(song));
    return song;
  }
};

//delete a song thunk

export const removeSong = (id) => async (dispatch) => {
  console.log("DELETE SONG THUNK", id);

  const response = await csrfFetch(`/api/songs/${+id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // const song = await response.json();
    dispatch(deleteSong(+id));
    return response;
  }
};

//edit song thunk
export const editSongThunk = (song,songId) => async (dispatch) => {
  console.log("EDIT SONG THUNK", song);
 
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
const initialState = { songList: [] }; //???

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
      console.log("DELETE reducer STATE", action.id);
      const newState = {...state};
      return newState;
    }
    case CURRENT_SONG: {
      const newState = {...state}
      newState.currentSong = action.song
      
      console.log('CURRENT SONG STATE', newState)
      return newState
      
    }
// case current song: newstate that will define a currentsong key in the song state [currentSong]:actions.song {...state}
    default:
      return state;
  }
};

export default songsReducer;
