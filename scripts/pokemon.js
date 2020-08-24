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

const move_list = [tackle, scratch]


class Pokemon {
    constructor(name, hp, attack, defense, special, speed, moves, image) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.special = special;
        this.speed = speed;
        this.moves = moves;
        this.image = image;
        this.level = 5;
    }
}

var bulbasaur = new Pokemon("Bulbasaur", 45, 49, 49, 65, 45, [tackle], "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2Cql-3KMwgG5N-BJ9EIAKWSwbynNKvGYp-PQ9OwoUjg&usqp=CAU&ec=45690269")
var charmander = new Pokemon("Charmander", 39, 52, 43, 50, 65, [scratch], "https://vignette.wikia.nocookie.net/mugen/images/9/9f/Charmander_PSMD.png")
var squirtle = new Pokemon("Squirtle", 44, 48, 65, 50, 43, [tackle], "https://vignette.wikia.nocookie.net/pokemontowerdefensethree/images/f/f3/Squirtle.jpg/")

const pokemon_list = [bulbasaur, charmander, squirtle]


class Player {
    constructor(name, pokemon) {
        this.name = name;
        this.pokemon = pokemon;
        this.move_used = "";
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

    for (var poke of pokemon_list) {

        if (poke.name == input) {

            return poke
        }
    }
}


var player1 = new Player("player1", "");
var player2 = new Player("player2", "");

const player_list = [player1, player2]


function comparaInputComPlayer(input) {
    
    for (var player of player_list) {

        if (player.name == input) {

            return player
        }
    }
}


function comparaInputComMove(input) {

    for (var move of move_list) {

        if (move.name == input) {

            return move
        }
    }
}


function escolhePokemonsDepoisRenderiza(player1, player2) {

    player1.pokemon = comparaInputComPokemon(document.querySelector("#poke-selection-player1").value);
    player2.pokemon = comparaInputComPokemon(document.querySelector("#poke-selection-player2").value);
    
    renderizaTelasDeBatalha(player1, player2);
}


function renderizaTelasDeBatalha(player1, player2) {
    
    document.querySelector("#battle-container").innerHTML = `

        <div id="combat-call" class="page-content">
            ${player1.pokemon.name.toUpperCase()} vs ${player2.pokemon.name.toUpperCase()}<br>
            <button id="button-start-combat" onclick="turnoPlayerOpponent(player1, player2)">Começar!</button>
        </div>
    
    `
}


function turnoPlayerOpponent(player, opponent) {
    
    document.querySelector("#title-box").innerHTML = `${player.name.toUpperCase()}`
        
    document.querySelector("#battle-container").innerHTML = `

    <div id="combat-screen">
            <div id="visual-display">
                <div class="visual-display-item" id="enemy-info">
                    <div id="enemy-name">${opponent.pokemon.name}</div>
                    <div id="enemy-hp">HP: ${opponent.pokemon.hp.toFixed(0)}</div>
                </div>
                <div class="visual-display-item"><img id="enemy-image" src="${opponent.pokemon.image}" alt="${opponent.pokemon.name}"></div>
                <div class="visual-display-item"><img id="player-image" src="${player.pokemon.image}" alt="${player.pokemon.name}"></div>
                <div class="visual-display-item" id="player-info">
                    <div id="player-name">${player.pokemon.name}</div>
                    <div id="player-hp">HP: ${player.pokemon.hp.toFixed(0)}</div>
                </div>
            </div>
            <div id="options-display">
                <div class="battle-message">
                    <div class="white-border">
                        <p>What will<br>${player.pokemon.name.toUpperCase()} do?</p>
                    </div>
                </div>
                <div id="battle-choice">
                    <button onclick="renderizaEscolhaDeGolpes(${player.name})" class="battle-choice-button" id="fight-button">Fight</button>
                    <button onclick="window.location.href='/'" class="battle-choice-button" id="run-button">Run</button>
                </div>
            </div>
        </div>
    `

};


function loadMoves(player) {

    for (var move of player.pokemon.moves) {

        document.querySelector("#move-selection-"+player.name).innerHTML += `
        
            <option value="${move.name}">${move.name}/${move.type.toUpperCase()}</option>
        `;
    }
};


function renderizaMoveDescription(player) {

    document.querySelector("#move-description-container").innerHTML = `
        
        <p>Power = ${comparaInputComMove(document.querySelector("#move-selection-"+ player.name).value).power}<br>
        PP = ${comparaInputComMove(document.querySelector("#move-selection-"+ player.name).value).pp}<p/>
    
    `
}


function calculosDeBatalha(player, opponent) {
    
    for (move of player.pokemon.moves) {
        
        if (move.name == player.move_used) {

            move_used = move
        }
    }
    
    damage = (((((2 * player.pokemon.level) / (5)) + 2) * move_used.power * player.pokemon.attack / opponent.pokemon.defense / (50)) + 2);

    opponent.pokemon.hp -= damage

    move_used.pp -= 1
}


function renderizaRelatorioDeTurno(player1, player2) {

    calculosDeBatalha(player1, player2)

    calculosDeBatalha(player2, player1)

    document.querySelector("#title-box").innerHTML = "BATALHA"
    
    document.querySelector("#options-display").innerHTML = `
    
        <div class="battle-message">
            <div class="white-border">
                <p>${player1.pokemon.name} used ${player1.move_used}</p>
                <p>${player2.pokemon.name} used ${player2.move_used}</p>
            </div>
        </div>
        <div id="battle-choice-report">
            <button onclick="turnoPlayerOpponent(player1, player2)" class="battle-choice-button">Confirm</button>
        </div>
    `
}


function escolheMove(player) {

    return player.move_used = document.querySelector("#move-selection-"+player.name).value
}


function renderizaEscolhaDeGolpes(player) {

    document.querySelector("#options-display").innerHTML = `
    
        <div id="battle-choice-moves">
            <div id="move-selection-container">
                <select name="move-selection-${player.name}" id="move-selection-${player.name}" required" onchange="renderizaMoveDescription(${player.name})">
                    <option disabled selected value>Golpes:</option>
                </select>
            </div>
            <div id="move-description-container">
                <p>Power = <br>
                PP = <p/>
            </div>
        </div>
        <div id="battle-choice-confirm-container">
            <button id="battle-choice-button-confirm" class="battle-choice-button" onclick="">Confirm</button>
        </div>
    `;

    loadMoves(comparaInputComPlayer(player.name));


    if (player.name == "player1") {

        document.querySelector("#battle-choice-button-confirm").setAttribute("onclick", "escolheMove(player1);turnoPlayerOpponent(player2, player1)")
    }

    if (player.name == "player2") {

        document.querySelector("#battle-choice-button-confirm").setAttribute("onclick", "escolheMove(player2);renderizaRelatorioDeTurno(player1, player2)")
    }
}