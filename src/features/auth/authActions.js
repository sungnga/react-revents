import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReducer';

// Action creator
export function signInUser(user) {
	return {
		type: SIGN_IN_USER,
		payload: user
	};
}

export function verifyAuth() {
	return function (dispatch) {
		return firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// Update the state with currentUser object
				dispatch(signInUser(user));
				dispatch({ type: APP_LOADED });
			} else {
				dispatch(signOutUser());
				dispatch({ type: APP_LOADED });
			}
		});
	};
}

// Action creator
export function signOutUser() {
	return {
		type: SIGN_OUT_USER
	};
}
