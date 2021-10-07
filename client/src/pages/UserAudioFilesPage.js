import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import AudioDetailsPage from "./AudioDetailsPage";
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

  const filteredAudioFiles = audioFiles.filter(audioFile => {
    return (!searchAudioFile ? true: `${audioFile.title}`.toLowerCase().includes(searchAudioFile) )
  })

  return (
    <div>
      <h1>Hi {props.user.username}, Here are your Tones</h1>
      <div>
          <form>
            <label htmlFor="search"></label>
            <input type="search" name="search" id="search" placeholder="Search Nabetones" value={searchAudioFile} onChange={handleAudioFileNameChange} />
          </form>
      </div>
      {filteredAudioFiles.map((audioFile) => (
        <AudioFileCard key={audioFile._id} {...audioFile} />
      ))}
      {/* {audioFiles.map((audioFile) => (
        <AudioFileCard key={audioFile._id} {...audioFile} />
      ))} */}
    </div>
  );
}
