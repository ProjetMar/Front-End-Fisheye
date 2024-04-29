// eslint-disable-next-line no-unused-vars
class MediaFactory {
    constructor(data, namePhotographer){
        if (Object.hasOwn(data, 'image')){
            return new MediaImage (data, namePhotographer)
        }else if((Object.hasOwn(data, 'video'))){
            return new MediaVideo (data, namePhotographer)
        }
    }
}

class MediaPrincipale{
    constructor(data, namePhotographer){
        this.title = data.title;
        this.originalLikes = data.likes;
        this.id = data.id;
        this.namePhotographer = namePhotographer;

        if (window.localStorage.getItem(this.title) !== null) {
            this.currentLikes = window.localStorage.getItem(this.title);
        }
        else{
            this.currentLikes = this.originalLikes;
        }
    }
    template(idTemplate){
        const template = document.getElementById(idTemplate);
        const clone = document.importNode(template.content,true);
        return(clone)
    }
    incrementLikes(e){
        e.preventDefault();
        const SommeLikesElement = document.querySelector('.Somme-like p'); 
        const selectedElement = document.querySelector("article[id='" + this.id + "']" + " .Likes-media p");

        if(this.currentLikes == this.originalLikes ){
            this.currentLikes++;
            selectedElement.textContent =this.currentLikes;
            SommeLikesElement.textContent = parseInt(SommeLikesElement.textContent) + 1;
               
            window.localStorage.setItem(this.title, selectedElement.textContent);
            window.localStorage.setItem(this.namePhotographer, SommeLikesElement.textContent);
        }
    }
}
class MediaImage extends MediaPrincipale{
    constructor(data, namePhotographer){
        super(data, namePhotographer);
        this.image = data.image;
    }
    get picture(){
        return `assets/images/${this.namePhotographer.split(' ')[0].replace('-',' ')}/${this.image}`
    }
    getMediaCardDOM(){
        const clone = this.template("CardImageMedia");
        clone.querySelector('article').setAttribute('id', this.id);

        const a = clone.querySelector('a');
        a.setAttribute("href",this.title +'&' + this.picture);
        a.setAttribute("aria-label", `ouvrir le lightbox pour ${this.title}`)

        const img = clone.querySelector(".media-card-img");
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.title);

        const p = clone.querySelector(".TitleLike-media").firstElementChild;
        p.textContent = this.title;

        const pNumbreLike = clone.querySelector(".Likes-media").firstElementChild;
        pNumbreLike.textContent = this.currentLikes;
        
        clone.querySelector('span').setAttribute("aria-label", `ajouter un like à ${this.title}`)
        clone.querySelector('span').addEventListener('click', this.incrementLikes.bind(this))
        return(clone)
    }   
}
///////////////////////
// class MediaVideo////////////
//////////
class MediaVideo extends MediaPrincipale{
    constructor(data, namePhotographer){
        super(data, namePhotographer);
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
        clone.querySelector('article').setAttribute('id', this.id);

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
        pNumbreLike.textContent = this.currentLikes;
        
        clone.querySelector('span').setAttribute("aria-label", `ajouter un like à ${this.title}`)
        clone.querySelector('span').addEventListener('click', this.incrementLikes.bind(this))
        return(clone)
    }
}
// eslint-disable-next-line no-unused-vars
class TarifAndLikesInsert{
    constructor(mediaPhotographer, tarif, namePhotographer){
        this.mediaPhotographer=mediaPhotographer;
        this.orginalSommeLike = this.sommeLike;
        this.tarif = tarif;
        if (window.localStorage.getItem(namePhotographer) !== null){
            this.curentSommeLike = window.localStorage.getItem(namePhotographer)
        }else{
            this.curentSommeLike = this.orginalSommeLike;
        }
        
    }
    get sommeLike(){
        let Somme = 0
        this.mediaPhotographer.forEach((media)=>
        {
            Somme+=media.likes;
        });
        return(Somme)
    }
    template(idTemplate){
        const template = document.getElementById(idTemplate);
        const clone = document.importNode(template.content,true);
        return(clone)
    }
    getInsertCardDom(){
        const clone = this.template("TarifLikesSomme");

        const pSommeLike = clone.querySelector('.Somme-like p');
        pSommeLike.textContent = this.curentSommeLike;

        const pTarif = clone.querySelector('.tarifParJour');
        pTarif.textContent = `${this.tarif}€ / jour`;
        
        return(clone)
    }
    // incrementSomme(){
    //     return(document.querySelector('.Somme-like p').textContent = this.curentSommeLike)
    // }
}
