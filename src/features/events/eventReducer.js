import { sampleData } from '../../app/api/sampleData';
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventConstants';

// Initial state
const initialState = {
	events: sampleData
};

// Reducer function
// 1st arg the state set to initialState object
// 2nd arg is the action. Destructure the type and payload properties from the action object
export default function eventReducer(state = initialState, { type, payload }) {
	switch (type) {
		case CREATE_EVENT:
			return {
				...state,
				events: [...state.events, payload]
			};
		case UPDATE_EVENT:
			return {
				...state,
				events: [
					...state.events.filter((evt) => evt.id !== payload.id),
					payload
				]
			};
		case DELETE_EVENT:
			return {
				...state,
				events: [...state.events.filter((evt) => evt.id !== payload)]
			};
		default:
			return state;
	}
}
