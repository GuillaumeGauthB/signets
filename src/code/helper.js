/**
 * Retourner une date dans le format francais suivant:
 * 5 novembre 2021
 * @param {Number} tsSecondes timestamp en secondes 
 * @returns {String} Chaine representant le timestamp dans le format specifier
 */

export function formatterDate(tsSecondes){
    const date = new Date(tsSecondes * 1000);
    const jour = date.getDate();
    const moisListe = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `${date.getDate()} ${moisListe[date.getMonth()]} ${date.getFullYear()}`;
}