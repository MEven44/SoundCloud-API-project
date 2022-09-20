import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import {fetchSongs} from "../../store/songs";

function HompPage (){
const songList = useSelector(state=>state.songs)
const dispatch = useDispatch()

useEffect(() => {
  dispatch(fetchSongs());
}, [dispatch]);

console.log('HOME PAGE USE SELECTORE', songList)

    return(
      
       Object.values(songList).map((song) => (
      <p id="audio">
        <h2>{song.title}</h2>
        <img
          src={
            song.imabgUrl === null
              ? "API-project/frontend/src/images/istockphoto-486407890-612x612.jpeg"
              : song.imabgUrl
          }
          alt={song.title}
        />
        <ReactAudioPlayer src={song.url} autoPlay={false} controls={true} />
      </p>)
     
    ))
    
}

export default HompPage