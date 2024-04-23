// eslint-disable-next-line no-unused-vars
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
        let clone = this.template('templatePhotographer');

        const img = clone.querySelector('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.name);

        const h2 = clone.querySelector('h2');
        h2.textContent = this.name;
        
        const linkElement = clone.querySelector( 'a' );
        linkElement.setAttribute("href", this.link);
        linkElement.setAttribute("ARIA-label", `plus d'information sur ${this.name}`)
        
        const cartCity = clone.querySelector('.cartCity');
        cartCity.textContent = `${this.city}, ${this.country}`; 

        const cartTagLine = clone.querySelector('.cartTagline');
        cartTagLine.textContent = this.tagline;

        const cartPrice = clone.querySelector('.cartPrice');
        cartPrice.textContent = `${this.price}€/jour`;

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
        
        const cartCity = clone.querySelector('.cartCity');
        cartCity.textContent = `${this.city}, ${this.country}`; 

        const cartTagline = clone.querySelector('.cartTagline');
        cartTagline.textContent = this.tagline;

        return(clone)
    }
    
}
// export {photographerTemplate}