import { getDocs, query, orderBy, collection, addDoc, Timestamp, getDoc, deleteDoc, doc } from '@firebase/firestore';
import {bdFirestore} from './init';

/**
 * Obtenir tous les dossier d'un utilisateur tries par date de modification descendante
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecter
 * @returns {Promise<any[]>} Promesse avec le tableau des dossiers lorsque la promesse est completee
 */

// collection(bdFirestore, 'signets', idUtilisateur, "dossiers")

export async function lireTout(idUtilisateur){
    return getDocs(query(collection(bdFirestore, 'signets', idUtilisateur, "dossiers"), orderBy("dateModif", "desc"))).then(res => res.docs.map(doc => ({id: doc.id, ...doc.data()})));
}

export async function creer(idUtilisateur, dossier){
    //  On ajoute dateModif a l'objet dossier
    dossier.dateModif =  Timestamp.now();
    let coll = collection(bdFirestore, 'signets', idUtilisateur, "dossiers");
    let refDoc = await addDoc(coll, dossier);
    return await getDoc(refDoc);
}

/**
 * Supprimer un dossier pour l'utilisateur connecte
 * @param {string} uid : id firebase de l'utilisateur connecte
 * @param {string} idDossier: id du document correspondant au dossier a supprimer
 * @param {Promise<void>} : promesse contenant rien 
 */
export async function supprimer(uid, idDossier){
    let refDoc = await doc(bdFirestore, "signets", uid, "dossiers", idDossier);
    return await deleteDoc(refDoc);
}