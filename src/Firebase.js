// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDRoCIKrfOwa6zRcudXesC4x5NYQEvCjJU",
    authDomain: "adminpanel-d95bd.firebaseapp.com",
    projectId: "adminpanel-d95bd",
    storageBucket: "adminpanel-d95bd.appspot.com",
    messagingSenderId: "1022903539674",
    appId: "1:1022903539674:web:fd86ff3ac0c3cc2d72d2e3",
    measurementId: "G-Q2YMCV2SDZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
