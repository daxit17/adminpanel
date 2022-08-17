import * as ActionTypes from "../ActionTypes";

const initialVal = {
    isLoading: false,
    staff: [],
    error: ''
}

export const staffReducer = (state = initialVal, action) => {

    switch (action.type) {

        case ActionTypes.STAFF_DATA:
            return {
                ...state,
                isLoading: false,
                staff: action.payload,
                error: ''
            }

        case ActionTypes.STAFF_LOADING:
            return {
                ...state,
                isLoading: true,
                staff: [],
                error: ''
            }

        case ActionTypes.STAFF_ERROR:
            return {
                ...state,
                isLoading: false,
                staff: [],
                error: action.payload
            }

        case ActionTypes.STAFF_ADD:
            return {
                ...state,
                isLoading: false,
                staff: state.staff.concat(action.payload),
                error: ''
            }

        case ActionTypes.STAFF_DELETE:
            return {
                ...state,
                isLoading: false,
                staff: state.staff.filter((v) => v.id !== action.payload),
                error: ''
            }

        case ActionTypes.STAFF_UPDATE:
            return {
                ...state,
                isLoading: false,
                staff: state.staff.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                }),
                error: ''
            }

        default:
            return state;
    }

}