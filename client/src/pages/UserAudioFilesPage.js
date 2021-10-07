import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import AudioDetailsPage from "./AudioDetailsPage";
import AudioFileCard from "../components/AudioFileCard";

export default function UserAudioFilesPage(props) {
  const [audioFiles, setAudioFiles] = useState([]);

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

  return (
    <div>
      <h1>Hi {props.user.username}, Here are your Tones</h1>
      {audioFiles.map((audioFile) => (
        <AudioFileCard key={audioFile._id} {...audioFile} />
      ))}
    </div>
  );
}
