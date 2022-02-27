"use strict";

let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, types: 'fire'},
    {name: 'Pikachu', height: 0.4, types: 'electric'},
    {name: 'Ponyta', height: 1, types: 'fire'},
];

//DISPLAY NAME AND HEIGHT OF POKEMONS IN DOM
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + (pokemonList[i].height) + 'm)');

    if (pokemonList[i].height > 0.8) {
        document.write(' => Wow, that\'s big!!');
    }

    document.write('<br>');
}



