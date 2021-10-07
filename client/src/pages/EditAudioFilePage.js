import axios from 'axios';
import { useState, useEffect } from 'react';
import service from "../api/service";

export default function EditAudioFilePage(props) {
    // const API_URL = 'http://localhost:5005';

    const [title, setTitle] = useState("");
    const [initTitle, setInitTitle] = useState("");
    const [audioPath, setAudioPath] = useState("");
    const [location, setLocation] = useState("");
    const audioFileId = props.match.params.id;

    useEffect(() => {
        axios.get(`/api/audiofiles/${audioFileId}`)
			.then(response => {
                setTitle(response.data.title);
                setInitTitle(response.data.title);
                setAudioPath(response.data.audioPath);
                setLocation(response.data.location);
			})
			.catch(err => console.log(err))
    }, [])

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

    const handleSubmit = e => {
		e.preventDefault();
		const requestBody = { title, audioPath, location };
		axios.put(`/api/audiofiles/${audioFileId}`, requestBody)
			.then(response => {
				props.history.push(`/tones/${audioFileId}`);
			})
			.catch(err => console.log(err))
	}

    return (
        <div>
            <h3>Edit Nabetone: {initTitle}</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title of Nabetone: </label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
                <p>Tip: Add City & Postal Code/ZIP/PLZ to place Nabetone accurately on the map.</p>
            <label htmlFor="location">Address: </label>
				<input
					type="text"
					name="location"
					value={location}
					onChange={e => setLocation(e.target.value)}
				/>
            <label htmlFor="file">
                <input type='file' onChange={handleFileUpload} />
                {audioPath && <audio src={audioPath} controls />}
            </label>
                <button type="submit">Update this Nodetone</button>
            </form>
        </div>
    )
}
