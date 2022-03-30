import {authFirebase, authGoogle, bdFirestore} from './init';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from '@firebase/firestore';

/**
 * Ouvre une connexion Firebase avec Google
 */

export function connexion(){
    signInWithPopup(authFirebase, authGoogle)
  }

/**
 * Ferme la connexion Firebase Auth
 */
export function deconnexion(){
    authFirebase.signOut()
}

export function observerEtatConnexion(mutateurEtatUtilisateur) {
    onAuthStateChanged(authFirebase, 
        user =>{ 
        if(user){
            // Sauvegarder le profil dans Firestore
            setDoc(doc(bdFirestore, 'signets', user.uid), {nom:user.displayName, courriel:user.email}, {merge: true});
        }
        mutateurEtatUtilisateur(user);
    });
}