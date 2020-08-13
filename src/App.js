import React from 'react';
import Post from './Post.js';
import './App.css';

const App = () => {
	return (
		<div className="app">
			<div className="app__header">
				<img 
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt="IG logo"
				/>
			</div>
			
			<h1>Instagram-clone</h1>
			{/*header*/}
			
			<Post 
				username="Ava.niko"
				caption="all the sitting around"
				imageUrl="https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
			/>
			<Post 
				username="Ava.niko"
				caption="all the sitting around"
				imageUrl="https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
			/>
			<Post 
				username="Ava.niko"
				caption="all the sitting around"
				imageUrl="https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
			/>
		</div>
	);
}

export default App;