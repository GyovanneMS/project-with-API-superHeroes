'use strict'

import {heroById, heroPowerStars} from './api.js'

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

const heroInfos = async () => {
    let divNormalInfo = document.querySelector('.normal-infos')
    let divStats = document.querySelector('.grafics')
    let idHero = localStorage.getItem('idHero')
    
    let heroBodyJson = await heroById(idHero)
    let heroPowersJson = await heroPowerStars(idHero)
    console.log(heroPowersJson);
    let bodyHero = normalInfos(heroBodyJson)
    let powerHero = powers(heroPowersJson)
    console.log(powerHero);
    divNormalInfo.append(bodyHero)
    divStats.append(powerHero)
    // let mA = matriculaAluno.map(nota)
    // divCorNotas.append(...mA)
    // divLocalNotas.append(divCorNotas)
}

heroInfos()