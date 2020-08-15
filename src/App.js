import React,{useState, useEffect} from 'react';
import Post from './Post.js';
import { db, auth } from './firebase.js';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
	const classes = useStyles();
	const [modalStyle] =useState(getModalStyle);

	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if(authUser) {
				//user has logged in
				console.log(authUser);
				setUser(authUser);
			} else {
				//user has logged out
				setUser(null);
			}
		})

		return () => {
			unsubscribe();
		}

	}, [user,username]);

	useEffect(() => {
		db.collection('posts').onSnapshot(snapshot =>{
			console.log(snapshot);
			setPosts(snapshot.docs.map(doc => ({
				id:doc.id,
				post:doc.data()
			})));
		})
	},[]);

	const signUp = (event) => {
		event.preventDefault();
		setOpen(false);
		auth.createUserWithEmailAndPassword(email,password)
		.then(authUser => {
			return authUser.user.updateProfile({
				displayName: username
			});
		})
		.catch(error => alert(error.message));

	}

	const signIn = (event) => {
		
	}
	return (
		<div className="app">
			<Modal
			  open={open}
			  onClose={() => setOpen(false)}
			>
			  <div style={modalStyle} className={classes.paper}>
				<form className="app__signUp">
					<center>
						<img 
							className="app__headerImage"
							src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
							alt="IG logo"
						/>
					</center>
					<Input 
						type="text"
						placeholder="username"
						value={username}
						onChange={ e => setUsername(e.target.value)}
					/>
					<Input 
						type="text"
						placeholder="email"
						value={email}
						onChange={ e => setEmail(e.target.value)}
					/>
					<Input 
						type="password"
						placeholder="password"
						value={password}
						onChange={ e => setPassword(e.target.value)}
					/>
					<Button type="submit" onClick={signUp}>Sign up</Button>
				</form>
			  </div>
			</Modal>

			<Modal
			  open={openSignIn}
			  onClose={() => setOpenSignIn(false)}
			>
			  <div style={modalStyle} className={classes.paper}>
				<form className="app__signIn">
					<center>
						<img 
							className="app__headerImage"
							src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
							alt="IG logo"
						/>
					</center>
					<Input 
						type="text"
						placeholder="email"
						value={email}
						onChange={ e => setEmail(e.target.value)}
					/>
					<Input 
						type="password"
						placeholder="password"
						value={password}
						onChange={ e => setPassword(e.target.value)}
					/>
					<Button type="submit" onClick={signUp}>Sign up</Button>
				</form>
			  </div>
			</Modal>

			{user ? (
				<Button onClick={() => auth.signOut()}>Logout</Button>
			):(
				<div className="app__headerSignIn">
					<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
					<Button onClick={() => setOpen(true)}>Sign up</Button>
				</div>
			)}

			<div className="app__header">
				<img 
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt="IG logo"
				/>
			</div>
			
			<h1>Instagram-clone</h1>
			{posts.map(({id, post}) => {
				return <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
				})
			}
		</div>
	);
}

export default App;