import React, { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";
import './footer.css'


function Footer () {
    const songPlayer = useSelector(state=>state.songs.currentSong)
   

useEffect (()=>{

},[songPlayer])

    if (!songPlayer) return null
return (
  <div className="footer">
    <ReactAudioPlayer src={songPlayer.url} autoPlay={true} controls={true} id='footer-player' />
  </div>
);
};

export default Footer