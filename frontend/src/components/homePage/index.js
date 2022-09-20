import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useHistory} from 'react-router-dom'
import ReactAudioPlayer from "react-audio-player";
import {fetchSongs} from "../../store/songs";

function HompPage (){
const songList = useSelector(state=>state.songs)
const dispatch = useDispatch()

useEffect(() => {
  dispatch(fetchSongs());
}, [dispatch]);

console.log('HOME PAGE USE SELECTORE', songList)

    return Object.values(songList).map((song) => (
      <div id="audio">
        <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
        <img
          src={"https://m.media-amazon.com/images/I/81CETsEF63L._AC_SX466_.jpg"}
          alt={song.title}
        />
        <ReactAudioPlayer src={song.url} autoPlay={false} controls={true} />
      </div>
    ));
    
}

export default HompPage