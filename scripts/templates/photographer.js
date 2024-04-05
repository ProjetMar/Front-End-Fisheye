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

    getUserCardDOM() {
        // const article = document.createElement( 'article' );
        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture)
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        // article.appendChild(img);
        // article.appendChild(h2);
        // return (article);
        const template = document.getElementById('template');
        const clone = document.importNode(template.content,true);

        const img = clone.querySelector('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.name);

        const h2 = clone.querySelector('h2');
        h2.textContent = this.name;
        
        const lien = clone.querySelector( 'a' );
        lien.setAttribute("href", this.link);
        
        const pC = clone.querySelector('.cardCity');
        pC.textContent = `${this.city}, ${this.country}`; 

        const pT = clone.querySelector('.cardTagline');
        pT.textContent = this.tagline;

        const pP = clone.querySelector('.cardPrice');
        pP.textContent = `${this.price}€/jour`;

        return(clone)
    }
    
}