"use strict";

//
// let pokemonList = [
//     {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
//     {name: 'Charmander', height: 0.6, types: 'fire'},
//     {name: 'Pikachu', height: 0.4, types: 'electric'},
//     {name: 'Ponyta', height: 1, types: 'fire'},
// ];
//
// //DISPLAY NAME AND HEIGHT OF POKEMONS IN DOM
// function printArrayDetails () {
//     for (let i = 0; i < pokemonList.length; i++) {
//         document.write('<p>' + pokemonList[i].name)
//
//         if (pokemonList[i].height){
//             document.write(' (height: ' + (pokemonList[i].height) + 'm)')
//         }
//
//         if (pokemonList[i].height > 0.8) {
//             document.write(' => Wow, that\'s big!!');
//         }
//
//         document.write('</p>')
//     }
// }
//
// printArrayDetails();
// printArrayDetails();
// printArrayDetails();
// printArrayDetails();
// printArrayDetails();
// printArrayDetails();
//

let pokemonRepository = (function () {

    let repository = [
        {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        {name: 'Charmander', height: 0.6, types: 'fire'},
        {name: 'Pikachu', height: 0.4, types: 'electric'},
        {name: 'Ponyta', height: 1, types: 'fire'}
    ];

    function getAll() {
        return repository;
    }

    function add(pokemon) {

        if
        (typeof pokemon === 'object'
            && typeof pokemon.name !== 'undefined'
            && typeof pokemon.height !== 'undefined'
            && typeof pokemon.types !== 'undefined'
        ) {
            repository.push(pokemon);
        } else {
            console.log('Pokemon does not fit conditions')
        }
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let pokemonList__item = document.createElement('li');
        let button = document.createElement('button');

        //appends button with pokemon name to ul
        button.innerText = pokemon.name;
        button.classList.add('button');
        pokemonList__item.appendChild(button);
        pokemonList.appendChild(pokemonList__item);

        //if 'click' occurs on button, then event is executed
        button.addEventListener('click', function showDetails(event) {
                console.log(pokemon.name, event);
            }
        )
    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }

})();

pokemonRepository.getAll();
pokemonRepository.add({name: 'Squirtle', height: 0.5, types: 'water'});


// Test that a wrong pokemon is NOT added.
pokemonRepository.add({name: 'Fake Squirtle', types: 'water'});

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

});