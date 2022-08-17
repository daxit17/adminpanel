import { applyMiddleware, createStore } from 'redux';
import { rootCounter } from './Reducer/Index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter']
}

const persistedReducer = persistReducer(persistConfig, rootCounter)


export const configureStore = () => {

    let store = createStore(persistedReducer, applyMiddleware(thunk))

    let persistor = persistStore(store)

    return { store, persistor };
}