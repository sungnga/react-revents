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
	return db
		.collection('users')
		.doc(user.uid)
		.set({
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL || null,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		});
}

// Get user profile in Firestore
export function getUserProfile(userId) {
	return db.collection('users').doc(userId);
}

// Update currentUser profile in Firebase and update user document in Firestore users collection
export async function updateUserProfile(profile) {
	const user = firebase.auth().currentUser;
	try {
		if (user.displayName !== profile.displayName) {
			await user.updateProfile({
				displayName: profile.displayName
			});
		}
		return await db.collection('users').doc(user.uid).update(profile);
	} catch (error) {
		throw error;
	}
}

// Update user profile photo in firebase.auth and firestore
export async function updateUserProfilePhoto(downloadURL, filename) {
	const user = firebase.auth().currentUser;
	const userDocRef = db.collection('users').doc(user.uid);
	try {
		const userDoc = await userDocRef.get();
		if (!userDoc.data().photoURL) {
			await db.collection('users').doc(user.uid).update({
				photoURL: downloadURL
			});
			await user.updateProfile({
				photoURL: downloadURL
			});
		}
		return await db.collection('users').doc(user.uid).collection('photos').add({
			name: filename,
			url: downloadURL
		});
	} catch (error) {
		throw error;
	}
}

// Get user photos from Firestore photos collection
export function getUserPhotos(userUid) {
	return db.collection('users').doc(userUid).collection('photos');
}

// Updates the photoURL property in Firestore user document and updates the user profile photoURL property in firebase.auth
export async function setMainPhoto(photo) {
	const user = firebase.auth().currentUser;
	try {
		await db.collection('users').doc(user.uid).update({
			photoURL: photo.url
		});
		return await user.updateProfile({
			photoURL: photo.url
		});
	} catch (error) {
		throw error;
	}
}

// Delete photo from Firestore photos collection based on the given photoId
export function deletePhotoFromCollection(photoId) {
	const userUid = firebase.auth().currentUser.uid;
	return db
		.collection('users')
		.doc(userUid)
		.collection('photos')
		.doc(photoId)
		.delete();
}
