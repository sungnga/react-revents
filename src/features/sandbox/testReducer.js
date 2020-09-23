// Action constant
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// Action creator
export function increment(amount) {
	return {
		type: INCREMENT_COUNTER,
		payload: amount
	};
}

// Action creator
export function decrement(amount) {
	return {
		type: DECREMENT_COUNTER,
		payload: amount
	};
}

// Initial State
const initialState = {
	data: 42
};

// Reducer function
// 1st arg is initial state
// 2nd arg is the action. Here, destructuring the properties from action object
// Returning a default state
export default function testReducer(state = initialState, {type, payload}) {
	switch (type) {
		case INCREMENT_COUNTER:
			return {
				...state,
				data: state.data + payload
			};
		case DECREMENT_COUNTER:
			return {
				...state,
				data: state.data - payload
			};
		default:
			return state;
	}
}
