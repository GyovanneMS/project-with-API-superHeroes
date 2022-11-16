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
        this.nome = 'Nome do Herói';
        this.bgcolor = 'green';
        this.infos = 'Nothing';
        this.studio = 'Nothing'
    }
    static get observedAttributes() {
        return ['image', 'nome', 'bgcolor', 'nomeCompleto', 'studio']
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
                width: 300px;
                height: 350px;
                background-color: #${this.bgcolor};
                display: grid;
                grid-template-rows: 60% 20% 20%;
                place-items: center;
                border-radius: 15px;
                transition: 2s;
                text-decoration: none;
            }

            .card:hover{
                transform: scale(1.1);
                border-radius: 35px;
            }

            .card__image{
                width: 100%;
                height: 100%;
                background-image: url(${this.image});
                background-size: cover;
                backgorund-color: cyan;
                background-position: center;
                border-radius: 15px 15px 0 0;
                transition: 2s;
            }

            .card:hover .card__image{
                border-radius: 35px 35px 0 0;
            }

            .card__nome{
                color: black;
                font-size: 1.9rem;
                display: flex;
                text-align: center;
            }

            .card__infos{
                color: black;
                display: flex;
                flex-direction: column;           
                text-align: center;
                flex-wrap: wrap;
            }

        `
        return style
    }

    component() {
        const card = document.createElement('a');
        card.classList.add(`card`)
        //card.href = './heropage.html'
        card.innerHTML = `
            <div class="card__image"></div>
            <div class="card__nome"> ${this.nome} </div>
            <div class="card__infos"><span>${this.infos}</span><span>${this.studio}</span></div>
        `
        return card
    }
}

customElements.define('card-aluno', card)

