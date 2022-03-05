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

let pokemonRepository =(function() {

    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        {name: 'Charmander', height: 0.6, types: 'fire'},
        {name: 'Pikachu', height: 0.4, types: 'electric'},
        {name: 'Ponyta', height: 1, types: 'fire'}
    ];


    function add(item){
        if(typeof (item==={}) &&
        Object.keys(item)=='name', 'height', 'age') {
            pokemonList.push(item);
        } else {}
    }

    function getAll(){
        return pokemonList;
    }

    return{
        getAll: getAll,
        add: add
    }

})();

pokemonRepository.getAll();
pokemonRepository.add({name:'Squirtle', height: 0.5, types: 'water'});

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(
        `<div>
            <h1>${pokemon.name}</h1> 
            <p>height: ${pokemon.height} m</p> 
            <p>types: ${pokemon.types} </p> 
            </div>`
    )
});