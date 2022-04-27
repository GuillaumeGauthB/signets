import './ListeDossiers.scss';
import Dossier from './Dossier';
import {useEffect, useState} from 'react';
import * as dossierModele from '../code/dossier-modele';

export default function ListeDossiers({utilisateur, dossiers, setDossiers}) {
  console.log("Objet utilisateur retourner par le provider googleauth : ", utilisateur);
  const [dossierSupprime, setDossierSupprime] = useState(null);

  // Lire les dossiers de l'utilisateur connecter dans Firestore
  useEffect(
  () => dossierModele.lireTout(utilisateur.uid).then(
    lesDossiers => setDossiers(lesDossiers)
    )
    , [utilisateur, setDossiers]
  );

  function supprimerDossier(idDossier){
    // Utiliser le modele des dossiers pour supprimer le dossier dans Firestore
    console.log("baka-oniichan!!!!!!!!!!!!!! ", idDossier);
    dossierModele.supprimer(utilisateur.uid, idDossier).then(
      ()=>setDossiers(dossiers.filter(
        dossier => dossier.id !== idDossier
      ))
    )
  }

  function modifierDossier(idDossier, nvTitre, nvCouverture, nvCouleur){
    const objetModif ={
      couleur: nvCouleur,
      titre: nvTitre,
      couverture: nvCouverture
    }
    dossierModele.modifier(utilisateur.uid, idDossier, objetModif).then(
      ()=>setDossiers(dossiers.map(
        dossier =>{
          if(dossier.id === idDossier){
            dossier.couverture = nvCouverture;
            dossier.titre = nvTitre;
            dossier.couleur = nvCouleur;
          }
        }
      ))
    );
  }

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          dossier =>  <li key={dossier.id}><Dossier {...dossier} supprimerDossier={supprimerDossier} modifierDossier={modifierDossier}/></li>
        )
      }
    </ul>
  );
}