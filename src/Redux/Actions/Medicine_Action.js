import { BASE_URL } from '../../Base_Url/Base_Url';
import { addMedicinesData, deleteMedicinesData, getAllMedicinesData, postMedicinesData, putMedicinesData } from '../../common/apis/Medicine_Api';
import * as ActionTypes from '../ActionTypes';

export const dataMedicine = () => (dispatch) => {

    try {

        dispatch(LoadingMedicines());

        setTimeout(function () {

            getAllMedicinesData()
                .then((data) => dispatch({ type: ActionTypes.MEDICINE_DATA, payload: data.data }))
                .catch((error) => dispatch(ErrorMedicine(error.message)));

            // fetch(BASE_URL + 'medicine')

            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Something went wrong : ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })

            //     .then((response) => response.json())
            //     .then((data) => dispatch({ type: ActionTypes.MEDICINE_DATA, payload: data }))
            //     .catch((error) => dispatch(ErrorMedicine(error.message)));

        }, 2000)

    } catch (error) {
        dispatch(ErrorMedicine(error.message));
    }

}

export const addMedicines = (data) => (dispatch) => {

    try {

        postMedicinesData(data)

            .then((data) => dispatch({ type: ActionTypes.MEDICINE_ADD, payload: data.data }))
            .catch((error) => dispatch(ErrorMedicine(error.message)));

        // fetch(BASE_URL + 'medicine', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })

        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Something went wrong : ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })

        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.MEDICINE_ADD, payload: data }))
        //     .catch((error) => dispatch(ErrorMedicine(error.message)));

    } catch (error) {
        dispatch(ErrorMedicine(error.message));
    }
}

export const deleteMedicines = (id) => (dispatch) => {
    try {

        deleteMedicinesData(id)
            .then(dispatch({ type: ActionTypes.MEDICINE_DELETE, payload: id }))
            .catch((error) => dispatch(ErrorMedicine(error.message)));

        // fetch(BASE_URL + 'medicine/' + id, {
        //     method: "DELETE",
        // })

        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Something went wrong : ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })

        //     .then((response) => response.json())
        //     .then(dispatch({ type: ActionTypes.MEDICINE_DELETE, payload: id }))
        //     .catch((error) => dispatch(ErrorMedicine(error.message)));

    } catch (error) {
        dispatch(ErrorMedicine(error.message));
    }
}

export const updateMedicine = (data) => (dispatch) => {
    try {

        putMedicinesData(data)
            .then((data) => dispatch({ type: ActionTypes.MEDICINE_UPDATE, payload: data.data }))
            .catch((error) => dispatch(ErrorMedicine(error.message)));

        // fetch(BASE_URL + 'medicine/' + data.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })

        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Something went wrong : ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })

        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.MEDICINE_UPDATE, payload: data }))
        //     .catch((error) => dispatch(ErrorMedicine(error.message)));

    } catch (error) {
        dispatch(ErrorMedicine(error.message));
    }
}

export const LoadingMedicines = () => (dispatch) => {
    dispatch({ type: ActionTypes.MEDICINE_LOADING })
}

export const ErrorMedicine = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.MEDICINE_ERROR, payload: error })
}