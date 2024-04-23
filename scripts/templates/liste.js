
// eslint-disable-next-line no-unused-vars
function getListeDOM(){
    const template = document.getElementById('templateListe');
    const clone = document.importNode(template.content,true);
    return(clone)
}


//gerer la liste
// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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
