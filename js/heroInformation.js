'use strict'

import {heroById, heroPowerStars, heroConnections, heroAll} from './api.js';
import './heroCards.js' 

const id = async (object) => {
    const json = await heroById(object);
    return json
}

const cardHeros = async (object) => {
    const heros = object;
    const hero = await id(heros);
    const card = document.createElement('card-aluno');
    card.image = hero.images.sm;
    card.nome = hero.name;
    card.studio = hero.biography.publisher;
    card.infos = hero.biography.fullName;
    card.bgcolor = mudarCor(hero.biography.publisher);
    card.setAttribute('id', `${object.id}`)
    card.classList = card.nome;
    card.onclick = abrir;
    return card;
}

const abrir = (card) => {
    const idHero = card.currentTarget.id
    localStorage.setItem('idHero', idHero)
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

const normalInfos = (valorNota) => {
    let heroi = valorNota;

    let divNota = document.createElement('div');

    divNota.innerHTML = `
    <img src="${heroi.images.lg}" alt="" class="hero-img">
    <div class="info-strings">
        <p class="name">${heroi.name}</p> 
        <div class="more-infos">
            <div class="nationaly">
                <p class="raca">Raça: ${heroi.appearance.race}</p>
                <p class="genero">Gênero: ${heroi.appearance.gender}</p>
            </div>
            <div class="body-type">
                <p class="altura">Altura: ${heroi.appearance.height[1]}</p>
                <p class="peso">Peso: ${heroi.appearance.weight[1]}</p>
            </div>
        </div>
    </div>`
    
    return divNota
}

const powers = (valorPower) => {
    let divValue = document.createElement('div');
    let power = valorPower;
    divValue.classList.add('SuperPower')
    divValue.innerHTML = `
    <div class="inteligence value">
        <div class='valorStats numeroStats'>${valorPower.intelligence}</div>
        <progress value="${valorPower.intelligence}" max=100></progress>
        <div class='valorStats'>Intelligence</div>
    </div>
    <div class="strength  value">
        <div class='valorStats numeroStats'>${valorPower.strength}</div>
        <progress value="${valorPower.strength}" max=100></progress>
        <div class='valorStats'>Strength</div>
    </div> 
    <div class="speed value">
        <div class='valorStats numeroStats'>${valorPower.speed}</div>
        <progress value="${valorPower.speed}" max=100></progress>
        <div class='valorStats'>Speed</div>
    </div> 
    <div class="durability value">
        <div class='valorStats numeroStats'>${valorPower.durability}</div>
        <progress value="${valorPower.durability}" max=100></progress>
        <div class='valorStats'>Durability</div>
    </div> 
    <div class="power value">
        <div class='valorStats numeroStats'>${valorPower.power}</div>
        <progress value="${valorPower.power}" max=100></progress>
        <div class='valorStats'>Power</div>
    </div> 
    <div class="combat value">
        <div class='valorStats numeroStats'>${valorPower.combat}</div>
        <progress value="${valorPower.combat}" max=100></progress>
        <div class='valorStats'>Combat</div>
    </div> `
    return divValue
}

const connectons = (Object, array, idHeroi) => {
    let connectons = Object.groupAffiliation;
    let arrayConnection = connectons.split(', ');
    let allConections = [];
    console.log(connectons);
    array.forEach(element => {
        let connections = element.connections.groupAffiliation.split(', ');
        connections.forEach(item => {
            arrayConnection.forEach(conexao => {
                if(item == conexao){
                    if (element.id != idHeroi) {
                        allConections.push(element.id);
                    }
                }
            })
        });
    });

    return allConections;
};

const heroInfos = async () => {
    let divNormalInfo = document.querySelector('.normal-infos')
    let divStats = document.querySelector('.grafics')
    let divFriends = document.querySelector('.friends')
    let idHero = localStorage.getItem('idHero')
    console.log(idHero);
    let heroBodyJson = await heroById(idHero)
    let heroPowersJson = await heroPowerStars(idHero)
    let heroConnectionsJson = await heroConnections(idHero)

    let bodyHero = normalInfos(heroBodyJson)
    let powerHero = powers(heroPowersJson)
    let allHeros = await heroAll();
    let heroConnection = connectons(heroConnectionsJson, allHeros, idHero)
    let cardsShow = await Promise.all(heroConnection.map(cardHeros))
    console.log(cardsShow);
    const cardsShowSpliced = cardsShow.splice(0, 4);
    console.log(cardsShowSpliced);
    divNormalInfo.append(bodyHero) 
    divStats.append(powerHero)

    divFriends.replaceChildren(...cardsShowSpliced)


    // let mA = matriculaAluno.map(nota)
    // divCorNotas.append(...mA)
    // divLocalNotas.append(divCorNotas)
}

heroInfos()