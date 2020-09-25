// Constants
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

// Action creator
export function openModal(payload) {
	return {
		type: OPEN_MODAL,
		payload
	};
}

// Action creator
export function closeModal() {
	return {
		type: CLOSE_MODAL
	};
}

// State
const initialState = null;

// Modal reducer
export default function modalReducer(state = initialState, { type, payload }) {
	switch (type) {
		case OPEN_MODAL:
			const { modalType, modalProps } = payload;
			return { modalType, modalProps };
		case CLOSE_MODAL:
			return null;
		default:
			return state;
	}
}
