import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,useHistory } from "react-router-dom";

import { fetchAlbums } from "../../store/albums";

function Albums() {
  const albumsList = useSelector((state) => state.albums);
  const dispatch = useDispatch();
    
  useEffect(() => {dispatch(fetchAlbums())}, [dispatch]);


  if (!albumsList) return null;
  else
    return Object.values(albumsList).map((album) => (
      <div  id="album">
        <NavLink to={`/albums/${+album.id}`}>
          {album.title}
        <img src={album.imageUrl} alt={album.title} />
        </NavLink>
      </div>
    
      
    ));
}

export default Albums;
