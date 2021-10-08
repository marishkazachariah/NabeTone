import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AudioFileCard from "../components/AudioFileCard";

export default function UserAudioFilesPage(props) {
  const [audioFiles, setAudioFiles] = useState([]);
  const [searchAudioFile, setSearchAudioFile] = useState("");
  const [searchAudioFileLocation, setSearchAudioFileLocation] = useState("");

  const getUserAudio = () => {
    axios
      .get(`/api/audiofiles/useraudio/${props.user._id}`)
      .then((user) => {
        setAudioFiles(user.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserAudio();
  }, []);

  const handleAudioFileNameChange = (e) => {
    e.preventDefault();
    setSearchAudioFile(e.target.value);
  };

  const handleAudioFileLocationChange = (e) => {
    e.preventDefault();
    setSearchAudioFileLocation(e.target.value);
  };

  const filteredAudioFiles = audioFiles.filter(audioFile => {
    return ( !searchAudioFile ? true: `${audioFile.title}`.toLowerCase().includes(searchAudioFile) )
        && ( !searchAudioFileLocation ? true: `${audioFile.location}`.toLowerCase().includes(searchAudioFileLocation)  )
  })

  return (
    <div>
      <h1>Hi {props.user.username}, Here are your Tones</h1>
      <div>
      <div class="container" style={{marginTop:"8%"}}>
      <div class="col-md-6 col-md-offset-3">
          <form>
          <div >   
          <div className="input-group rounded">
            <label htmlFor="audioTitle">Search by Name of NabeTone</label>
            <input type="search" name="audioTitle" id="audioTitle" placeholder="5 AM at Berghain" value={searchAudioFile} onChange={handleAudioFileNameChange} />
            </div>
            </div>
            <div className="input-group rounded">
                <label htmlFor="audioLocation">Search by Location</label>
                <p>( Search by location only works depending on your exact address input )</p>
                <input type="search" name="audioLocation" id="audioLocation" placeholder="Berlin" value={searchAudioFileLocation} onChange={handleAudioFileLocationChange} />
            </div>
          </form>
          </div>
          </div>
      </div>
      
      {filteredAudioFiles.length !== 0 ? (
        filteredAudioFiles.map((audioFile) => (
            <ul className="list-group">
            <li className="list-group-item"><AudioFileCard key={audioFile._id} {...audioFile}></AudioFileCard></li>
        </ul>
      ))
      ) : <h1>You have no Nabetones! <Link to="/tones/add">Add a Nabetone?</Link></h1>
      }
    </div>
  );
}
