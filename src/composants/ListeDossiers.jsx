import './ListeDossiers.scss';
import Dossier from './Dossier';
import {useEffect} from 'react';
import * as dossierModele from '../code/dossier-modele';

export default function ListeDossiers({utilisateur, dossiers, setDossiers}) {
  console.log("Objet utilisateur retourner par le provider googleauth : ", utilisateur);

  // Lire les dossiers de l'utilisateur connecter dans Firestore
  useEffect(
  () => dossierModele.lireTout(utilisateur.uid).then(
    lesDossiers => setDossiers(lesDossiers)
    )
    , [utilisateur, setDossiers]
  );
  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          dossier =>  <li key={dossier.id}><Dossier {...dossier} /></li>
        )
      }
    </ul>
  );
}