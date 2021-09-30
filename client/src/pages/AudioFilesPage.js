import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import AudioFileCard from '../components/AudioFileCard';


export default function AudioFilesPage() {
   // we don't need this bc we are using the proxy in package.json
	const API_URL = 'http://localhost:5005';

	const [audioFiles, setAudioFiles] = useState([]);

	const getAllAudioFiles = () => {
		// get request to the server
		axios.get(`${API_URL}/api/audiofiles`)
			.then(response => {
				console.log(response.data)
				setAudioFiles(response.data);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		getAllAudioFiles();
	}, [])

	return (
		<div>
			<h1>All NabeTones</h1>
			{audioFiles.map(audioFile => <AudioFileCard key={audioFile._id} {...audioFile} />)}
		</div>

	)
}
