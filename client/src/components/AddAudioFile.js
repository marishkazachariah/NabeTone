import React from "react";
import service from "../api/service";
import { useState } from "react";

export default function AddAudioFile(props) {
  const [title, setTitle] = useState("");
  const [audioPath, setAudioPath] = useState("");
  const [location, setLocation] = useState("");

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("audioPath", e.target.files[0]);
    service
      .handleUpload(uploadData)
      .then((response) => {
        setAudioPath(response.secure_url);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    service
      .saveNewAudioFile({ title, audioPath, location })
      .then((res) => {
        console.log("added new audio file: ", res);
        props.history.push('/tones');
      })
      .catch((err) => console.log("Error while adding the new audio file: ", err));
  };
  
  return (
    <div>
      <h2>New NabeTone</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
            Title
            <input type="text" id="title" placeholder="Sounds of Neukölln" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <p>Tip: Add City & Postal Code/ZIP/PLZ to place Nabetone accurately on the map.</p>
        <label htmlFor="location">
            Location
            <input type="text" id="location" placeholder="Karl Marx Straße 177" name="location" value={location} onChange={e => setLocation(e.target.value)} />
        </label>
        <label htmlFor="file">
        <input type='file' onChange={handleFileUpload} />
        {audioPath && <audio src={audioPath} controls />}
        </label>
        <button type="submit">Add new NabeTone</button>
      </form>
    </div>
  );
}
