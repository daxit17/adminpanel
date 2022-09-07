import { async } from "@firebase/util";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../Firebase";
import * as ActionTypes from '../ActionTypes';

export const addPatientsData = (data) => async (dispatch) => {
    try {

        const patientsRef = ref(storage, 'patients' + data.pro_img.name);

        uploadBytes(patientsRef, data.pro_img)
            .then((snapshot) => {
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "patients"), {
                            ...data,
                            pro_img: url
                        });
                        dispatch({
                            type: ActionTypes.PATIENTS_ADD,
                            payload: {
                                id: docRef.id,
                                ...data,
                                pro_img: url
                            }
                        })

                    })
            });

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

export const patientsDataDelete = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, "patients", id));

        dispatch({ type: ActionTypes.PATIENTS_DELETE, payload: id })

    } catch (e) {
        console.log(e);
    }
}

export const patientsDataUpdate = (data) => async (dispatch) => {
    try {
        const DoctorsRef = doc(db, "patients", data.id);
        await updateDoc(DoctorsRef, {
            name: data.name,
            age: data.age,
            weight: data.weight,
            number: data.number
        });
        dispatch({ type: ActionTypes.PATIENTS_UPDATE, payload: data })
    } catch (e) {
        console.log(e);
    }
}