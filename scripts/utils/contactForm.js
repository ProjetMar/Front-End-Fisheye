
import { Id } from "../pages/photographer";
console.log(Id);

const h2 = document.querySelector("#contact_modal h2");


console.log(h2);
const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const body = document.getElementById("body");
// // Fonction pour activer/désactiver la navigation sur tous les éléments de la page
// function togglePageTabbing(enableTabbing) {
//     const pageElements = document.querySelectorAll("body > *:not(#modal)");
//     pageElements.forEach(element => {
//       if (enableTabbing) {
//         element.removeAttribute("tabindex");
//       } else {
//         element.setAttribute("tabindex", "-1");
//       }
//     });
//   }
  
function displayModal() {
    main.setAttribute("aria-hidden",'true');
    modal.setAttribute("aria-hidden", 'false');
    body.classList.add('no-scroll');
	modal.style.display = "flex";
    // Ajouter un écouteur d'événements sur le document pour capturer les touches du clavier
    document.addEventListener("keydown", preventOutsideNavigation);
    //ajout focus à la premier input du modal
    modal.querySelector('input').focus();
}

function closeModal() {
    main.setAttribute("aria-hidden",'false');
    modal.setAttribute("aria-hidden", 'true');
    body.classList.remove('no-scroll');
    modal.style.display = "none";
    // Supprimer l'écouteur d'événements sur le document lorsque la modal est fermée
    document.removeEventListener("keydown", preventOutsideNavigation); 
}
// Fonction pour empêcher la navigation en dehors du modal
function preventOutsideNavigation(event) {
    // Vérifier si la touche "Tab" est pressée
    if (event.key === "Tab") {
      // Empêcher le déplacement du focus en dehors du modal
      if (!modal.contains(document.activeElement)) {
        event.preventDefault();
        //ajout focus à la premier input du modal
        modal.querySelector('input').focus();
      }
    }
  
    // Vérifier si la touche "Escape" est pressée
    if (event.key === "Escape") {
      closeModal(); // Fermer la modal si la touche "Escape" est pressée
    }
  }
//ajouter echap
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault();
    let formulaire = new Formulaire();
    let errorDetected = formulaire.gererForm;
    if (errorDetected === false){
        document.querySelector("form").reset();
        closeModal()
    } 
})

const formData = document.querySelectorAll(".formData");
class Formulaire {
    constructor(){
        this.firstName = document.getElementById("first").value
        this.lastName = document.getElementById("last").value
        this.email = document.getElementById("email").value
        this.message = document.getElementById("message").value
        this.tabFonction = {
            "first" : this.validateFirstName,
            "last" : this.validateLasteName,
            "email" : this.validateEmail,
        }
    }
    validateFirstName(self){
        if(self.firstName.length < 2){
            throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du prénom." );
        }
    }
    validateLasteName(self){
        if(self.lastName.length < 2){  
            throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du nom." );  
        }
    }
    validateEmail(self){
        let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
        if (!emailRegExp.test(self.email)) {
            throw new Error("L'email n'est pas valide.");
        }
    }
    displayMessageError( nameElement, element, message) {
        let spanErreurMessage = document.getElementById("error" + nameElement);
        if (!spanErreurMessage) {
            spanErreurMessage = document.createElement("span")
            spanErreurMessage.id = "error" + nameElement;
            spanErreurMessage.style.color = 'black' ;
            spanErreurMessage.style.fontSize = '20px';
            element.getElementsByTagName("input")[0].style.border = '2px solid black';  
            element.append(spanErreurMessage)
        }
        spanErreurMessage.innerText = message
    }
    get gererForm(){
        let detectedError = false;
        formData.forEach((element)=>{
            let inputs = element.getElementsByTagName("input");
            let nameElement = inputs[0].name;
            try{
                this.tabFonction[nameElement](this);
                this.displayMessageError(nameElement, element, "");
                inputs[0].style.border ='none'; 
                   
            }catch(erreur){
                this.displayMessageError( nameElement, element, erreur.message );
                detectedError = true;
            }
        })
        if (detectedError === false){   
            console.log(`prénom: ${this.firstName}, Nom: ${this.lastName}, 
            email: ${this.email}, message: ${this.message}`)  
        } 
        return(detectedError)
    }
}
