import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';

// Action creator
export function signInUser(creds) {
	return async function (dispatch) {
		try {
			const result = await firebase
				.auth()
				.signInWithEmailAndPassword(creds.email, creds.password);
			dispatch({ type: SIGN_IN_USER, payload: result.user });
		} catch (error) {
			throw error;
		}
	};
}

// Action creator
export function signOutUser() {
	return {
		type: SIGN_OUT_USER
	};
}
