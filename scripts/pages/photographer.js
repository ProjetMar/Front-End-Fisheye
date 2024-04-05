//Mettre le code JavaScript lié à la page photographer.html
//récupération de l'id du produit ajouté dans l'url 
let paramsString = window.location.search;
let searchParams = new URLSearchParams (paramsString);
const Id = searchParams.get ("id");
console.log(Id) ;
async function getPhotographers() {
    const reponse = await fetch ("./data/photographers.json");
    const photographers = await reponse.json();
    return(photographers);
}
async function displayData(photographers){
    const photographer = photographers.find((photographer) => photographer.id === parseInt(Id));
    return(photographer)
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    console.log(displayData(photographers));
}

init();