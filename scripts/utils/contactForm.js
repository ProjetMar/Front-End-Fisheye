// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }
console.log(Id);

const h2 = document.querySelector("#contact_modal h2");


console.log(h2);
const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const body = document.getElementById("body");
const modalCloseBtn = document.querySelector(".contact_button");
const modalOpenBtn = document.querySelector(".contact_button");

function displayModal() {
    main.setAttribute("aria-hidden",'true');
    modal.setAttribute("aria-hidden", 'false');
    body.classList.add('no-scroll');
	modal.style.display = "flex";
    

}

function closeModal() {
    main.setAttribute("aria-hidden",'false');
    modal.setAttribute("aria-hidden", 'true');
    body.classList.remove('no-scroll');
    modal.style.display = "none";
   
}
