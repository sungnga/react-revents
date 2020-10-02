import firebase from '../config/firebase';

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
		return await result.user.updateProfile({
			displayName: creds.displayName
		});
	} catch (error) {
		throw error;
	}
}
