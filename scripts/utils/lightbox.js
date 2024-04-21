
class Lightbox{
    static init(Links){
        const gallery = Links.map(link=>link.getAttribute('href'));
        Links
        .forEach(link=>link.addEventListener('click', e=>{
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
        // main.setAttribute("aria-hidden",'false');
        // document.querySelector('.lightbox').setAttribute("aria-hidden",'true');
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
        this.url = url;
    }
    buildDOM(){
        const template = document.getElementById("lightbox_modal");
        const clone = document.importNode(template.content,true);
        // je bind this pour que this à l'interieur de close face refercence à notre instance lightbox 
        // et non pas à l'element sur lequel on vient de cliqué
        // main.setAttribute("aria-hidden",'true');
        // clone.querySelector('.lightbox').setAttribute("aria-hidden", 'false');
        clone.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this));
        clone.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this));
        clone.querySelector('.lightbox_prev').addEventListener('click', this.prev.bind(this));
        return(clone)
        
    }
}
export {Lightbox}
//  lightbox.init()