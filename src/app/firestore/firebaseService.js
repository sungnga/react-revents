import { toast } from 'react-toastify';
import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';

export function signInWithEmail(creds) {
	return firebase
		.auth()
		.signInWithEmailAndPassword(creds.email, creds.password);
}

// Sign out user in Firebase
export function signOutFirebase() {
	return firebase.auth().signOut();
}

// Register user in Firebase with email and password
export async function registerInFirebase(creds) {
	try {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(creds.email, creds.password);
		await result.user.updateProfile({
			displayName: creds.displayName
		});
		// Create a new user profile in Firebase
		return await setUserProfileData(result.user);
	} catch (error) {
		throw error;
	}
}

// Logs in user with Facebook or Google
// If it's new user, create a user profile in Firestore and Firebase
export async function socialLogin(selectedProvider) {
	let provider;
	if (selectedProvider === 'facebook') {
		provider = new firebase.auth.FacebookAuthProvider();
	}
	if (selectedProvider === 'google') {
		provider = new firebase.auth.GoogleAuthProvider();
	}
	try {
		const result = await firebase.auth().signInWithPopup(provider);
		console.log(result);
		if (result.additionalUserInfo.isNewUser) {
			await setUserProfileData(result.user);
		}
	} catch (error) {
		toast.error(error.message);
	}
}

// Update user password
export function updateUserPassword(creds) {
	const user = firebase.auth().currentUser;
	return user.updatePassword(creds.newPassword1);
}

// Upload a file to FirebaseStorage
export function uploadToFirebaseStorage(file, filename) {
	const user = firebase.auth().currentUser;
	const storageRef = firebase.storage().ref();
	return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

// Deletes photo from firebaseStorage
export function deleteFromFirebaseStorage(filename) {
	const userUid = firebase.auth().currentUser.uid;
	const storageRef = firebase.storage().ref();
	const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
	return photoRef.delete();
}

// Add event chat comment to Firebase Realtime Database
export function addEventChatComment(eventId, comment) {
	const user = firebase.auth().currentUser;
	const newComment = {
		displayName: user.displayName,
		photoURL: user.photoURL,
		uid: user.uid,
		text: comment,
		date: Date.now()
	};
	return firebase.database().ref(`chat/${eventId}`).push(newComment);
}
