'use strict'

// import { heroAPI } from "./api.js"

// const createData = () => {
//     const main = document.querySelector('main')
//     const profile = document.createElement('div');
//     profile.innerHTML = `
//         <img src="${heroAPI.image.md}" alt="${heroAPI.name}" class="image-hero">
//         <span class="hero-name">${heroAPI.name}</span>
//     `;
//     main.appendChild(profile)
// }
// createData()

// showCards()
//import './card-aluno.js' 
import { heroRandom } from './api.js'


const cardHeros = (object) => {
    const heros = object;
    const card = document.createElement('card-aluno');
    card.image = heros.images.md;
    card.nome = heros.name;
    card.infos = heros.biography.fullName;
    card.bgcolor = mudarCor(object.biography.publisher);
    console.log(`${card.image} ${card.nome} ${card.infos} ${card.bgcolor}`);
    return card;
}

const mudarCor = (objectStudio) => {
    let studio = objectStudio;

    if(studio == "Marvel Comics"){
        return '#ED1D24';
    } else if ( studio == "DC Comics"){
        return '#0277FB';
    } else if (studio == "Shueisha"){
        return '#800000';
    }
}

const showCards = async () => {
    const conteiner = document.querySelector('main');
    let card = await heroRandom();
    console.log(card);
    let cardsShow = cardHeros(card);

    conteiner.replaceChildren(cardsShow);
}

showCards()