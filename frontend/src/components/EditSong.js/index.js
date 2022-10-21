// {  title, description, url, imageUrl, albumId;}

import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory} from "react-router-dom";
import { editSongThunk } from "../../store/songs";
import { fetchSongs } from "../../store/songs";
import { fetchAlbums } from "../../store/albums";
import "../NewSongForm/NewSong.css";

const EditSong = () => {
  let song = useSelector(state=>state.songs)
  let {songId} = useParams()

  
  const [title, setTitle] = useState(song[songId].title);
  const [description, setDescription] = useState(song[songId].description);
  const [url, setUrl] = useState(song[songId].url);
  const [imageUrl, setImageUrl] = useState(song[songId].imageUrl);
  const [album, setAlbum] = useState(song[songId].album);
  const [errorValidation, setErrorValidation] = useState([])
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAlbums())
    dispatch(fetchSongs());
  }, [dispatch]);

  const history = useHistory()
  const albums = useSelector((state) => state.albums.Albums);

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
            // albumId: +album,
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
      <div id="form" className="inputBox">
        <h1>Edit your Song</h1>
        {errorValidation &&
          errorValidation.map((error) => (
            <li id="errors" key={error}>
              {error}
            </li>
          ))}
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
            placeholder="Please provide a song url"
            name="url"
            required="required"
          />
          <input
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
            placeholder="Please provide an image url"
            name="image"
          />
          {/* <div id="album-conteiner">
            <label for="album-select">Choose an album:</label>

            <select
              name="albums"
              id="album-select"
              onChange={(e) => setAlbum(e.target.value)}
            >
              <option value={album}>Choose an album if you have one</option>
              {albums?.map((album) => (
                <option value={album.id}>{album.title}</option>
              ))}
            </select>
          </div> */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="Description"
            placeholder="Describe your song"
            rows="10"
          ></textarea>
          <button
            id="edit-song-btn"
            type="submit"
            disabled={!!errorValidation.length}
          >
            Submit
          </button>
        </form>
      </div>
    );
};

export default EditSong;
