class MediaFactory {
    constructor(data, namePhotographer){
        if (Object.hasOwn(data, 'image')){
            return new MediaImage (data, namePhotographer)
        }else if((Object.hasOwn(data, 'video'))){
            return new MediaVideo (data, namePhotographer)
        }
    }
}
class MediaImage {
    constructor(data, namePhotographer){
        this.title = data.title;
        this.likes = data.likes;
        this.image = data.image;
        this.namePhotographer = namePhotographer;  
    }
    get picture(){
        return `assets/images/${this.namePhotographer.split(' ')[0].replace('-',' ')}/${this.image}`
    }
    template(idTemplate){
        const template = document.getElementById(idTemplate);
        const clone = document.importNode(template.content,true);
        return(clone)
    }
    getMediaCardDOM(){
        const clone = this.template("CardImageMedia");

        const img = clone.querySelector(".media-card-img");
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.title);

        const p = clone.querySelector(".TitleLike-media").firstElementChild;
        p.textContent = this.title;

        const pNumbreLike = clone.querySelector(".Likes-media").firstElementChild;
        pNumbreLike.textContent = this.likes;

        return(clone)
    }
}

class MediaVideo {
    constructor(data, namePhotographer){
        this.title = data.title;
        this.likes = data.likes;
        this.video = data.video;
        this.namePhotographer = namePhotographer;
    }
    get picture(){
        return `assets/images/${this.namePhotographer.split(' ')[0].replace('-',' ')}/${this.video}`
    }
    get vigetteVideo(){
        return`${this.picture.replace('.mp4','.jpg')}`
    }
    template(idTemplate){
        const template = document.getElementById(idTemplate);
        const clone = document.importNode(template.content,true);
        return(clone)
    }
    getMediaCardDOM(){
        const clone = this.template("CardVideoMedia");

        const img = clone.querySelector("img");
        img.setAttribute("src", this.vigetteVideo);
        img.setAttribute("alt", `vignette de la video ${this.title}`);

        const video = clone.querySelector("video");
        video.setAttribute("src", this.picture);

        const p = clone.querySelector(".TitleLike-media p");
        p.textContent = this.title;

        const pNumbreLike = clone.querySelector(".Likes-media p");
        pNumbreLike.textContent = this.likes;

        return(clone)
    }
}
class TarifLikes{
    constructor(SommeLike, tarif){
        this.SommeLike = SommeLike;
        this.tarif = tarif;
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
