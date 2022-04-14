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

export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier}) {
  const [eltAncrage, setEltAncrage] = React.useState(null);
  const estOuvert = Boolean(eltAncrage);

  function gererMenu(event) {
    setEltAncrage(event.currentTarget);
  };

  function gererFermer() {
    setEltAncrage(null);
  };
  
  function gererFormulaireModifier(){
    // Ouvrir le formulaire de modification du dossier (transferer l'information du
    // dossier dans le formulaire)...

    // ... puis fermer le menu
  }

  function gererSupprimer(){
    // Appeler la fonction qui de ListeDossiers qui gere la suppression dans Firestore.
    supprimerDossier(id);
    // ... puis fermer le menu
    gererFermer();
  }
  let urlCouverture
  // Tester si l'URL danss la variable couverture est valide
  try{
    urlCouverture = new URL(couverture);
  }
  catch(e){
    couverture = couvertureDefaut;
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
        open={estOuvert}
        onClose={gererFermer}
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
    </article>
  );
}