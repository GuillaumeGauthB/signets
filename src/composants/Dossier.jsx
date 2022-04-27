import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import couvertureDefaut from '../images/couverture-defaut.png';
import { formatterDate } from '../code/helper';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ModificationDossier from './ModificationDossier';

export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier, modifierDossier}) {
  // Etat du menu contextuel
  const [eltAncrage, setEltAncrage] = React.useState(null);
  const estOuvertMenu = Boolean(eltAncrage);

  // Etat du formulaire de modification
  const [estOuvertFrm, setEstOuvertFrm] = useState(false);

  function gererMenu(event) {
    setEltAncrage(event.currentTarget);
  };

  function gererFermerMenu() {
    setEltAncrage(null);
  };

  function gererFormulaireModifier(){
    // Ouvrir le formulaire de modification du dossier (transferer l'information du
    // dossier dans le formulaire)...
    setEstOuvertFrm(true);
    // ... puis fermer le menu
    gererFermerMenu();
  }

  function gererSupprimer(){
    // Appeler la fonction qui de ListeDossiers qui gere la suppression dans Firestore.
    supprimerDossier(id);
    // ... puis fermer le menu
    gererFermerMenu();
  }
  let urlCouverture
  // Tester si l'URL danss la variable couverture est valide
  try{
    urlCouverture = new URL(couverture);
  }
  catch(e){
    couverture = couvertureDefaut;
  }

  function gererModifier(nvId, nvTitre, nvCouverture, nvCouleur){
    modifierDossier(nvId, nvTitre, nvCouverture, nvCouleur);
  }
  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={couverture || couvertureDefaut} alt={titre}/>
      </div>
      <div className="info">
        <h2>{titre}</h2>
        <p>Modifié : {formatterDate(dateModif.seconds)}</p>
      </div>
      <IconButton className="modifier" aria-label="modifier" size="small" onClick={gererMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-contextuel-dossier"
        anchorEl={eltAncrage}
        open={estOuvertMenu}
        onClose={gererFermerMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={gererFormulaireModifier}>Modifier</MenuItem>
        <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
      </Menu>
      <ModificationDossier gererModifier={gererModifier} ouvert={estOuvertFrm} setOuvert={setEstOuvertFrm} id_p={id} titre_p={titre} couleur_p={couleur} couverture_p={couverture} />
    </article>
  );
}