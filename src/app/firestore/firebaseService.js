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
