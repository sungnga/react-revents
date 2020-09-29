import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

export function configureStore() {
	// The createStore method takes a reducer and an enhancer as arguments
	return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
