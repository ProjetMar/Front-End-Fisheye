
function getListeDOM(){
    const template = document.getElementById('templateListe');
    const clone = document.importNode(template.content,true);
    return(clone)
}

//gerer la liste 
function toggleSortOptions() {
    let sortButton = document.getElementById("sortButton");
    let sortOptions = document.getElementById("sortOptions");
    const listItems = document.querySelectorAll('#sortOptions li');
    listItems[0].classList.add('souligne');
    listItems[1].classList.add('souligne');

    if (sortButton.getAttribute("aria-expanded") === "false") {
        sortButton.setAttribute("aria-expanded", "true");
        sortOptions.style.visibility = "visible";
        document.querySelector('.flech').innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
        sortButton.style.visibility = "hidden";
        sortOptions.focus();
    } else {
        sortButton.setAttribute("aria-expanded", "false");
    }
}

function selectSortOption(optionId) {
    let sortOptions = document.getElementById("sortOptions");
    let selectedOption = document.getElementById(optionId);
    const listItems = document.querySelectorAll('#sortOptions li');
    listItems[0].classList.remove('souligne');
    listItems[1].classList.remove('souligne');
    listItems[2].classList.remove('souligne');
    // Déplacer l'option sélectionnée en haut de la liste
    sortOptions.insertBefore(selectedOption, sortOptions.firstChild);
    
    // Désélectionner toutes les options
    let options = sortOptions.querySelectorAll('li[role="option"]');
    options.forEach(function(opt) {
        opt.setAttribute("aria-selected", "false");
    });

    // Sélectionner l'option cliquée
    selectedOption.setAttribute("aria-selected", "true");
    
    // Mettre à jour le label du bouton déclencheur
    let sortButton = document.getElementById("sortButton");
    sortButton.innerText = selectedOption.innerText;
    

    // Fermer le menu déroulant après la sélection
    sortOptions.style.visibility = "hidden";
    sortButton.style.visibility = "visible";
    //mettre le fleche montant 
    document.querySelector('.flech').innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    sortButton.setAttribute("aria-expanded", "false");
}
//fin de la fonction pour gerer la liste 
// Fonction de comparaison personnalisée
function customCompare(a, b) {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
  
    // Vérifier si les deux titres commencent par des chiffres
    const isNumA = !isNaN(titleA[0]);
    const isNumB = !isNaN(titleB[0]);
  
    // Si les deux titres commencent par des chiffres, les trier par ordre numérique décroissant
    if (isNumA && isNumB) {
      return parseInt(b.title) - parseInt(a.title);
    }
  
    // Si un des titres commence par un chiffre et l'autre par une lettre, placer le titre commençant par un chiffre avant
    if (isNumA) {
      return -1;
    }
    if (isNumB) {
      return 1;
    }
  
    // Si les deux titres commencent par des lettres, les trier par ordre alphabétique
    return titleA.localeCompare(titleB);
}
function tri (photographers, mediaPhotographer, e){
    let mediasPhotographerTri = Array.from(mediaPhotographer);
    if(e.currentTarget.id == 'Titre'){
         //trier les media
        mediasPhotographerTri.sort(customCompare);  
        console.log(mediasPhotographerTri)
    }
    if(e.currentTarget.id == 'Date'){
        // de la plus recente 
        mediasPhotographerTri.sort(function(a,b){
            return(Date.parse(b.date)-Date.parse(a.date))
        })
        console.log(mediasPhotographerTri)
    }
    console.log(mediasPhotographerTri)
    document.querySelector('section').remove();
    displayMedia(photographers, mediasPhotographerTri); 

}