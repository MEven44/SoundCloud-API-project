import {useSelector , useDispatch} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import ReactAudioPlayer from "react-audio-player";
import {fetchSongs} from '../../store/songs'
import {useEffect} from 'react'
import './SingleSong.css'
import EditSong from '../EditSong.js';


function SingleSong(){
    let history = useHistory()
    let {songId} = useParams()
    let songs = useSelector(state=>state.songs)
    console.log('SONG ,A SINGLE ONE', songs)
    
    let dispatch = useDispatch()
    
    useEffect(() => {
    dispatch(fetchSongs());
    }, [dispatch]);
    if (!songs) return null
    return (
        <div id="audio">
        <h2>{songs[songId].title}</h2>
        <img
          src={"https://m.media-amazon.com/images/I/81CETsEF63L._AC_SX466_.jpg"}
          alt={songs[songId].title}
        />
        <div>
          <ReactAudioPlayer src={songs[songId].url} autoPlay={false} controls={true} />
        </div>
        <button onClick={()=>history.push(`/songs/${songId}/edit`)}>update my song</button>
        </div>
    );

    

}

export default SingleSong