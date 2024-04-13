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
    // const mediaPhotographer = media.filter((medias)=>medias.photographerId === parseInt(Id));
    const namePhotographer = photographer.name;
   
    mediaPhotographer.forEach((ElementMediaPhotographer) => {
        const mediaModel = new MediaFactory(ElementMediaPhotographer, namePhotographer, mediaPhotographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        sectionMedia.appendChild(mediaCardDOM);
    })
    //affichage de Tarif et somme likes
    const Tarif = photographer.price;
    let SommeLike = 0;
    mediaPhotographer.forEach((media)=>
    {
        SommeLike+=media.likes;
    });
    console.log("la somme des likes est" + SommeLike);
    const tarifLikes = new TarifLikes(Tarif, SommeLike);
    const divLikesTarif = tarifLikes.getTarifLikes()
    mainDOM.appendChild(divLikesTarif); 

}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    const { media } = await getPhotographers();
    const mediaPhotographer = media.filter((medias)=>medias.photographerId === parseInt(Id));
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
    // gerer la liste de choix 
    const Date = document.getElementById("Date");
    Date.addEventListener('click', ()=>{
        if (Date.getAttribute("aria-selected") == "true"){    
            let mediasPhotographerTri = Array.from(mediaPhotographer);
            mediasPhotographerTri.sort(function(a,b){
                let JJa = a.date.split('-')[2];
                let JJb = b.date.split('-')[2];
                return (parseInt(JJa)-parseInt(JJb))
            })
            mediasPhotographerTri.sort(function(a,b){
                let MMa = a.date.split('-')[1];
                let MMb = b.date.split('-')[1];
                return (parseInt(MMa)-parseInt(MMb))
            })
            mediasPhotographerTri.sort(function(a,b){
                let AAAAa = a.date.split('-')[0];
                let AAAAb = b.date.split('-')[0];
                return(parseInt(AAAAa)- parseInt(AAAAb))
            })
        
            console.log(mediasPhotographerTri)
            document.querySelector('section').remove();
           displayMedia(photographers, mediasPhotographerTri);
        }
    });
    const Titre = document.getElementById("Titre");
    Titre.addEventListener('click', ()=>{
        let mediasPhotographerTri = Array.from(mediaPhotographer);
            mediasPhotographerTri.sort(function(a,b){
                if (isNaN(b.title.substr(0,1)) == false){
                     return (1)
                }else if(isNaN(a.title.substr(0,1)) == false){
                    return(-1)
                }else{
                    return(0)
                }
                //a.title.localeCompare(b.titre)
            })
            mediasPhotographerTri.sort(function(a,b){
                if(isNaN(b.title.substr(0,1)) == true && isNaN(a.title.substr(0,1)) == true){
                    return(a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
                }
            })

        console.log(mediasPhotographerTri)
        document.querySelector('section').remove();
        displayMedia(photographers, mediasPhotographerTri);  
    });
    const Popularite = document.getElementById("Popularite")
    Popularite.addEventListener('click', ()=>{
        document.querySelector('section').remove();
        displayMedia(photographers, mediaPhotographer);  
    })
    // j'ai transformer ls query en tableau pour naviger entre les media 
    const Links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    lightbox.init(Links);
    // const Lightbox = document.querySelector(".lightbox");
    
}

init();