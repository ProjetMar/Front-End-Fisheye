function photographerTemplate(data) {
    const { name, portrait, city,country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
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
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = clone.querySelector('h2');
        h2.textContent = name;
        const pC = clone.querySelector('.cardCity');
        pC.textContent = `${city}, ${country}`; 
        const pT = clone.querySelector('.cardTagline');
        pT.textContent = tagline;
        const pP = clone.querySelector('.cardPrice');
        pP.textContent = `${price}€/jour`;
        return(clone)
    }
    return { name, picture, getUserCardDOM }
}