class photographerTemplate {
    constructor(data){
        this.portrait = data.portrait; 
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.name = data.name;
        this.id = data.id; 
    }
    get picture (){
        return(`assets/photographers/${this.portrait}`)
    }
    get link (){
        return(`./photographer.html?id=${this.id}`)
    }
    template(idTemplate){
        const template = document.getElementById(idTemplate);
        const clone = document.importNode(template.content,true);
        return(clone)
    }

    getUserCardDOM() {
        // const article = document.createElement( 'article' );
        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture)
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        // article.appendChild(img);
        // article.appendChild(h2);
        // return (article);
        let clone = this.template('templatePhotographer');

        const img = clone.querySelector('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.name);

        const h2 = clone.querySelector('h2');
        h2.textContent = this.name;
        
        const lien = clone.querySelector( 'a' );
        lien.setAttribute("href", this.link);
        
        const pC = clone.querySelector('.cartCity');
        pC.textContent = `${this.city}, ${this.country}`; 

        const pT = clone.querySelector('.cartTagline');
        pT.textContent = this.tagline;

        const pP = clone.querySelector('.cartPrice');
        pP.textContent = `${this.price}€/jour`;

        return(clone)
    }
    getUserHeaderImgDOM() {
         
        let clone = this.template('headerImage');

        const img = clone.querySelector('img');

        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.name);

        return(clone)
    }
    getUserHeaderInfDOM(){

        let clone = this.template('photographerInfo');

        const h2 = clone.querySelector('h2');
        h2.textContent = this.name;
        
        const pC = clone.querySelector('.cartCity');
        pC.textContent = `${this.city}, ${this.country}`; 

        const pT = clone.querySelector('.cartTagline');
        pT.textContent = this.tagline;

        return(clone)
    }
    
}