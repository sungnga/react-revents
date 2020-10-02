import cuid from 'cuid';
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
	return db.collection('events').orderBy('date');
}

export function listenToEventFromFirestore(eventId) {
	return db.collection('events').doc(eventId);
}

// Add an event to Firestore
export function addEventToFirestore(event) {
	return db.collection('events').add({
		...event,
		hostedBy: 'Diana',
		hostPhotoURL: 'https://randomuser.me/api/portraits/men/28.jpg',
		attendees: firebase.firestore.FieldValue.arrayUnion({
			id: cuid(),
			displayName: 'Diana',
			photoURL: 'https://randomuser.me/api/portraits/men/28.jpg'
		})
	});
}

// Update an event in Firestore
export function updateEventInFirestore(event) {
	return db.collection('events').doc(event.id).update(event);
}

// Delete an event in Firestore
export function deleteEventInFirestore(eventId) {
	return db.collection('events').doc(eventId).delete();
}

// Toggle cancel event in Firststore
export function cancelEventToggle(event) {
	return db.collection('events').doc(event.id).update({
		isCancelled: !event.isCancelled
	});
}

export function setUserProfileData(user) {
	return db.collection('users').doc(user.uid).set({
		displayName: user.displayName,
		email: user.email,
		createdAt: firebase.firestore.FieldValue.serverTimestamp()
	});
}
