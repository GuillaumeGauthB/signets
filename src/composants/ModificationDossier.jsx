import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TwitterPicker} from 'react-color';
import {useState} from 'react';

export default function AjoutDossier({id, titre_p, couleur_p, couverture_p, ouvert, setOuvert, gererModifierDossier}) {
    const [titre, setTitre] = useState(titre_p)
    const [couverture, setCouverture] = useState(couverture_p)
    const [couleur, setCouleur] = useState(couleur_p)
  const gererOuvrir = () => {
    setOuvert(true);
  };

  const gererFermer = () => {
    //  Constater le bpgue avant de reinitialiser les etats des valeurs du formulaire
    setTitre('');
    setCouverture('');
    setCouleur('#000');
    setOuvert(false);
  };

  function gererSoumettre() {
    //   Code qui gere l'ajout dans Firestore
    if(titre.search(/[a-z]{2,}/i) != -1){
      gererModifierDossier(titre, couverture, couleur);
      gererFermer();
    }
  }

  return (
    <div>
      <Dialog open={ouvert} onClose={gererFermer}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
            {/* Titre du dossier */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titre du dossier"
            type="text"
            fullWidth
            variant="standard"
            onChange={evt => setTitre(evt.target.value)}
            value={titre_p}
          />
          {/* URL de l'image */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image couverture du dossier"
            type="url"
            fullWidth
            variant="standard"
            style={{marginBottom: "1.5rem"}}
            onChange={evt => setCouverture(evt.target.value)}
          />
          {/* Couleur du dossier */}
          <TwitterPicker 
            triangle='hide'
            color={couleur}
            colors={["#900", "#090", "#009"]}
            width="auto"
            onChangeComplete={(couleur, evt) => setCouleur(couleur.hex)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

