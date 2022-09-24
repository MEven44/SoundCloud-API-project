
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/albums";
import './NewAlbum.css'


const AlbumInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let errors = [];
    if (!title) errors.push("Give your album a title");
    
    setError(errors);
  }, [title]);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlbum = {
      title,
      description,
      imageUrl,
      
    };
     

    const tune = await dispatch(createAlbumThunk(newAlbum));
    if (tune) history.push(`/albums`);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    
  };

  return (
    <div className="inputBox">
      <h1>Create an album</h1>
      {error.length &&
        error.map((error) => {
          return <li id='errors' key={error}>{error}</li>;
        })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          name="title"
          required="required"
        />
        
        <input
          type="text"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder="make it pretty"
          name="image"
        />
       
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="Description"
          placeholder="The story of the album"
          rows="10"
        ></textarea>
        <button id='new-album-btn' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AlbumInput;
