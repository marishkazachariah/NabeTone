import React from "react";
import service from "../api/service";
import { useState } from "react";

export default function AddAudioFile() {
  const [title, setTitle] = useState("");
  const [audioPath, setAudioPath] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

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
      .saveNewAudioFile({ title, audioPath })
      .then((res) => {
        console.log("added new audio file: ", res);
        // here you would redirect to some other page
        // TODO: redirect to map
        // TEMP: redirecting to list of audio files 
        
      })
      .catch((err) => console.log("Error while adding the new audio file: ", err));
  };
  return (
    <div>
      <h2>New NabeTone</h2>
      <form onSubmit={handleSubmit}>
        <label>
            Title
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
            Street
            <input type="text" name="street" value={street} onChange={e => setStreet(e.target.value)} />
        </label>
        <label>
            Postal Code
            <input type="text" name="postalCode" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
        </label>
        <label>
            City
            <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
        </label>
        <label>
        <input type='file' onChange={handleFileUpload} />
        {audioPath && <audio src={audioPath} controls />}
        </label>
        <button type="submit">Add new NabeTone</button>
      </form>
    </div>
  );
}
