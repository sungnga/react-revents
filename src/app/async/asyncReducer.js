// Constants
const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';

// Action creator
export function asyncActionStart() {
	return {
		type: ASYNC_ACTION_START
	};
}

// Action creator
export function asyncActionFinish() {
	return {
		type: ASYNC_ACTION_FINISH
	};
}

// Action creator
export function asyncActionError(error) {
	return {
		type: ASYNC_ACTION_ERROR,
		payload: error
	};
}

// Initial state
const initialState = {
	laoding: false,
	error: null
};

// Async reducer
export default function asyncReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ASYNC_ACTION_START:
			return {
				...state,
				loading: true,
				error: null
			};
		case ASYNC_ACTION_FINISH:
			return {
				...state,
				loading: false
			};
		case ASYNC_ACTION_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
}
