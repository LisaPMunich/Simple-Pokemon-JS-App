"use strict";

let pokemonRepository = (function () {
    let PokemonList = [];


    function add(pokemon) {
        if
        (typeof pokemon === 'object'
            && typeof pokemon.name !== 'undefined'
            && typeof pokemon.detailsUrl !== 'undefined'
        ) {
            PokemonList.push(pokemon);
        } else {
            console.log('Pokemon does not fit conditions');
        }
    }

    function getAll() {
        return PokemonList;
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
        button.addEventListener('click', function () {
                showDetails(pokemon);
            }
        )
    }


    function loadList() {
        //show Loading Message, hide when loaded
        let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
        return fetch(apiURL)
            .then(response => response.json())
            .then(json => {
                let dataFromAPI = json.results;

                dataFromAPI.forEach(entry => {
                    let pokemon = {
                        name: entry.name,
                        detailsUrl: entry.url
                    };
                    add(pokemon);
                    console.log(pokemon);
                })
            })
            .catch(e => console.error(e))
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(response => response.json())
            .then(details => {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
                console.log(pokemon);
            })
            .catch(e => console.error(e));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => console.log(item))
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }
})();


pokemonRepository
    .loadList()
    .then(() =>
        pokemonRepository
            .getAll()
            .forEach(pokemon => pokemonRepository.addListItem(pokemon))
    );