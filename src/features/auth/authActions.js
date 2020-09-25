import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';

// Action creator
export function signInUser(payload) {
	return {
		type: SIGN_IN_USER,
		payload
	};
}

// Action creator
export function signOutUser() {
	return {
		type: SIGN_OUT_USER
	};
}
