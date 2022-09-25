// {  title, description, url, imageUrl, albumId;}

import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory} from "react-router-dom";
import { editSongThunk } from "../../store/songs";
import { fetchSongs } from "../../store/songs";
import "../NewSongForm/NewSong.css";

const EditSong = () => {
  let song = useSelector(state=>state.songs)
  let {songId} = useParams()

  
  const [title, setTitle] = useState(song[songId].title);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState(song[songId].url);
  const [imageUrl, setImageUrl] = useState('');
  const [album, setAlbum] = useState('');
  const [errorValidation, setErrorValidation] = useState([])
  const dispatch = useDispatch();
  
  const history = useHistory()

    useEffect(() => {
      let errors =[]
     if (!title) errors.push('You should have a name to your song')
     if (!url || !url.includes('mp3')) errors.push('Please provide a valid url to the song')

     setErrorValidation(errors)
    }, [dispatch,song,title,url]);  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSong = {
           
            title,
            description,
            url,
            imageUrl,
            albumId: album,
        };
         
        
        const postSong = await dispatch(editSongThunk(newSong, songId));
        if (postSong) history.push('/');
    };
    
    const reset = () => {
        setTitle("");
        setDescription("");
        setUrl("");
        setImageUrl("");
        setAlbum("");
    };
    
    if (!song[songId]) return null
    return (
      <div id='form' className="inputBox">
        <h1>Edit your Song</h1>
        {errorValidation && errorValidation.map((error) => 
        <li id='errors' key={error}>{error}</li>)}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            name="Title"
            required="required"
          />
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="Your song link"
            name="url"
            required="required"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="Description"
            placeholder="Describe your song"
            rows="10"
          ></textarea>
          <button id='new-song-btn'  type="submit">Submit</button>
        </form>
      </div>
    );
};

export default EditSong;
