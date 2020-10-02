import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { verifyAuth } from '../../features/auth/authActions';

export function configureStore() {
	// The createStore method takes a reducer and an enhancer as arguments
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);

	store.dispatch(verifyAuth());

	return store;
}
