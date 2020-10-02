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
