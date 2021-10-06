import axios from 'axios';
import { useState, useEffect } from 'react';
import service from "../api/service";

export default function EditAudioFilePage(props) {
    const API_URL = 'http://localhost:5005';

    const [title, setTitle] = useState("");
    const [audioPath, setAudioPath] = useState("");
    const audioFileId = props.match.params.id;

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

    useEffect(() => {
        axios.get(`${API_URL}/api/audiofiles/${audioFileId}`)
			.then(response => {
                setTitle(response.data.title);
                setAudioPath(response.data.audioPath);
			})
			.catch(err => console.log(err))
    }, [])

    const handleSubmit = e => {
		e.preventDefault();
		const requestBody = { title, audioPath };
		axios.put(`${API_URL}/api/audiofiles/${audioFileId}`, requestBody)
			.then(response => {
				// this is a redirect using react router dom 
				// props.history.push(`/audiofiles/${audioFileId}`);
                props.history.push(`/audiofiles/`);
			})
			.catch(err => console.log(err))
	}

    return (
        <div>
            <h3>Edit this project</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={e => setTitle(e.target.value)}
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
