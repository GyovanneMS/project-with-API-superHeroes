'use strict'


import './heroCards.js' 
import { heroRandom, heroAll } from './api.js'


const cardHeros = (object) => {
    const heros = object;
    const card = document.createElement('card-aluno');
    card.image = heros.images.sm;
    card.nome = heros.name;
    card.studio = heros.biography.publisher;
    card.infos = heros.biography.fullName;
    card.bgcolor = mudarCor(object.biography.publisher);
    return card;
}

const mudarCor = (objectStudio) => {
    let studio = objectStudio;

    if(studio == "Marvel Comics"){
        return '#ED1D24';
    } else if ( studio == "DC Comics"){
        return '#0277FB';
    } else if (studio == "Shueisha"){
        return '#FFFF00';
    } else if (studio == "NBC - Heroes"){
        return '#622162';
    } else if (studio == "George Lucas"){
        return '#ffbf00'
    } else if (studio == "Star Trek"){
        return '#f1af09'
    } else if (studio == "ABC studios"){
        return '#008b8b'
    } else if (studio == "IDW Publishing"){
        return '#0000ae'
    } else if (studio == "SyFy"){
        return '#7529ef'
    }
    
    else {
        return 'green'
    }
}

const showCards = async () => {
    const conteiner = document.querySelector('main');
    let card = await heroAll();
 
    let cardsShow = await card.map(cardHeros)


    conteiner.replaceChildren(...cardsShow);
}

showCards()