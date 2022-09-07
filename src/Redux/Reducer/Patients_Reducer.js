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

        case ActionTypes.PATIENTS_DELETE:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.filter((v) => v.id !== action.payload),
                error: ''
            }

        case ActionTypes.PATIENTS_UPDATE:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return m;
                    }
                })
            }

        default:
            return state;
    }
}