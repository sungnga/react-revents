import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import testReducer from '../../features/sandbox/testReducer';

export function configureStore() {
	// The createStore method takes a reducer as an argument
	return createStore(testReducer, devToolsEnhancer());
}
