import { async } from "@firebase/util";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import * as ActionTypes from '../ActionTypes';

export const addPatientsData = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "patients"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionTypes.PATIENTS_ADD, payload: { id: docRef.id, ...data } })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const patientsData = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "patients"));

        let data = [];

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(data);
        });

        dispatch({ type: ActionTypes.PATIENTS_DATA, payload: data })

    } catch (e) {
        console.log(e);
    }
}