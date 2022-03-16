import firebaseConfig from "./config";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Initialiser firebase
export const instanceFirebase = initializeApp(firebaseConfig);

// Initialiser Auth
export const authFirebase = getAuth();

// Initialiser l'Authentification federee Google
export const authGoogle = new GoogleAuthProvider;

// Initialiser FireStore
export const bdFirestore = getFirestore();




