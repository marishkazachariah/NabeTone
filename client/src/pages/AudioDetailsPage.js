import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function AudioDetailsPage(props) {
    const API_URL = 'http://localhost:5005';

	const [audioFile, setAudioFile] = useState(null);

	const audioFileId = props.match.params.id;

    const getAudioFile = () => {
		axios.get(`${API_URL}/api/audiofiles/${audioFileId}`)
			.then(response => {
				console.log(response.data);
				setAudioFile(response.data);
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getAudioFile();
	}, [])

    const deleteProject = () => {
		axios.delete(`${API_URL}/api/audiofiles/${audioFileId}`)
			.then(() => {
				// redirect (for now) to Audio File List
                // TODO: redirect to map/profile dashboard
				props.history.push('/tones');
			})
			.catch(err => console.log(err));
	}

    return (
        <div>
            {audioFile && (
				<>
					<h1>{audioFile.title}</h1>
                    <div>
                        <audio src={audioFile.audioPath} controls />
                    </div>
                    <button onClick={deleteProject}>Delete this project 🗑</button>
				</>
			)}
        </div>
    )
}
