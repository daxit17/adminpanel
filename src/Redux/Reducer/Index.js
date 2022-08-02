import { combineReducers } from 'redux';
import { counterReducer } from './Counter_Reducer';
import { medicineReducer } from './Medicine_Reducer';

export const rootCounter = combineReducers ({
    counter : counterReducer,
    medicine : medicineReducer
})