import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

/**
 * Demande la confirmation de l'utilisateur
 * @param {string} text Texte afficher pour confirmation
 * @param {string} confirmButtonText Texte sur le boutton Confirmer
 * @returns 
 */
export function askConfirmation(text = "", confirmButtonText = "Oui, Confirmer!") {
    return MySwal.fire({
      title: "Vous etes sure ?",
      text: text,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: confirmButtonText,
    });
}
  
/**
 * Niveau de notification pour la fonction notify()
 */
export const NOTIFY_LEVEL = {
    SUCCESS: 'success',
    ERROR: 'error',
}

/**
 * Notifie l'utilisateur
 * @param {string} message Message afficher
 * @param {string} level Niveau de notification
 */
export const notify = (message = "Your message here!",level = NOTIFY_LEVEL.SUCCESS) => {
    MySwal.fire(
        message,
        "",
        level
    )
}