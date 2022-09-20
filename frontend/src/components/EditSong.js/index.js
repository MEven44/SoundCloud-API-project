// {  title, description, url, imageUrl, albumId;}

import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSongThunk } from "../../store/songs";
import { fetchSongs } from "../../store/songs";
import "../NewSongForm/NewSong.css";

const EditSong = () => {
    let song = useSelector(state=>state.songs)
    let {songId} = useParams()
    console.log ('THIS IS SONG:', song[songId])
    
    const [title, setTitle] = useState(song[songId]?.title);
    console.log("EDIT SONG ID", songId);
    const [description, setDescription] = useState(song[songId]?.description);
    const [url, setUrl] = useState(song[songId]?.url);
    const [imageUrl, setImageUrl] = useState(song[songId]?.imageUrl);
    const [album, setAlbum] = useState(song[songId]?.albumId);
    const dispatch = useDispatch();

    useEffect(() => {
      console.log('state has updated');
    }, [dispatch,song]);  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSong = {
            title,
            description,
            url,
            imageUrl,
            albumId: album,
        };
        
        const postSong = await dispatch(createSongThunk(newSong));
        if (postSong) reset();
    };
    
    const reset = () => {
        setTitle("");
        setDescription("");
        setUrl("");
        setImageUrl("");
        setAlbum("");
    };
    console.log('CHECK title BEFORE RENDERING', title)
    if (!song[songId]) return null
    return (
      <div className="inputBox">
        <h1>Edit your Song</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={song[songId].title}
            placeholder="Title"
            name="Title"
          />
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="Your song link"
            name="url"
          />
          <input
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
            placeholder="make it pretty"
            name="image"
          />
          <input
            type="text"
            onChange={(e) => setAlbum(e.target.value)}
            value={album}
            placeholder="Album"
            name="Album"
          />
          <textarea
            value={song[songId].description}
            onChange={(e) => setDescription(e.target.value)}
            name="Description"
            placeholder="Describe your song"
            rows="10"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
};

export default EditSong;
