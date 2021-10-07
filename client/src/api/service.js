import axios from "axios";

const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = (err) => {
  throw err;
};

const handleUpload = (file) => {
  return service
    .post("/api/audiofiles/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const saveNewAudioFile = (newAudioFile) => {
  return service
    .post("/api/audiofiles/tones/add", newAudioFile)
    .then((res) => res.data)
    .catch(errorHandler);
};

const deleteAudioFile = (audioFileId) => {
    return service.delete(`/api/audiofiles/${audioFileId}`)
    .then((res) => res.data)
    .catch(errorHandler);
}

const data = {
    service,
    handleUpload,
    saveNewAudioFile,
    deleteAudioFile
};

export default data;