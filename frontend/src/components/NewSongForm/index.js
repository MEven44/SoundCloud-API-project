// {  title, description, url, imageUrl, albumId;}


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from '../../store/songs'


import './NewSong.css';

const SongInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url,setUrl] = useState ('')
  const [imageUrl, setImageUrl] = useState("");
  const [album,setAlbum] = useState(null)
  const [error,setError] = useState([])
  const dispatch = useDispatch();


  useEffect(()=>{
    let errors =[]
    if (!title) errors.push("Give your song a title")
    if (!url || !url.includes('.mp3')) errors.push("your song must have a valid url")
    setError(errors)
  },[url,title])

const history = useHistory();

  const handleSubmit = async (e) => {
    let errors = []
    e.preventDefault();
    const newSong = {
      title,
      description,
      url,
      imageUrl,
      albumId: album
      
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
    <div className="inputBox">
      <h1>Your New Song</h1>
      {error.length && error.map(error=>{
        return (<li key={error}>{error}</li>)
      })}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SongInput;