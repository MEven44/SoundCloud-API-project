import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { removeAlbum, fetchAlbums } from "../../store/albums";
import { useEffect } from "react";
// import "./SingleAlbum.css";

function SingleAlbum() {
  let history = useHistory();
  let { albumId } = useParams();
  let albums = useSelector((state) => state.albums);
  let songs = useSelector(state=>state.songs)
 

   
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleClick =  (e) => {
  
    e.preventDefault()
    dispatch(removeAlbum(albumId))
    history.push('/deleted')
   
    
  };

    if (!albums) return null;
  return (
    <div id="single-album">
    
      <h2>{albums[albumId].title}</h2>
      <img
        src={
          albums[albumId].imageUrl
            }
        alt={albums[albumId].title}
      />
      <div id='description'>
        {albums[albumId].description}
      </div>
     
     
      <button onClick={handleClick}>Delete this album</button>
    </div>
    
  );
}

export default SingleAlbum;
