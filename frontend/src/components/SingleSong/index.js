import {useSelector , useDispatch} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import {removeSong, fetchSongs} from '../../store/songs'
import {useEffect} from 'react'
import { currentSong } from '../../store/songs';
import './SingleSong.css'



function SingleSong(){
    let history = useHistory()
    let {songId} = useParams()
    let songs = useSelector(state=>state.songs)
    const sessionUser = useSelector((state) => state.session.user);
    
    
    let dispatch = useDispatch()
    
    useEffect(() => {
    dispatch(fetchSongs());
    }, [dispatch]);

    const handleClick = (e) => {
  
      dispatch(removeSong(songId))
        // e.preventDefault()
      history.push('/deleted')
     
     
    };

    if (!songs) return null
    return (
      <div id="container">
        <div id="audio">
          <h2 id="song-title">{songs[songId]?.title}</h2>
          <img
            id="main-song"
            src={songs[songId]?.imageUrl}
            alt={songs[songId]?.title}
          />
          <div>
            <img
              id="play-btn"
              src="https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png"
              onClick={() => dispatch(currentSong(songs[songId]))}
            />
          </div>
          {sessionUser && (
            <>
              <button
                id="update-song"
                onClick={() => history.push(`/songs/${songId}/edit`)}
              >
                update this song
              </button>
              <button id="delete-song" onClick={handleClick}>
                Delete this song
              </button>
            </>
          )}
        </div>
        <div id="description">Description: {songs[songId]?.description}</div>
      </div>
    );

    

}


export default SingleSong