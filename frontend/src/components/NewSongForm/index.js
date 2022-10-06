// {  title, description, url, imageUrl, albumId;}


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from '../../store/songs'
import { useSelector } from "react-redux";
import { fetchAlbums } from "../../store/albums";

import './NewSong.css';

const SongInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url,setUrl] = useState ('')
  const [imageUrl, setImageUrl] = useState("");
  const [album,setAlbum] = useState(null)
  const [error,setError] = useState([])
  const dispatch = useDispatch();

   

    useEffect(() => {
      dispatch(fetchAlbums());
    }, [dispatch]);

  useEffect(()=>{
    let errors =[]
    if (!title) errors.push("Give your song a title")
    if (!url || !url.includes('.mp3')) errors.push("your song must have a valid url")
    setError(errors)
    
  },[url,title,album])

const history = useHistory();
const albums = useSelector(state=>state.albums.Albums)

  const handleSubmit = async (e) => {
    let errors = []
    e.preventDefault();
    const newSong = {
      title,
      description,
      url,
      imageUrl,
      albumId:+album
      
    };
    if (title.length === 0) {
      alert('you should give a title')
      return}
    
    if (url.length === 0 && !url.includes('.mp3')) {
      alert('your url is not valid')
      return 
    }
    const tune = await dispatch(createSongThunk(newSong));
    if (tune) 
    history.push(`/songs/${tune.id}`)
  };

  const reset = () => {
    setTitle("");
    setDescription('');
    setUrl('')
    setImageUrl("");
    setAlbum("");
  };

  return (
    <div id="form" className="inputBox">
      <h1>Your New Song</h1>
      {error &&
        error.map((error) => {
          return (
            <li id="errors" key={error}>
              {error}
            </li>
          );
        })}
      {console.log("new song album", album)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          name="title"
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
        <div id="album-conteiner">
          <label for="album-select">Choose an album:</label>

          <select name="albums" id="album-select">
            <option value="">Choose an album if you have one</option>
            {albums?.map((album) => (
            <option value="album.title">{album.title}</option>
            ))}
          </select>
        </div>
        {/* <p id="album-conteiner-title">
            Choose an album (if you have one) to your song
          </p>

          {albums?.map((album) => (
            <div id="albums-selector">
              <input
                type="radio"
                onChange={(e) => setAlbum(e.target.value)}
                value={album.title}
                // checked={album===null?false:true}
                id="single-album"
                name="Album"
              />
              <label id="single-album" for={album.title}>
                {album.title}
              </label>
            </div>
          ))}
          <div id="albums-selector">
            <input
              type="radio"
              onChange={(e) => setAlbum(null)}
              value={null}
              id="single-album"
              checked={album !== null? false : true}
              name="no-Album"
            />
            <label id="single-album" for="null">
              No album related
            </label>
          </div>
        </div> */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="Description"
          placeholder="Describe your song"
          rows="10"
          id="new-song-description"
        ></textarea>
        <button id="new-song-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SongInput;