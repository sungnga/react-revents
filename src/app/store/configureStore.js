import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

export function configureStore() {
	// The createStore method takes a reducer as an argument
	return createStore(rootReducer, devToolsEnhancer());
}
