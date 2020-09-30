import firebase from '../config/firebase';

// This gives us access to Firestore db
const db = firebase.firestore();

// .onSnapshot() is a method that listens to the data on Firestore
export function getEventsFromFirestore(observer) {
	return db.collection('events').onSnapshot(observer);
}
