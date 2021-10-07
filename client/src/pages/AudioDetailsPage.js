import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import service from '../api/service';
import { Link } from 'react-router-dom';

export default function AudioDetailsPage(props) {
    // const API_URL = 'http://localhost:5005';

	const [audioFile, setAudioFile] = useState(null);
    const [user, setUser] = useState(null);
	const audioFileId = props.match.params.id;

    const getAudioFile = () => {
		axios.get(`/api/audiofiles/${audioFileId}`)
			.then(response => {
                console.log(response.data);
				setAudioFile(response.data);
			})
			.catch(err => console.log(err))
	}

    const getUserId = () => {
        axios.get('/api/auth/loggedin')
        .then(user => {
            // console.log('user data is', user.data._id);
            setUser(user.data);
        })
    }

	useEffect(() => {
		getAudioFile();
        getUserId();
	}, [])

    // const deleteAudioFile = () => {
	// 	axios.delete(`${API_URL}/api/audiofiles/${audioFileId}`)
	// 		.then(() => {
	// 			// redirect (for now) to Audio File List
    //         
	// 			props.history.push('/my-tones');
	// 		})
	// 		.catch(err => console.log(err));
	// }

    const deleteAudioFile = (id) => {
        return service
        .deleteAudioFile(id)
        .then(response => {
            console.log('song deleted', response);
            props.history.push('/my-tones');
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            {audioFile && (
                <>
                {user && (
				<>
					<h1>{audioFile.title}</h1>
                    <div>
                        <audio src={audioFile.audioPath} controls />
                    </div>
                    {/* If user's id matches the objects id, the object is deleted */}
                    { user._id === audioFile.author ? (<button onClick={() => deleteAudioFile(audioFile._id)}>Delete {audioFile.title}</button>) : (<></>) }
                    { user._id === audioFile.author ? (<Link to={`/tones/edit/${audioFile._id}`}><button>Edit {audioFile.title}</button></Link>) : <></> }
				</>
            )}
            </>
			)}
        </div>
    )
}
