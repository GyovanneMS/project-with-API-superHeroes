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
    card.setAttribute('id', `${object.id}`)
    card.classList = card.nome;
    card.onclick = abrir;
    return card;
}

const mudarCor = (objectStudio) => {
    let studio = objectStudio;

    if(studio == "Marvel Comics"){
        return 'ED1D24';
    } else if ( studio == "DC Comics"){
        return '0277FB';
    } else if (studio == "Shueisha"){
        return 'FFFF00';
    } else if (studio == "NBC - Heroes"){
        return '622162';
    } else if (studio == "George Lucas"){
        return 'ffbf00'
    } else if (studio == "Star Trek"){
        return 'f1af09'
    } else if (studio == "ABC studios"){
        return '008b8b'
    } else if (studio == "IDW Publishing"){
        return '0000ae'
    } else if (studio == "SyFy"){
        return '7529ef'
    }else if (studio == "Dark Horse Comics"){
        return 'D3D0B9'
    } else {
        return '008000'
    }
}

const abrir = (card) => {
    const idHero = card.currentTarget.id
    localStorage.setItem('idHero', idHero)
}

const filter = (item) => {
    const status = document.getElementById('studiosHeroes').value
    if (item.studio != status) {
        item.classList.add('hide')
    }
    else {
        item.classList.remove('hide')
    }
    return item
}

const filtro = async () => {
    const conteiner = document.querySelector('main');
    let card = await heroAll();
    let cardsShow = card.map(cardHeros);
    let cardsCertos = cardsShow.map(filter)
    conteiner.replaceChildren(...cardsCertos);
}

const get_random = (list) => {
    let random = [];
    let length = list.length;
    random.push(Math.floor((Math.random()*list.length)) + 1);
    return random;
}

const showCards = async () => {
    const conteiner = document.querySelector('main');
    let card = await heroAll();
    let randomCards = get_random(card);
    let cardsShow = await card.map(cardHeros)

    conteiner.replaceChildren(...cardsShow);
}

const search_hero = async () => {
    let palavra = await document.getElementById('buscarCard').value
    let heros = await heroAll()
    
    heros.forEach(element => {
        let hero = document.getElementsByClassName(`${element.name}`)
        if(!element.name.includes(palavra)){
            hero[0].classList.add('hide');
        } else {
            hero[0].classList.remove('hide')
        }
    });
    // nombre = nombre.toLowerCase();

    // let hero = document.getElementsByClassName('card');
    // hero.nome
    // if(hero.nome.toLowerCase() == nombre){
    //     hero.classList.add('hide');
    // } else {
    //     item.classList.remove('hide')
    // }
}

document.getElementById('studiosHeroes').addEventListener('change', filtro)
const handleKey = (event) => {
    if (event.key == 'Enter')
        search_hero()
}
document.getElementById('buscarCard').addEventListener('keypress', handleKey)
showCards()
