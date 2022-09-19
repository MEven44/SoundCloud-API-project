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

    return (
        <p id='audio'>
            <img src={''} alt={''} />
            <ReactAudioPlayer src={''} 
            autoPlay={false}
            controls={true} />
        </p>
    )
}

export default HompPage