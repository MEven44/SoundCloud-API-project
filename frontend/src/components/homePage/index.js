import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from 'react-router-dom'
import ReactAudioPlayer from "react-audio-player";
import {currentSong, fetchSongs} from "../../store/songs";
import './homePage.css'


function HompPage (){
const songList = useSelector(state=>state.songs)
const dispatch = useDispatch()
const currentlist = songList.songList

useEffect(() => {
  dispatch(fetchSongs());
}, [dispatch]);




    if (!songList) return null
    else
   return (
     <div className="container">
       {currentlist.map((song) => (
         <div id="audio">
           <NavLink id="song-title" to={`/songs/${song.id}`}>
             {song.title}
           </NavLink>
           <NavLink to={`/songs/${song.id}`}>
             <img src={song.imageUrl} alt={song.title} id="main-song" />
           </NavLink>
           <img
             id="play-btn"
             src="https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png"
             onClick={() => dispatch(currentSong(song))}
           />
         </div>
       ))}
     </div>
   );
    
}

export default HompPage