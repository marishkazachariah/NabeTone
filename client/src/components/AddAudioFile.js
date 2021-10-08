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
        props.history.push('/my-tones');
      })
      .catch((err) => console.log("Error while adding the new audio file: ", err));
  };
  
  return (
    <section className="vh-100"  style={{ backgroundColor: "#2a2d30" }}>
    <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
    <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
    <div className="card-body p-5 text-center">
    <div className="mb-md-5 mt-md-4 pb-5">
      <h2 className="fw-bold mb-2">Add New NabeTone</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-outline form-white mb-4">
        <label htmlFor="title" className="form-label">
            Title
            <input type="text" id="title" className="form-control form-control-lg" placeholder="Sounds of Neukölln" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        </div>
        <div className="form-outline form-white mb-4">
        <label htmlFor="location" className="form-label">
            Location
            <p className="small pb-lg-2"><i>Tip: Add City & Postal Code/ZIP/PLZ to place Nabetone accurately on the map.</i></p>
            <input type="text" id="location" className="form-control form-control-lg" placeholder="Karl Marx Straße 177" name="location" value={location} onChange={e => setLocation(e.target.value)} />
        </label>
        </div>
        <div className="form-outline form-white mb-4">
        <label htmlFor="file" className="form-label">
        <input type='file' className="form-control" onChange={handleFileUpload} />
        {audioPath && <audio src={audioPath} controls />}
        </label>
        </div>
        <button type="submit"  className="btn btn-outline-light btn-lg px-5">Add new NabeTone</button>
      </form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </section>
  );
}
