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
  const [file,setFile] = useState (null)
  const [imageUrl, setImageUrl] = useState("");
  const [albumId,setAlbumId] = useState(null)
  const [error,setError] = useState([])
  const dispatch = useDispatch();

   

    useEffect(() => {
      dispatch(fetchAlbums());
    }, [dispatch]);

  useEffect(()=>{
    let errors =[]
    if (!title) errors.push("Give your song a title")
    
    setError(errors)
    
  },[file,title,albumId])

const history = useHistory();
const albums = useSelector(state=>state.albums.Albums)

  const handleSubmit = async (e) => {
    let errors = []
    e.preventDefault();
    const newSong = {
      title,
      description,
      file,
      imageUrl,
      albumId:+albumId
      
    };
    
    if (title.length === 0) {
      alert('you should give a title')
      return
    }
    
   
    
    const tune = await dispatch(createSongThunk(newSong));
    if (tune) history.push(`/songs/${tune.id}`)
  };

  const reset = () => {
    setTitle("");
    setDescription('');
    setFile(null)
    setImageUrl("");
    setAlbumId("");
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setFile(file);
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          name="title"
          required
        />
        <input
          type="file"
          onChange={updateFile}
          // value={url}
          // placeholder="Please provide a song url"
          // name="url"
          required
        />
        <input
          type="text"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder="Please provide an image url"
          name="image"
          required
        />
        <div id="album-conteiner">
          <label for="album-select">Choose an album:</label>

          <select
            name="albums"
            id="album-select"
            onChange={(e) => setAlbumId(e.target.value)}
          >
            <option value="">Choose an album if you have one</option>
            {albums?.map((album) => (
              <option value={album.id}>{album.title}</option>
            ))}
          </select>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="Description"
          placeholder="Describe your song"
          rows="10"
          id="new-song-description"
        ></textarea>
        <button id="new-song-btn" type="submit" disabled={!!error.length}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SongInput;