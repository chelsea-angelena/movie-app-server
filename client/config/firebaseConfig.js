import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import Constants from 'expo-constants';
// import firebaseConfigPROD from '../firebaseInitProd';
// import firebaseConfigDEV from '../firebaseInit';
// import {
// 	API_KEY,
// 	AUTH_DOMAIN,
// 	DATABASE_URL,
// 	PROJECT_ID,
// 	STORAGE_BUCKET,
// 	MESSAGING_ID,
// 	APP_ID,
// 	MEASUREMENT_ID,
// } from '../firebaseInitProd';

// const initFirebase = () => {
// 	let releaseChannel = Constants.manifest.releaseChannel;
// 	if (releaseChannel === dev) {
// 		let Firebase = firebase.initializeApp(firebaseConfigDEV);
// 	}
// 	if (process.env.NODE_ENV === 'production') {
// 		let Firebase = firebase.initializeApp(firebaseConfigPROD);
// 	}
// 	if (releaseChannel === 'prod') {
// 		let Firebase = firebase.initializeApp(firebaseConfigPROD);
// 	}
// 	if (releaseChannel === 'staging') {
// 		return ENV.staging;
// 	}
// };
// initFirebase();

const firebaseConfig = {
	apiKey: Constants.manifest.extra.dev.apiKey,
	authDomain: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.EXPO_FIREBASE_DATABASE_URL,
	projectId: process.env.EXPO_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_FIREBASE_APP_ID,
	measurementId: process.env.EXPO_FIREBASE_MEASUREMENT_ID,
};

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export const loginWithEmail = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password);
};

export const signupWithEmail = (email, password) => {
	return auth.createUserWithEmailAndPassword(email, password);
};

export const signOut = async () => {
	await auth.signOut();
};

export const checkUserAuth = (cb) => {
	return auth.onAuthStateChanged(cb);
};

export const createNewUser = (userData) => {
	return db.collection('users').doc(`${userData.uid}`).set(userData);
};
//

// export const signInWithGoogle = async () => {
// 	const provider = Firebase.auth.GoogleAuthProvider();
// 	await auth.signInWithPopup(provider).then(() =>
// 		auth()
// 			.signInWithEmailAndPassword(email, password)
// 			.then((response) => {
// 				const uid = response.user.uid;
// 				const usersRef = firebase.firestore().collection('users');
// 				usersRef
// 					.doc(uid)
// 					.get()
// 					.then((firestoreDocument) => {
// 						const user = firestoreDocument.data();
// 						return firestoreDocument;
// 					});
// 			})
// 	);
// };

export const saveMovie = async (imdbID, movie, userId) => {
	let { Title, Poster } = movie;
	await db
		.collection('users')
		.doc(userId)
		.collection('movies')
		.doc(imdbID)
		.set({
			id: imdbID,
			imdbID: imdbID,
			Title: Title,
			Poster: Poster,
			created: firebase.firestore.FieldValue.serverTimestamp(),
			authorID: userId,
		});
};

export const getSavedMovies = async (userId) => {
	let snapshot = await db
		.collection('users')
		.doc(userId)
		.collection('movies')
		.get();
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const deleteMovieItem = (userId, id, navigation) => {
	db.collection('users')
		.doc(userId)
		.collection('movies')
		.doc(id)
		.delete()
		.then(() => {
			navigation.navigate('My List');
		});
};
