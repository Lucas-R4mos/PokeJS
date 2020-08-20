class Move {
    constructor(name, type, pp, power, accuracy, effect) {
        this.name = name
        this.type = type
        this.pp = pp
        this.power = power
        this.accuracy = accuracy
        this.effect = effect
    }
}

var tackle = new Move('Tackle', 'Normal', 35, 35, 95, [''])
var scratch = new Move('Scratch', 'Normal', 35, 40, 100, [''])



class Pokemon {
    constructor(name, hp, attack, defense, special, speed, moves, image) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.special = special;
        this.speed = speed;
        this.moves = moves;
        this.image = image
    }
}

var bulbasaur = new Pokemon("Bulbasaur", 45, 49, 49, 65, 45, [tackle], "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/c8a2987f-3e2e-4e4d-9aac-27d02b24bdd3/d6tgux1-944ab366-9431-4d31-8469-52d7202059a6.png")
var charmander = new Pokemon("Charmander", 39, 52, 43, 50, 65, [scratch], "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/c8a2987f-3e2e-4e4d-9aac-27d02b24bdd3/d6th2ej-b07148ff-57c7-46c6-be65-04d41dbb2b97.png")
var squirtle = new Pokemon("Squirtle", 44, 48, 65, 50, 43, [tackle], "https://vignette.wikia.nocookie.net/pokemontowerdefensethree/images/f/f3/Squirtle.jpg/revision/latest?cb=20160806214440")

const pokemon_list = [bulbasaur, charmander, squirtle]

class Player {
    constructor(pokemon, enemy) {
        this.pokemon = pokemon;
        this.enemy = enemy;
    }
}


function preLoad() {

    for (const pokemon of pokemon_list) {

        document.querySelector("#poke-selection-player1").innerHTML +=  `
            <option value="${pokemon.name}">${pokemon.name}</option>
        `;
        
        document.querySelector("#poke-selection-player2").innerHTML +=  `
            <option value="${pokemon.name}">${pokemon.name}</option>
        `;
    }

}

function comparaInputComPokemon(input) {

    for (const poke of pokemon_list) {

        if (poke.name == input) {

            return poke
        }
    }
}

var player1;
var player2;
const player_list = [player1, player2]

function escolhePokemonsDepoisRenderiza() {

    player1 = new Player(comparaInputComPokemon(document.querySelector("#poke-selection-player1").value), player2);
    player2 = new Player(comparaInputComPokemon(document.querySelector("#poke-selection-player2").value), player1);
    
    renderizaTelasDeBatalha(player1, player2);
}


function renderizaTelasDeBatalha(player1, player2) {
    
    document.querySelector("#battle-container").innerHTML = `

        <div id="combat-call" class="page-content">
            ${player1.pokemon.name.toUpperCase()} vs ${player2.pokemon.name.toUpperCase()}<br>
            <button id="button-start-combat" onclick="comecarCombate(player1, player2)">Começar!</button>
        </div>
    
    `

}


function comecarCombate(player1, player2) {
    
    // while (player1.pokemon.hp > 0 && player2.pokemon.hp > 0) {
        
    //     for (let player in player_list) {

            
    //     }
    // }
    

    document.querySelector("#battle-container").innerHTML = `
    
        <div id="visual-display">
            <div class="visual-display-item" id="enemy-info">
                <div id="enemy-name">${player1.enemy.pokemon.name}</div>
                <div id="enemy-hp">${player1.enemy.pokemon.hp}</div>
            </div>
            <div class="visual-display-item"><img id="enemy-image" src="${player1.enemy.pokemon.image}" alt="${player1.enemy.pokemon.name}"></div>
            <div class="visual-display-item"><img id="player-image" src="${player1.pokemon.image}" alt="${player1.pokemon.name}"></div>
            <div class="visual-display-item" id="player-info">
                <div id="player-name">${player1.pokemon.name}</div>
                <div id="player-hp">${player1.pokemon.hp}</div>
            </div>
        </div>
        <div id="options-display">
            <div id="battle-question">
                <div id="white-border">
                    What will<br>${player1.pokemon.name} do?
                </div>
            </div>
            <div id="battle-choice">
                <button class="battle-choice-button" id="fight-button">Fight</button>
                <button class="battle-choice-button" id="bag-button">Bag</button>
                <button class="battle-choice-button" id="pokemon-button">Pkmn</button>
                <button class="battle-choice-button" id="run-button">Run</button>
            </div>
        </div>
    `

}