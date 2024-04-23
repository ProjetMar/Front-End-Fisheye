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

// eslint-disable-next-line no-unused-vars
class PhotographerPage
{
    constructor(photographer, mediaPhotographer){
        this.photographer = photographer;
        this.mediaPhotographer = mediaPhotographer;
        this.typeSorting = "Popularite";
    }

    sortMedia(){
        let mediasPhotographerSorted = Array.from(this.mediaPhotographer);
        if(this.typeSorting == 'Popularite'){
            mediasPhotographerSorted.sort(function(a,b){
                return(b.likes - a.likes)
            });
        }
        else if(this.typeSorting == 'Titre'){
            mediasPhotographerSorted.sort(function(a,b){
                return(a.title.localeCompare(b.title))
            });
        }
        else if(this.typeSorting == 'Date'){
            mediasPhotographerSorted.sort(function(a,b){
                return(Date.parse(b.date)-Date.parse(a.date))
            })
        }
        if (document.querySelector('section') !== null){
            document.querySelector('section').remove();
        }
        this.displayMedia(mediasPhotographerSorted); 
    }

    displayMedia(mediaPhotographer){
        const sectionMedia = document.createElement('section');
        sectionMedia.classList.add = "section-media";
    
        mainDOM.appendChild(sectionMedia);
        const namePhotographer = this.photographer.name;
       
        mediaPhotographer.forEach((ElementMediaPhotographer) => {
            const mediaModel = new MediaFactory(ElementMediaPhotographer, namePhotographer);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            sectionMedia.appendChild(mediaCardDOM);
        })
        //affichage de Tarif et somme likes
        const Tarif = this.photographer.price;
        const tarifAndLikesInsert = new TarifAndLikesInsert(mediaPhotographer, Tarif, namePhotographer);
        const divLikesTarif = tarifAndLikesInsert.getInsertCardDom()
        mainDOM.appendChild(divLikesTarif); 
        //actualiser la liste des links et afficher les lightbox
        let Links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
        Lightbox.init(Links);
    }

    displayData(){
        const photographersSection = document.querySelector(".photograph-header");
        const photographContactBouton = document.querySelector(".contact_button");
        
        const photographerModel = new photographerTemplate(this.photographer);
    
        const userInfoDOM = photographerModel.getUserHeaderInfDOM(); 
        photographersSection.insertBefore(userInfoDOM, photographContactBouton);
    
        const userImgDOM = photographerModel.getUserHeaderImgDOM();
        photographersSection.appendChild(userImgDOM);
    }
}

/*global getListeDOM, photographerTemplate, MediaFactory, TarifAndLikesInsert, Lightbox, selectSortOption, tri*/
/*eslint no-undef: "error"*/
let sectionListeDOM = getListeDOM();
mainDOM.appendChild(sectionListeDOM);

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
    const tarifAndLikesInsert = new TarifAndLikesInsert(mediaPhotographer, Tarif, namePhotographer);
    const divLikesTarif = tarifAndLikesInsert.getInsertCardDom()
    mainDOM.appendChild(divLikesTarif); 
    //actualiser la liste des links et afficher les lightbox
    let Links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    Lightbox.init(Links);

}*/

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    const photographer = photographers.find((photographer) => photographer.id === parseInt(Id));
    const mediaPhotographer = media.filter((medias)=>medias.photographerId === parseInt(Id));
    
    const phptographerPage  = new PhotographerPage(photographer, mediaPhotographer);
    phptographerPage.displayData();
    phptographerPage.sortMedia();


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


    document.querySelectorAll('#sortOptions li').forEach(li=> li.addEventListener('click', (e)=>{
        phptographerPage.typeSorting = e.currentTarget.id;
        phptographerPage.sortMedia(); 
    }))

    document.querySelectorAll('#sortOptions li').forEach(li=> li.addEventListener('keydown', (e)=>{
        if(e.key == "Enter"){
            console.log(e.currentTarget.id)
            selectSortOption(e.currentTarget.id)
            phptographerPage.typeSorting = e.currentTarget.id;
            phptographerPage.sortMedia(); 
            //tri(photographers,mediaPhotographer, e)
        }
    }))
    //Modal contact 
    const namePhotographer = document.querySelector(".photograph-header h2");
    const contactMoi = document.querySelector("#contact_modal h2");
    contactMoi.innerHTML=   `${contactMoi.textContent} </br> ${namePhotographer.textContent}` ;
    // je veux aussi modifier le style de h2  contact
}
// eslint-disable-next-line no-unused-vars
init();
