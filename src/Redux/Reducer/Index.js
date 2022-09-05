import { combineReducers } from 'redux';
import { counterReducer } from './Counter_Reducer';
import { medicineReducer } from './Medicine_Reducer';
import { patientsReducer } from './Patients_Reducer';
import { staffReducer } from './Staff_Reducer';

export const rootCounter = combineReducers({
    counter: counterReducer,
    medicine: medicineReducer,
    staff: staffReducer,
    patients: patientsReducer
})