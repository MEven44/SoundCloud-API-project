import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { removeAlbum, fetchAlbums } from "../../store/albums";
import {fetchSongs} from '../../store/songs'
import { useEffect } from "react";
import "./SingleAlbum.css";

function SingleAlbum() {
  let history = useHistory();
  let { albumId } = useParams();
  let albums = useSelector((state) => state.albums);
  let songs = useSelector(state=>state.songs.songList)
   

   
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchSongs())
  }, [dispatch]);

  const handleClick =  (e) => {
  
    e.preventDefault()
    dispatch(removeAlbum(albumId))
    history.push('/deleted')
   
    
  };
  let AlbumSongs = songs.filter((song) => song.albumId === +albumId);
  console.log('ALBUM SONG LIST' ,AlbumSongs)
    let albumSongs;
    if (!albums) return null;
  return (
    <div id="single-album">
      <h2>{albums[albumId].title}</h2>
      <img id='album-img' src={albums[albumId].imageUrl} alt={albums[albumId].title} />
      <div column-container>

      <button id="single-album-btn" onClick={handleClick}>
        Delete this album
      </button>
      <div id="description-album">{albums[albumId].description}</div>
      </div>
      <div id='album-songs'>Songs list:
        {AlbumSongs.map(albumSong=>{
          return (
            
            <li key='albumSong.id' className='album-songs-li' onClick={()=>history.push(`/songs/${albumSong.id}`)}>{albumSong.title}</li>
          )
        }) }     
        </div>
    </div>
  );
}

export default SingleAlbum;
