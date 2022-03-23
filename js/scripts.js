let pokemonRepository = (function () {
    let PokemonList = [];

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            typeof pokemon.name !== "undefined" &&
            typeof pokemon.detailsUrl !== "undefined"
        ) {
            PokemonList.push(pokemon);
        } else {
            console.log("Pokemon does not fit conditions");
        }
    }

    function getAll() {
        return PokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = $(".row");
        let template = $(`
              <div class="col-sm-6 col-lg-4 pokemon-list-column">
                  <h2 class="pokemon-list-column__title">${pokemon.name}</h2>
                  <button type="button" class="btn btn-light" data-toggle="modal" data-target="#modal-dialog" aria-label="close">show  details</button>
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="modal-img" style="width:50%" alt="responsive image" aria-label="image of ${pokemon.name}">
              </div>`);

        let button = template.find("button");

        //if 'click' occurs on button, then event is executed
        $(button).on("click", function () {
            showDetails(pokemon);
        });

        pokemonList.append(template);
    }

    function loadList() {
        //show Loading Message, hide when loaded
        let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";
        return fetch(apiURL)
            .then((response) => response.json())
            .then((json) => {
                let dataFromAPI = json.results;
                dataFromAPI.forEach((entry, i) => {
                    let pokemon = {
                        id: i + 1,
                        name: entry.name,
                        detailsUrl: entry.url,
                    };
                    add(pokemon);
                });
            })
            .catch((e) => console.error(e));
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then((response) => response.json())
            .then((details) => {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
                return pokemon;
            })
            .catch((e) => console.error(e));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then((pokemon) => {
            return pokemonModal.showModal(pokemon.name, pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

// ADD SEARCH BAR FOR POKÉMON AND FILTER

$("#searchBar").on("keyup", (event) => {
    let searchString = event.target.value.toLowerCase();
    let filteredCharacters = pokemonRepository.getAll().filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchString);
    });

    $(".row").empty();

    filteredCharacters.forEach((pokemon) =>
        pokemonRepository.addListItem(pokemon)
    );
});

// ADD MODAL TO SHOW DETAILS OF POKÉMON, WHEN BUTTON IS CLICKED

let pokemonModal = (function () {
    $modalContainer = $("#modal-container");

    // SHOW MODAL
    function showModal(title, pokemon) {
        //removing all tags and content in the div modal-container
        $modalContainer.empty();

        //adding all tags and content back in the modal container
        let modalElement = document.createElement("div");
        modalElement.classList.add("modal-dialog");
        $modalContainer.append(modalElement);

        let modalContentElement = document.createElement("div");
        modalContentElement.classList.add("modal-content");
        modalElement.append(modalContentElement);

        let modalHeaderElement = document.createElement("div");
        modalHeaderElement.classList.add("modal-header");
        modalContentElement.append(modalHeaderElement);

        let titleElement = document.createElement("h3");
        titleElement.classList.add("modal-title");
        titleElement.innerText = title;
        modalHeaderElement.append(titleElement);

        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("btn");
        closeButtonElement.innerHTML = "&times;";
        modalHeaderElement.append(closeButtonElement);

        let modalBodyElement = document.createElement("div");
        modalBodyElement.classList.add("modal-body");
        modalContentElement.append(modalBodyElement);

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
        modalImage.setAttribute("alt", "image of pokemon");
        let imageSize = "300px";
        modalImage.setAttribute(
            "style",
            `height: ${imageSize}; width: ${imageSize}`
        );
        modalBodyElement.append(modalImage);

        // making modal visible again
        $modalContainer.addClass("is-visible");

        $(closeButtonElement).on("click", hideModal);
    }

    // HIDE MODAL
    function hideModal() {
        $modalContainer.removeClass("is-visible");
    }

    // ADDING EVENT LISTENER to show and close Modal

    $(".btn.btn-light").on("click", showModal);

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && $modalContainer.hasClass("is-visible")) {
            hideModal();
        }
    });

    $modalContainer.click(function (event) {
        if (event.target === $modalContainer) {
            hideModal();
        }
    });

    return {
        hideModal: hideModal,
        showModal: showModal,
    };
})();

pokemonRepository
    .loadList()
    .then(() =>
        pokemonRepository
            .getAll()
            .forEach((pokemon) => pokemonRepository.addListItem(pokemon))
    );

// FORM VALIDATION LOGIN FORM IN HEADER

// (function () {
//     let form = document.querySelector('#login-form');
//     let userNameInput = document.querySelector('#username');
//     let passwordInput = document.querySelector('#password');
//     let userNameErrorElement = document.querySelector('#username-error');
//     let passwordErrorElement = document.querySelector('#password-error');
//
//     function validateUserName() {
//         if (userNameInput.value === '') {
//             userNameErrorElement.innerText = 'Please type in your name';
//             return false
//         }
//         userNameErrorElement.innerText = '';
//         return true
//     }
//
//     function validatePassword(){
//         if (passwordInput.value === 'password'){
//             passwordErrorElement.innerText ='Password cannot be password';
//             return false
//         }
//
//         if (passwordInput.value ===''){
//             passwordErrorElement.innerText ='Please type in your password';
//             return false
//         }
//
//         if (passwordInput.value.length < 8) {
//             passwordErrorElement.innerText ='Password is less than 8 characters';
//             return false
//         }
//         passwordErrorElement.innerText ='';
//         return true;
//     }
//
//     function validateForm(){
//     let isValidUserName = validateUserName();
//     let isValidPassword = validatePassword();
//     return isValidUserName && isValidPassword;
//     }
//
//     function formHasError() {
//         if (userNameErrorElement.innerText.length > 0 || passwordErrorElement.innerText.length > 0) {
//             return false
//         }
//         return true
//     }
//
//     userNameInput.addEventListener('input', validateUserName);
//     passwordInput.addEventListener('input', validatePassword);
//     form.addEventListener('submit',(event)=>{
//         validateForm();
//         if(formHasError()){
//             event.preventDefault();
//         }
//     })

// })();
