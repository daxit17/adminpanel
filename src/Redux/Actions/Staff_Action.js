import * as ActionTypes from "../ActionTypes";
import { BASE_URL } from "../../Base_Url/Base_Url";
import { deleteAllStaffData, getAllStaffData, postAllStaffData, putAllStaffData } from "../../common/apis/Staff_Api";

export const staffData = () => (dispatch) => {

    try {

        dispatch(isLoading());

        setTimeout(function () {

            getAllStaffData()
                .then((data) => dispatch({ type: ActionTypes.STAFF_DATA, payload: data.data }))
                .catch((error) => dispatch(medicineFailed(error.message)));

            // fetch(BASE_URL + 'staff')

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
            //     .then((data) => dispatch({ type: ActionTypes.STAFF_DATA, payload: data }))
            //     .catch((error) => dispatch(medicineFailed(error.message)));

        }, 2000);

    } catch (error) {
        dispatch(medicineFailed(error.message))
    }

}

export const isLoading = () => (dispatch) => {
    dispatch({ type: ActionTypes.STAFF_LOADING })
}

export const medicineFailed = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.STAFF_ERROR, payload: error })
}

export const addStaffData = (data) => (dispatch) => {

    try {

        postAllStaffData(data)
            .then((data) => dispatch({ type: ActionTypes.STAFF_ADD, payload: data.data }))
            .catch((error) => dispatch(medicineFailed(error.message)));

        // fetch(BASE_URL + 'staff', {
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
        //     .then((data) => dispatch({ type: ActionTypes.STAFF_ADD, payload: data }))
        //     .catch((error) => dispatch(medicineFailed(error.message)));



    } catch (error) {
        dispatch(medicineFailed(error.message));
    }
}

export const staffDelete = (id) => (dispatch) => {

    try {

        deleteAllStaffData(id)
            .then(dispatch({ type: ActionTypes.STAFF_DELETE, payload: id }))
            .catch((error) => dispatch(medicineFailed(error.message)));

        // fetch(BASE_URL + 'staff/' + id, {
        //     method: 'DELETE',
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
        //     .then(dispatch({ type: ActionTypes.STAFF_DELETE, payload: id }))
        //     .catch((error) => dispatch(medicineFailed(error.message)));

    } catch (error) {
        dispatch(medicineFailed(error.message))
    }
}

export const staffUpdate = (data) => (dispatch) => {

    try {

        putAllStaffData(data)
            .then((data) => dispatch({ type: ActionTypes.STAFF_UPDATE, payload: data.data }))
            .catch((error) => dispatch(medicineFailed(error.message)));

        // fetch(BASE_URL + 'staff/' + data.id, {
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
        //     .then((data) => dispatch({ type: ActionTypes.STAFF_UPDATE, payload: data }))
        //     .catch((error) => dispatch(medicineFailed(error.message)));

    } catch (error) {
        dispatch(medicineFailed(error.message));

    }
}