import * as ActionTypes from '../ActionTypes';

const initval = {
    isLoading: false,
    patients: [],
    error: ''
}

export const patientsReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionTypes.PATIENTS_DATA:
            return {
                ...state,
                isLoading: false,
                patients: action.payload,
                error: ''
            }

        default:
            return state;
    }
}