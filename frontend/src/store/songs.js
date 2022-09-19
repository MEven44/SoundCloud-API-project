const LOAD_SONGS = "songs/loadSongs";
const CREATE_SONG = "songs/createSong";


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
  const response = await fetch("/api/songs", {
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
      
      
    
    default:
      return state;
  }
};

export default songsReducer;
