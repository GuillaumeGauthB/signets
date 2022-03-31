import { getDocs, collection } from '@firebase/firestore';
import { addDoc, Timestamp, getDoc } from 'firebase/firestore';
import {bdFirestore} from './init';

/**
 * Obtenir tous les dossier d'un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecter
 * @returns {Promise<any[]>} Promesse avec le tableau des dossiers lorsque la promesse est completee
 */

export async function lireTout(idUtilisateur){
    return getDocs(collection(bdFirestore, 'signets', idUtilisateur, "dossiers")).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}

export async function creer(idUtilisateur, dossier){
    //  On ajoute dateModif a l'objet dossier
    dossier.dateModif =  Timestamp.now();
    let coll = collection(bdFirestore, 'signets', idUtilisateur, "dossiers");
    let refDoc = await addDoc(coll, dossier);
    return await getDoc(refDoc);
}