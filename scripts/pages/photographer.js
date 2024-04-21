//Mettre le code JavaScript lié à la page photographer.html
//récupération de l'id du produit ajouté dans l'url 
import { Lightbox } from "../utils/lightbox";
import { TarifLikes, MediaFactory } from "../templates/Media";
import { getListeDOM, selectSortOption, tri } from "../templates/liste";
import { photographerTemplate } from "../templates/photographer";
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

//afficher la liste 
let sectionListeDOM = getListeDOM();
mainDOM.appendChild(sectionListeDOM);

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

async function displayMedia(photographers, mediaPhotographer){
    const sectionMedia = document.createElement('section');
    const photographer = photographers.find((photographer) => photographer.id === parseInt(Id));
    sectionMedia.classList.add = "section-media";

    mainDOM.appendChild(sectionMedia);
    const namePhotographer = photographer.name;
   
    mediaPhotographer.forEach((ElementMediaPhotographer) => {
        const mediaModel = new MediaFactory(ElementMediaPhotographer, namePhotographer, mediaPhotographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        sectionMedia.appendChild(mediaCardDOM);
    })
    //affichage de Tarif et somme likes
    const Tarif = photographer.price;
    const tarifLikes = new TarifLikes(mediaPhotographer, Tarif, namePhotographer);
    const divLikesTarif = tarifLikes.getTarifLikes()
    mainDOM.appendChild(divLikesTarif); 
    //actualiser la liste des links et afficher les lightbox
    let Links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    Lightbox.init(Links);

}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    const { media } = await getPhotographers();
    const mediaPhotographer = media.filter((medias)=>medias.photographerId === parseInt(Id));
    //liste par defaut afficher trier par ordre popularité 
    mediaPhotographer.sort(function(a,b){
        return(b.likes - a.likes)
    });
    displayMedia(photographers, mediaPhotographer);
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
    //gerer la liste de choix 
    
    const dateOption = document.getElementById("Date");
    dateOption.addEventListener('click', (e)=>{       
       tri(photographers, mediaPhotographer, e)    
    });
    const Titre = document.getElementById("Titre");
    Titre.addEventListener('click', (e)=>{
        console.log(e.currentTarget.id)
       tri(photographers, mediaPhotographer, e) 
    });
    const Popularite = document.getElementById("Popularite")
    Popularite.addEventListener('click', (e)=>{
         tri(photographers, mediaPhotographer, e)
    }) 
    document.querySelectorAll('#sortOptions li').forEach(li=> li.addEventListener('keydown', (e)=>{
        if(e.key == "Enter"){
            console.log(e.currentTarget.id)
            selectSortOption(e.currentTarget.id)
            tri(photographers,mediaPhotographer, e)
        }
    }))
    //Modal contact 
    const namePhotographer = document.querySelector(".photograph-header h2");
    const contactMoi = document.querySelector("#contact_modal h2");
    contactMoi.innerHTML=   `${contactMoi.textContent} </br> ${namePhotographer.textContent}` ;
    // je veux aussi modifier le style de h2  contact
}
export {displayMedia, Id}
init();
