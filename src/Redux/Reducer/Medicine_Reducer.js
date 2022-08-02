import * as ActionTypes from '../ActionTypes';

const initialVal = {
    isLoading: false,
    medicine: [],
    error: ''
}

export const medicineReducer = (state = initialVal, action) => {

    switch (action.type) {
        case ActionTypes.MEDICINE_DATA:
            return {
                ...state,
                isLoading: false,
                medicine: action.payload,
                error: ''
            }

        case ActionTypes.MEDICINE_LOADING:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        case ActionTypes.MEDICINE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case ActionTypes.MEDICINE_ADD:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.concat(action.payload),
                error: ''
            }

        case ActionTypes.MEDICINE_DELETE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.filter((v) => v.id !== action.payload),
                error: ''
            }

        case ActionTypes.MEDICINE_UPDATE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.map((m) => {
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