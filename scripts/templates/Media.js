class MediaFactory {
    constructor(data, namePhotographer,  mediaPhotographer){
        if (Object.hasOwn(data, 'image')){
            return new MediaImage (data, namePhotographer, mediaPhotographer)
        }else if((Object.hasOwn(data, 'video'))){
            return new MediaVideo (data, namePhotographer,  mediaPhotographer)
        }
    }
}
class MediaPrincipale{
    constructor(data, namePhotographer ,  mediaPhotographer, nbrLikes){
        this. mediaPhotographer =  mediaPhotographer
        this.title = data.title;
        this.likes = data.likes;
        // this.video = data.video;
        this.namePhotographer = namePhotographer;
        // this.element = this.getMediaCardDOM;
        this.likesModif(mediaPhotographer, nbrLikes);
        if (window.localStorage.getItem(this.title) !== null) {
            console.log(this.likes)
            console.log(window.localStorage.getItem(this.title))
            this.likes = window.localStorage.getItem(this.title);
            console.log(this.likes)
        }
    }
    template(idTemplate){
        const template = document.getElementById(idTemplate);
        const clone = document.importNode(template.content,true);
        return(clone)
    }
    plusLikes(e){
        e.preventDefault();
        // creer une map cle titre des media et valeur les likes 
        let mapTitreLikes = new Map();
        this.mediaPhotographer.forEach(element=>{
            mapTitreLikes.set(element.title, element.likes)
        });
        //recuperer le titre de l'element liké <p>titre</p>
        let titreElement = e.currentTarget.parentNode.parentNode.firstElementChild;
        //recuperer le nbre de likes de l'element cliqué en string exp'22'
        let likesActuel = e.currentTarget.previousElementSibling.textContent;
        //recuperer le media qui a ete like par leur titre et applique
        // la modification par la fonction likesModif si le nbrLikes n'a pas ete changer
        if (mapTitreLikes.get(titreElement.textContent) == parseInt(likesActuel)){
            let media = this. mediaPhotographer.findIndex(media=> media.title == titreElement.textContent);
            this.likesModif(this.mediaPhotographer[media], likesActuel)
        }
    }
    likesModif(media,likesActuel){
        const SommeLikesElement = document.querySelector('.Somme-like p');
        console.log(SommeLikesElement)
        document.querySelectorAll(".Likes-media p").forEach(element => {
            if(element.parentNode.parentNode.firstElementChild.textContent == media.title){
                console.log(element)
                element.textContent =parseInt (likesActuel) + 1;
                window.localStorage.setItem(media.title, element.textContent);
                SommeLikesElement.textContent = parseInt(SommeLikesElement.textContent) + 1;
                window.localStorage.setItem(this.namePhotographer, SommeLikesElement.textContent);
            }        
        });
    }
}
class MediaImage extends MediaPrincipale{
    constructor(data, namePhotographer ,  mediaPhotographer, nbrLikes){
        super(data, namePhotographer ,  mediaPhotographer, nbrLikes);
        this.image = data.image;
    }
    get picture(){
        return `assets/images/${this.namePhotographer.split(' ')[0].replace('-',' ')}/${this.image}`
    }
    getMediaCardDOM(){
        const clone = this.template("CardImageMedia");

        const a = clone.querySelector('a');
        a.setAttribute("href",this.title +'&' + this.picture);

        const img = clone.querySelector(".media-card-img");
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.title);

        const p = clone.querySelector(".TitleLike-media").firstElementChild;
        p.textContent = this.title;

        const pNumbreLike = clone.querySelector(".Likes-media").firstElementChild;
        pNumbreLike.textContent = this.likes;

        clone.querySelector('span').addEventListener('click', this.plusLikes.bind(this))
        return(clone)
    }   
}
///////////////////////
// class MediaVideo////////////
//////////
class MediaVideo extends MediaPrincipale{
    constructor(data, namePhotographer ,  mediaPhotographer, nbrLikes){
        super(data, namePhotographer ,  mediaPhotographer, nbrLikes);
        this.video = data.video
    }
    get picture(){
        return `assets/images/${this.namePhotographer.split(' ')[0].replace('-',' ')}/${this.video}`
    }
    get vigetteVideo(){
        return`${this.picture.replace('.mp4','.jpg')}`
    }
    getMediaCardDOM(){
        const clone = this.template("CardVideoMedia");

        const a = clone.querySelector('a');
        a.setAttribute("href",this.title +'&' + this.picture);

        const img = clone.querySelector("img");
        img.setAttribute("src", this.vigetteVideo);
        img.setAttribute("alt", `vignette de la video ${this.title}`);

        const video = clone.querySelector("video");
        video.setAttribute("src", this.picture);

        const p = clone.querySelector(".TitleLike-media p");
        p.textContent = this.title;

        const pNumbreLike = clone.querySelector(".Likes-media p");
        pNumbreLike.textContent = this.likes;
        
        clone.querySelector('span').addEventListener('click', this.plusLikes.bind(this))
        return(clone)
    }
}
class TarifLikes{
    constructor(SommeLike, tarif, namePhotographer){
        this.SommeLike = SommeLike;
        this.tarif = tarif;
        if (window.localStorage.getItem(namePhotographer) !== null){
            this.SommeLike = window.localStorage.getItem(namePhotographer)
        }
    }
    template(idTemplate){
        const template = document.getElementById(idTemplate);
        const clone = document.importNode(template.content,true);
        return(clone)
    }
    getTarifLikes(){
        const clone = this.template("TarifLikesSomme");

        const pSommeLike = clone.querySelector('.Somme-like p');
        pSommeLike.textContent = this.SommeLike;

        const pTarif = clone.querySelector('.tarifParJour');
        pTarif.textContent = `${this.tarif}€ / jour`;
        
        return(clone)
    }
}
