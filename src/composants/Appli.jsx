import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Accueil from './Accueil';
import { useState, useEffect } from 'react';
import {observerEtatConnexion} from '../code/utilisateur-modele';

export default function Appli() {
  // Etat 'utilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  // Etat des 'dossiers' de l'utilisateur connecter
  const [dossiers, setDossiers] = useState([]);

  // Surveiller l'etat de la connexion Firebase Auth

  useEffect(() => observerEtatConnexion(setUtilisateur),[]);
  return (
    utilisateur ?
      <div className="Appli">
          <Entete utilisateur={utilisateur}/>
          <section className="contenu-principal">
            <ListeDossiers utilisateur={utilisateur} dossiers={dossiers} setDossiers={setDossiers} />
            {/* Ajouter un composant FormDialog de MUI */}
            <Fab onClick="" size="large" className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
              <AddIcon />
            </Fab>
          </section>
      </div>
      :
      <Accueil />
  );
}
