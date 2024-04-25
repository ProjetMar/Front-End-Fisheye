
// eslint-disable-next-line no-unused-vars
class Lightbox{
    static init(Links){
        const gallery = Links.map(link=>link.getAttribute('href'));
        Links.forEach(link=>link.addEventListener('click', e=>{
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('href'), gallery);
        }))
    }
   constructor(url, medias){
       this.medias = medias;
       this.element = this.buildDOM(url);
       this.loadImage(url);
       this.onekeyUp = this.onekeyUp.bind(this);
       document.body.appendChild(this.element);
       document.addEventListener('keyup', this.onekeyUp);
       this.element = document.querySelector('.lightbox');
    }
    preventOutsideNavigation(event) {
        const lightbox = document.querySelector('.lightbox');
        // Vérifier si la touche "Tab" est pressée
        if (event.key === "Tab") {
          // Empêcher le déplacement du focus en dehors du modal
          if (!lightbox.contains(document.activeElement)) {
            event.preventDefault();
            //ajout focus à la premier input du modal
            document.querySelector('.lightbox_close').focus();
          }
        }
      
    }
    onekeyUp (e){
        if(e.key == 'Escape'){
            this.close(e)
        }else if(e.key == 'ArrowLeft'){
            this.prev(e)
        }else if(e.key == 'ArrowRight'){
            this.next(e)
        }
    }
    close(e){
        e.preventDefault()
        document.querySelector('.lightbox').classList.add("fadOut");
        //permet de supprimer la lightbox quand on a cree pour qu'on puisse creer une autre au moment 
        // de click sur autre media
        window.setTimeout(()=>{
            document.querySelector('.lightbox').parentElement.removeChild(document.querySelector('.lightbox'))
        }, 500) 
        document.removeEventListener('keyup', this.onekeyUp)
        document.removeEventListener("keydown", this.preventOutsideNavigation); 
    }
    next(e){
        e.preventDefault(e);
        // chercher l'index de l'image presser 
        let media = this.medias.findIndex(media=> media == this.url);
        if (media === this.medias.length - 1) {
            media = -1
        }
        this.loadImage(this.medias[media + 1])
        
    }
    prev(e){
        e.preventDefault()
        let media = this.medias.findIndex(media => media === this.url)
        if (media === 0) {
            media = this.medias.length
        }
        this.loadImage(this.medias[media - 1])
    }
    loadImage(url){
        this.url = null;
        let container =this.element.querySelector('.lightbox_container');
        container.innerHTML = ''
        const p = document.createElement('p');
        if (url.endsWith('.jpg')){
            const img = document.createElement('img');
            img.setAttribute("src", `../../${url.split('&')[1]}`);
            img.setAttribute("alt", url.split('&')[0]);
            container.appendChild(img)
        }else{
            const video = document.createElement('video');
            video.setAttribute("src", `../../${url.split('&')[1]}`);
            video.setAttribute("type", "video/mp4");
            video.controls= true;
            container.appendChild(video);
        }
    
        p.textContent = url.split('&')[0];
        container.appendChild(p);
        // il faut connaitre l'url qui est chargé donc on doit la conserver pour l'utiliser au moment 
        //clique sur suivant ou precedent 
        document.addEventListener("keydown", this.preventOutsideNavigation);
        this.url = url;
    }
    buildDOM(){
        const template = document.getElementById("lightbox_modal");
        const clone = document.importNode(template.content,true);
        
        // je bind this pour que this à l'interieur de close face refercence à notre instance lightbox 
        clone.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this));
        clone.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this));
        clone.querySelector('.lightbox_prev').addEventListener('click', this.prev.bind(this));
        return(clone)
        
    }
}