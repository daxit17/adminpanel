import { applyMiddleware, createStore } from 'redux';
import { rootCounter } from './Reducer/Index';
import thunk from 'redux-thunk';

export const configureStore = () => {

    let store = createStore(rootCounter,applyMiddleware(thunk))

    return store;
}