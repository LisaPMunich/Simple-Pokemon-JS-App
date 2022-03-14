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
        })
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
                return pokemon;
            })
            .catch(e => console.error(e));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon)
            .then((pokemon) => {
                return pokemonModal.showModal(pokemon.name, pokemon);
            });
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


// ADD MODAL TO SHOW DETAILS OF POKEMON, WHEN BUTTON IS CLICKED

let pokemonModal = (function () {
    let openModalButton = document.querySelector("#modal-open");
    let modalContainer = document.querySelector("#modal-container");

    // SHOW MODAL
    function showModal(title, pokemon) {
        //removing all tags and content in the div modal-container
        modalContainer.innerHTML = "";

        console.log(pokemon);

        //adding all tags and content back in the modal container
        let modalElement = document.createElement("div");
        modalElement.classList.add("modal");
        modalContainer.append(modalElement);

        let modalHeaderElement = document.createElement("div");
        modalHeaderElement.classList.add("modal-header");
        modalElement.append(modalHeaderElement);

        let titleElement = document.createElement("h3");
        titleElement.classList.add("#modal-open");
        titleElement.innerText = title;
        modalHeaderElement.append(titleElement);

        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerHTML = "&times;";
        modalHeaderElement.append(closeButtonElement);

        let modalBodyElement = document.createElement("div");
        modalBodyElement.classList.add("modal-body");
        modalElement.append(modalBodyElement);

        let modalParagraph1 = document.createElement("p");
        modalParagraph1.innerText = `height: ${pokemon.height / 10}m`;
        modalBodyElement.append(modalParagraph1);

        let modalParagraph2 = document.createElement("p");
        let pokemonTypeList = pokemon.types[0].type.name;
        if (pokemon.types[1]) {
            pokemonTypeList += ", " + pokemon.types[1].type.name;
        }
        modalParagraph2.innerText = `types: ${pokemonTypeList}`;
        modalBodyElement.append(modalParagraph2);

        let modalImage = document.createElement("img");
        modalImage.setAttribute("src", pokemon.imageUrl);
        modalBodyElement.append(modalImage);


        // making modal visible again
        modalContainer.classList.add("is-visible");

        closeButtonElement.addEventListener("click", hideModal);
    }

    // HIDE MODAL
    function hideModal() {
        modalContainer.classList.remove("is-visible");
    }


    // ADDING EVENT LISTENER to show and close Modal
    openModalButton.addEventListener("click", () => {
        showModal();
    });

    window.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            modalContainer.classList.contains("is-visible")
        ) {
            hideModal();
        }
    });

    modalContainer.addEventListener("click", (event) => {
        if (event.target === modalContainer) {
            hideModal();
        }
    });

    return {
        hideModal: hideModal,
        showModal: showModal
    }

})();


pokemonRepository
    .loadList()
    .then(() =>
        pokemonRepository
            .getAll()
            .forEach(pokemon => pokemonRepository.addListItem(pokemon))
    );