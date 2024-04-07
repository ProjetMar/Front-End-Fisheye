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

const mainDOM = document.getElementById("main"); 

async function displayData(photographers){
    const photographersSection = document.querySelector(".photograph-header");
    const photographContactBouton = document.querySelector(".contact_button");
    
    const photographer = photographers.find((photographer) => photographer.id === parseInt(Id));
    const photographerModel = new photographerTemplate(photographer);

    const userInfoDOM = photographerModel.getUserHeaderInfDOM(); 
    photographersSection.insertBefore(userInfoDOM, photographContactBouton);

    const userImgDOM = photographerModel.getUserHeaderImgDOM();
    photographersSection.appendChild(userImgDOM);
}

async function displayMedia(photographers, media){

    const sectionMedia = document.createElement('section');
    const photographer = photographers.find((photographer) => photographer.id === parseInt(Id));
    sectionMedia.classList.add = "section-media";

    mainDOM.appendChild(sectionMedia);
    const mediaPhotographer = media.filter((medias)=>medias.photographerId === parseInt(Id));
    const namePhotographer = photographer.name;
    // const Tarif = photographer.price;
    console.log(mediaPhotographer);

    // let SommeLike = 0;
    // mediaPhotographer.forEach((media)=>
    // {
    //     SommeLike+=media.likes;
    // });
    // console.log("la somme des likes est" + SommeLike);

    mediaPhotographer.forEach((ElementMediaPhotographer) => {
        const mediaModel = new MediaFactory(ElementMediaPhotographer, namePhotographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        sectionMedia.appendChild(mediaCardDOM);
    })
    // mainDOM.appendChild(getTarifLikes(SommeLike,Tarif)); 
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    const { media } = await getPhotographers();
    displayMedia(photographers, media);
    let videoBlock = document.querySelector('.video-block');
    console.log(videoBlock);
    videoBlock.addEventListener('click',()=>{
        let video=document.querySelector('video');
        if (video.paused){
            video.play();
        }else{
            video.pause();
        }
    }); 
}

init();