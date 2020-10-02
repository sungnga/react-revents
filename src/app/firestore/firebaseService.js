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
