// {  title, description, url, imageUrl, albumId;}


import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSongThunk } from '../../store/songs'
import './NewSong.css';

const SongInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url,setUrl] = useState ('')
  const [imageUrl, setImageUrl] = useState("");
  const [album,setAlbum] = useState(null)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSong = {
      title,
      description,
      url,
      imageUrl,
      albumId: album
      
    };

    const article = await dispatch(createSongThunk(newSong));
    if (article) reset();
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