import { bdFirestore } from "./init";
import {updateDoc, doc } from "firebase/firestore";

/**
 * Ajoute un signet en recreant le tableau des top3 dans le dossier identifie
 * @param {String} uid Identifiant Firebase Auth de l'utilisateur connecter
 * @param {String} idDossier Identifiant Firestore du dossier auquel on ajoute le signet
 * @param {Object[]} dernier3 Tableau des objets signets representant les derniers 3 signets a conserver
 * @returns 
 */
export async function creer(uid, idDossier, dernier3) {
    // Référence au document dans laquelle on veut ajouter le signet
    let docRef = doc(bdFirestore, 'signets', uid, 'dossiers', idDossier);
    return await updateDoc(docRef, {top3: dernier3});
}