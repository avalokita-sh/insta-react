import React, { useState } from 'react';
import firebase from 'firebase';
import { storage, db } from './firebase';
import { Button } from '@material-ui/core';

const ImageUpload = ({username}) => {
	const [caption,setCaption] = useState('');
	const [progress, setProgress] = useState(0);
	const [image, setImage] = useState(null);

	const handleChange = (e) => {
		if(e.target.files[0]){
			setImage(e.target.files[0]);
			console.log(e.target.files);
		}
	};

	const handleUpload = () => {
		console.log('image in submit',image)
		const uploadTask = storage.ref(`images/${image.name}`).put(image);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				//progress function
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				setProgress(progress);
			},
			(error) => {
				//error function
				console.log(error);
				alert(error.message);
			},
			() => {
				//complete function
				storage
				.ref("images")
				.child(image.name)
				.getDownloadURL()
				.then(url => {
					//save post inside db
					db.collection('post').add({
						timestamp: firebase.firestore.FieldValue.serverTimestamp(),
						caption:caption,
						imageUrl:url,
						username:username
					});

					setProgress(0);
					setCaption('');
					setImage(null);
				})
			}

		)
	}

	return (
		<div className="">
			{/* caption input*/}
			{/* file picker*/}
			{/* post button*/}

			<progress value={progress} max="100" />
			<input type="text" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)}/>
			<input type="file" onChange={handleChange} />
			<Button type="submit" onClick={handleUpload}>Upload</Button>
		</div>
	);

}

export default ImageUpload;