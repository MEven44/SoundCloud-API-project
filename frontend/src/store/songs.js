import { csrfFetch } from "./csrf";

const LOAD_SONGS = "tunes/loadSongs";
const CREATE_SONG = "tunes/createSong";


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

export const fetchSongs = () => async (dispatch) => {
  const response = await fetch("/api/songs");
  const data = await response.json();
  console.log('SONGS REDUCER GET ALL SONGS', data.songs)
  dispatch(loadSongs(data.songs));
};

export const createSongThunk = (payload) => async (dispatch) => {
  console.log('CREAT SONG THUNK', payload)
  if (!payload.albumId) payload.albumId=null
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

const initialState = {songList:[]}; //???

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS: {
      const newState = {...state, songList:[...action.songs]}
      newState.songList.forEach((song)=>{
        newState[song.id]=song
      })
      // console.log(typeof newState.action.songs)
        return newState
      };
      case CREATE_SONG: {
        console.log('CREATE SONGS STATE', action.songs)
        const newState = {...state,[action.song.id]:action.song}
        console.log('MY NEW STATE BEFORE PUSHING',newState)
        newState.songList.push(action.song)
        console.log("MY NEW STATE after PUSHING", newState);
        return newState
      }
      
      
    
    default:
      return state;
  }
};

export default songsReducer;
