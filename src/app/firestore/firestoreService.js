import firebase from '../config/firebase';

// This gives us access to Firestore db
const db = firebase.firestore();

// Shape Firestore data
export function dataFromSnapshot(snapshot) {
	// If snapshot doesn't exist, return undefined
	if (!snapshot.exists) return undefined;
	// If it does exist, get the data from snapshot
	const data = snapshot.data();

	// Convert Firestore timestamp to Javascript date
	for (const prop in data) {
		if (data.hasOwnProperty(prop)) {
			if (data[prop] instanceof firebase.firestore.Timestamp) {
				data[prop] = data[prop].toDate();
			}
		}
  }
  
	// Return the existing data and the id from snapshot.id
	return {
		...data,
		id: snapshot.id
	};
}

// Listen to events data from Firestore
export function listenToEventsFromFirestore() {
	return db.collection('events');
}
