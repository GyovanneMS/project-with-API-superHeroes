'use strict'

// import { heroAPI } from "./api.js"

// const cardCreator = (item) => {
//     const card = document.createElement('a')
//     card.classList.add('card-heros')
//     card.href = '../pages/heropage.html'
//     card.setAttribute('id, item.hero')
//     card.innerHTML = `
//     <img class="hero-icon" src="${item.foto}">
//     <p>${item.nome}</p>
//     ` 
    
// }

class card extends HTMLElement {
    constructor () {
        super();
        this.shadow  = this.attachShadow({mode:'open'});
        this.image = 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/girafa-caracteristicas-e-comportamento-da-especie-1.jpg';
        this.nome = 'Nome do Aluno';
        this.bgcolor = 'green';
        this.infos = 'Nothing';
    }
    static get observedAttributes() {
        return ['image', 'nome', 'bgcolor', 'nomeCompleto']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue){
        this[nameAttr] = newValue
    }

        // if(name == 'nome'){
        //     this.nome = newValue
        // } else if (name == 'bgcolor'){
        //     this.bgcolor = newValue
        // }


    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles(){
        const style = document.createElement('style');
        style.textContent = `
            .card{
                width: 375px;
                height: 330px;
                background-color: ${this.bgcolor};
                display: grid;
                grid-template-rows: 20% 60% 20%;
                place-items: center;
            }
            .card__image{
                width: 100%;
                background-image: url(${this.image});
                background-size: cover;
                backgorund-color: cyan;
                background-position: center;
            }
            .card__nome{
                color: black;
                font-size: 3rem;
            }
            .card__infos{
                color: black;
            }
        `
        return style
    }

    component() {
        const card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
            <div class="card__image"></div>
            <div class="card__nome"> ${this.nome} </div>
            <div class="card__infos">${this.infos}</div>
        `
        return card
    }
}

customElements.define('card-aluno', card)
