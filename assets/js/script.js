$(document).ready(function () {

    // Global Variables

    let userPokemon = []; // This is where collected pokemon are stored/removed from

    const inventory = {
        pokemon: userPokemon.length,
        berries: 0,
        potions: 0,
    };

    const pokemonPersonality = [
        "Bashful", "Boisterous", "Bold", "Brave", "Calm", "Determined",
        "Docile", "Gentle", "Hardy", "Hasty", "Impish", "Jolly", "Loud",
        "Mischievous", "Mild", "Modest", "Naive", "Naughty", "Quiet",
        "Quirky", "Relaxed", "Sassy", "Serious", "Timid",
    ];

    let lastBerryWalkResult = 0; // Used in goForAWalk & addWalkResultsToInventory functions
    let lastPotionWalkResult = 0; // Used in goForAWalk & addWalkResultsToInventory functions
    let pokemonToEditIndex = null; // Used in release & rename functions
    let wildSpeciesNum = null; // Used when finding a wild pokemon to store species number
    let modalIsOpen = false; // Used to ensure multiple modals can't be opened at the same time

    // Event Listener to change state of modalIsOpen when any modal is closed using a 'cancel modal' button
    $(".cancel-modal-button").on("click", updateModalStateToClosed);

    // Function to close modalIsOpenState
    function updateModalStateToClosed () {
        modalIsOpen = false;
    }

    // Functions called when page loads
    updateInventory();
    addNewPersonalitiesToStarters();

    // Basic Text-Conversion Functions
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function capitalizeWords(str) {
        return str
            .split(" ")
            .map(word => capitalizeFirstLetter(word))
            .join(" ");
    }

    // Functions that fire on startup
    function updateInventory() {
        document.querySelectorAll(".pokemon-count").forEach(count => {
            count.textContent = userPokemon.length;
        });
        // these need a foreach to loop through every display 
        // of each count as there are more than 1 of each
        document.querySelectorAll(".berries-count").forEach(count => {
            count.textContent = inventory.berries;
        });
        document.querySelectorAll(".potions-count").forEach(count => {
            count.textContent = inventory.potions;
        });
    }

    $("#refresh-personalities-nav, #refresh-personalities-main").on("click", addNewPersonalitiesToStarters);

    function addNewPersonalitiesToStarters() {
        let personality1 = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];
        let personality4 = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];
        let personality7 = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];
        $(".starter-personality-1").text(personality1);
        $(".starter-personality-4").text(personality4);
        $(".starter-personality-7").text(personality7);
    }

    // Triggered every time user pokémon collection is updated
    function displayUserPokemon() {
        if (userPokemon.length > 0) {
            let currentUserPokemon = "";
            // Loop through all Pokémon in the userPokemon array
            for (const pokemon of userPokemon) {
                currentUserPokemon += `
                    <div class="col-12 col-xl-6">
                        <div class="pokemon-card" data-index="${pokemon.index}">

                            <h2 class="mb-1">${capitalizeWords(pokemon.nickname)}<br>the ${capitalizeWords(pokemon.name)}</h2>

                            <div class = "row justify-content-center text-start">
                                    <div class="details">
                                        <p class="level">Level: ${pokemon.level}</p>
                                        <p>Type: ${capitalizeFirstLetter(pokemon.type)}</p>
                                        <p class="personality">Personality: ${pokemon.personality}</p>
                                    </div>
                                    <img src="${pokemon.image_front}" class="img-responsive col-4 col-md-6" alt="${pokemon.name}">
                                <div class="progress-bars col-11 col-md-5">
                                    <div>
                                        <p><label for="hunger">Hunger:</label></p>
                                        <progress id="hunger" max="100" value="${pokemon.hunger}"></progress>
                                    </div>
                                    <div>
                                        <p><label for="health">Health:</label></p>
                                        <progress id="health" max="100" value="${pokemon.health}"></progress>
                                    </div>
                                    <div>
                                        <p><label for="happiness">Happiness:</label></p>
                                        <progress id="happiness" max="100" value="${pokemon.happiness}"></progress>
                                    </div>
                                </div>

                            </div>

                            <div>
                                <button type="button" class="interact-button btn-lg text-wrap" data-bs-toggle="dropdown" aria-expanded="false">
                                        Interact with ${capitalizeWords(pokemon.nickname)} <i class="fa-solid fa-chevron-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button class="action-train dropdown-item"
                                            aria-label="Train with ${pokemon.nickname} to increase it's level">Train With</button>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <button class="action-berry dropdown-item"
                                            aria-label="Feed a berry to ${pokemon.nickname} to increase it's hunger bar">Feed Berry</button>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <button class="action-potion dropdown-item"
                                            aria-label="Feed a potion to ${pokemon.nickname} to increase it's health bar">Feed Potion</button>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <button class="action-play dropdown-item"
                                            aria-label="Play with ${pokemon.nickname} to increase it's happiness bar">Play With</button>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <button class="release-pokemon secondary-button" type="button">
                                    Release ${capitalizeWords(pokemon.nickname)}
                                </button>
                            </div>
                            <div>
                                <button class="rename-pokemon secondary-button" type="button">
                                    Rename ${capitalizeWords(pokemon.nickname)}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
            // Replace #pokemon-collection content with the current list
            $("#pokemon-collection").html(currentUserPokemon);
        } else {
            // If there are 0 pokemon in collection (the last pokémon has been deleted):
            // Clears any old pokemon from the HTML
            $("#pokemon-collection").html("");
            // Reset the starter form page to how it was
            $("#starter-options-form").removeClass("hidden");
            $("#walk-button").addClass("hidden");
            $("#add-first-pokemon").prop("disabled", false).text("Add To Collection");
            $("#refresh-personalities-nav").removeClass("hidden");
            $("#starter-nickname").focus();
        }
    }

    // Functions with Handlers

    // ----------- TO DO - Change this so that it works with new modalIsOpen global variable - TO DO ------------------------ //

    // This means users can use enter/esc keys to interact with modals
    document.addEventListener('keydown', handleModalKeyActions);
    function handleModalKeyActions(event) {
        // testing - remove later ---------------------------------------------------------------------------- remove
        console.log(modalIsOpen);
        // Bootstrap adds the 'show' class to a modal when it is visible
        // so this checks to see if there is a modal with both the 
        // .show and .modal classes, which means it is open
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const cancelButton = openModal.querySelector('.cancel-modal-button');
            const confirmButton = openModal.querySelector('.confirm-modal-button');
            if (event.key === 'Escape') {
                event.preventDefault();
                cancelButton.click();
            } else if (event.key === 'Enter') {
                event.preventDefault();
                confirmButton.click();
            }
        }
    }

    $(".starter").on("click", selectAndStyleStarter);
    // this function allows the initial selection to be made by clicking
    // anywhere inside the starter box, not only on the radio/name label
    // & also adds a class to style the selected starter pokemon box
    function selectAndStyleStarter() {
        // This is necessary to remove style from previously checked starters,
        // so they don't all end up with the class that styles the selected pokemon
        $(".starter").removeClass("selected-starter");
        // finds a radio that is a child of the div clicked on
        const radio = $(this).find('input[type="radio"]')
        // turns that radio to checked
        radio.prop("checked", true);
        // adds the styling to selected starter div
        $(this).addClass("selected-starter");
    }

    $("#add-first-pokemon").on("click", addStarterPokemon);

    function addStarterPokemon(event) {
        // console.log(userPokemon.length); // for testing //
        event.preventDefault();
        // Get the selected starter radio value
        const species = $("input[name='starter']:checked").val();
        // If no starter selected, show modal and stop
        if (!species) {
            $("#alertModal .main-modal-content").text("You need to pick a Pokémon!");
            $("#alertModal").modal("show");
            modalIsOpen = true;
            return;
        }
        // In case new pokemon is slow to load, the button is disabled so double clicks don't add more pokémon
        // and text is changed so the user knows the click has worked
        $("#add-first-pokemon").prop("disabled", true).text("Adding...");
        // Get nickname or default to species string
        let nicknameInput = $("#starter-nickname").val().trim();
        let personality = $(`.starter-personality-${species}`).first().text();
        let level = 1;
        let happiness = 80;
        let health = 80;
        let hunger = 80;
        let uniqueIndex = Date.now();
        // Fetch Pokémon data from PokéAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${species}/`)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.name;
                const imageFront = data.sprites.front_default;
                const imageBack = data.sprites.back_default;
                // Just the first type
                const primaryType = data.types[0].type.name;
                let nickname;
                if (nicknameInput.length > 0) {
                    nickname = nicknameInput;
                }
                else {
                    nickname = pokemonName;
                }
                // Adding the new details as an object in the userPokemon array
                userPokemon.push({
                    index: uniqueIndex,
                    species: species,
                    name: pokemonName,
                    image_front: imageFront,
                    image_back: imageBack,
                    nickname: nickname,
                    type: primaryType,
                    personality: personality,
                    level: level,
                    happiness: happiness,
                    health: health,
                    hunger: hunger,
                });
                // Update displays in HTML
                updateInventory();
                displayUserPokemon();
                // Remove starter choice form and add walk button
                $("#starter-options-form").addClass("hidden");
                $("#walk-button").removeClass("hidden");

                // Ensures both refresh starter personality buttons are hidden after the starter is chosen
                $("#refresh-personalities-nav").addClass("hidden");
                $("#refresh-personalities-main").addClass("hidden");

                // To double check details of new pokémon added
                console.log("Starter chosen:", userPokemon);
            })
            .catch(error => {
                console.error("Error fetching Pokémon:", error);
                // If there is an error with the fetch, the button won't stay disabled
                $("#add-first-pokemon").prop("disabled", false).text("Error - Try Again!");
            });
    }

    // Remove/release functions

    $("#pokemon-collection").on("click", ".release-pokemon", openReleaseModal);

    function openReleaseModal() {
        // Find the index of the clicked Pokémon
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        // Store the index globally so releasePokemon can access it
        pokemonToEditIndex = uniqueIndex;
        // Show the modal
        $("#releaseModal").modal("show");
        modalIsOpen = true;
    }

    $("#confirm-release-button").on("click", releasePokemon);

    function releasePokemon() {
        if (userPokemon.length === 1) {
            userPokemon = [];
            $("#starter-nickname").val(""); // Clear the nickname input box
            $('input[name="starter"]').prop('checked', false); // Deselect the radio button
            $(".starter").removeClass("selected-starter"); // Remove visual highlight
            addNewPersonalitiesToStarters(); // Refresh starter choices in form
        } else {
            let newPokemonArray = [];
            for (let i = 0; i < userPokemon.length; i++) {
                let pokemon = userPokemon[i];

                if (pokemon.index !== pokemonToEditIndex) {
                    newPokemonArray.push(pokemon);
                }
            }
            userPokemon = newPokemonArray;
        }
        $("#releaseModal").modal("hide");
        modalIsOpen = false;
        pokemonToEditIndex = null;
        updateInventory();
        displayUserPokemon();
    }

    // Rename functions

    $("#pokemon-collection").on("click", ".rename-pokemon", openRenameModal);

    function openRenameModal() {
        // Find the index of the clicked Pokémon
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        // Find the Pokemon object to get its current nickname
        // find() is like doing a for loop through all of the userPokemon array
        const pokemonToRename = userPokemon.find(pokemon => pokemon.index === uniqueIndex);
        // Store the index globally so releasePokemon can access it
        pokemonToEditIndex = uniqueIndex;
        // Pre-fill the modal input with original nickname
        $("#new-nickname").val(capitalizeWords(pokemonToRename.nickname));
        // Show the modal
        $("#renameModal").modal("show");
        modalIsOpen = true;
    }

    $("#rename-button").on("click", renamePokemon);

    function renamePokemon() {
        let newNickname = $("#new-nickname").val().trim();
        // Use find() to instantly locate the one object we need.
        const pokemonToRename = userPokemon.find(p => p.index === pokemonToEditIndex);
        if (!newNickname) {
            // Use the original species name as the nickname
            pokemonToRename.nickname = pokemonToRename.name;
        } else {
            pokemonToRename.nickname = newNickname;
        }
        $("#renameModal").modal("hide");
        modalIsOpen = false;
        pokemonToEditIndex = null; // Clear the global index
        displayUserPokemon();
    }

    // Action/Interaction functions

    $("#pokemon-collection").on("click", ".action-play", actionPlay);

    function actionPlay() {
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                pokemon.happiness = Math.min(100, pokemon.happiness + 15);
                // Math.min will always find the minimum value, so if the
                // first value is set to 100 then no matter how high the new
                // happiness value gets after playing, it won't ever exceed 100
                break;
                // this stops it cycling through the rest of the
                // pokemon once the correct one has been found
            }
        }
        displayUserPokemon();
    }

    $("#pokemon-collection").on("click", ".action-berry", actionBerry);

    function actionBerry() {
        if (inventory.berries < 1) {
            $("#alertModal .main-modal-content").html("<p class='larger-font'>You don't have any&nbsp;berries!</p><p>(Try going for a walk to&nbsp;find&nbsp;some)<p>");
            $("#alertModal").modal("show");
            modalIsOpen = true;
        } else {
            const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
            for (let pokemon of userPokemon) {
                if (pokemon.index === uniqueIndex) {
                    if (pokemon.hunger === 100) {
                        $("#alertModal .main-modal-content").text("Your pokémon is now full!");
                        $("#alertModal").modal("show");
                        modalIsOpen = true;
                    } else {
                        pokemon.hunger = Math.min(100, pokemon.hunger + 15);
                        inventory.berries = inventory.berries - 1;
                        break;
                    }
                }
            }
            displayUserPokemon();
            updateInventory();
        }
    }

    $("#pokemon-collection").on("click", ".action-potion", actionPotion);

    function actionPotion() {
        if (inventory.potions < 1) {
            $("#alertModal .main-modal-content").html("<p class='larger-font'>You don't have any&nbsp;potions!</p><p>(Potions are rare, so you may have to go on a few walks to&nbsp;find&nbsp;some)</p>");
            $("#alertModal").modal("show");
            modalIsOpen = true;
        } else {
            const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
            for (let pokemon of userPokemon) {
                if (pokemon.index === uniqueIndex) {
                    if (pokemon.health === 100) {
                        $("#alertModal .main-modal-content").text("Your pokémon is now at full health.");
                        $("#alertModal").modal("show");
                        modalIsOpen = true;
                    } else {
                        pokemon.health = Math.min(100, pokemon.health + 15);
                        inventory.potions = inventory.potions - 1;
                        break;
                    }
                }
            }
            displayUserPokemon();
            updateInventory();
        }
    }

    $("#pokemon-collection").on("click", ".action-train", actionTrain);

    function actionTrain() {
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                if (pokemon.health < 20) {
                    pokemon.happiness = Math.max(0, pokemon.happiness - 5);
                    $("#alertModal .main-modal-content").html("<p class='larger-font'>Your pokémon needs to heal before anymore training!</p><p>(Try giving them a potion)</p>");
                    $("#alertModal").modal("show");
                    modalIsOpen = true;
                } else if (pokemon.hunger < 20) {
                    pokemon.happiness = Math.max(0, pokemon.happiness - 5);
                    $("#alertModal .main-modal-content").html("<p class='larger-font'>Your pokémon is too hungry to train!</p><p>(Try feeding them some berries)</p>");
                    $("#alertModal").modal("show");
                    modalIsOpen = true;
                } else {
                    // Math.max will always find the maximum value, so if the
                    // first value is set to 0 then no matter how low the health
                    // value gets from battling, it won't ever be less than 0
                    pokemon.health = Math.max(0, pokemon.health - 10);
                    pokemon.hunger = Math.max(0, pokemon.hunger - 20);
                    pokemon.level = pokemon.level + 1;
                    break;
                }
            }
        }
        displayUserPokemon();
    }

    // Walk button functions

    $("#walk-button").on("click", goForAWalk);

    function goForAWalk() {
        // generate random pokemon from user's pokemon collection
        const randomPokemon = Math.floor(Math.random() * userPokemon.length);
        // Generate random number
        let randomNumber = Math.floor(Math.random() * 5);
        if (userPokemon[randomPokemon].level > 4 && randomNumber === 3) {
            walkDisturbance();
        } else {
            // Set the walk results:
            lastBerryWalkResult = Math.floor(Math.random() * 9) + 2; // 2 - 10
            lastPotionWalkResult = Math.floor(Math.random() * 4) + 2; // 2 - 5
            // results to display in modal:
            let results = lastBerryWalkResult + " berries"
            if (lastBerryWalkResult < 5) {
                results += " and " + lastPotionWalkResult + " potions"
            } else {
                lastPotionWalkResult = 0;
            }
            // Updating the modal
            // add the random pokemon nickname to the text in the modal
            $("#random-user-pokemon").text(capitalizeWords(userPokemon[randomPokemon].nickname));
            // add image to modal
            $("#walk-image").html(`<img src="${userPokemon[randomPokemon].image_back}" alt="pixelated image of ${userPokemon[randomPokemon].name}">`)
            // updating the inner text
            $("#walk-results").text(results);
            // displaying the modal
            $("#walkResultsModal").modal("show");
            modalIsOpen = true;
        }
    }

    $("#add-walk-items").on("click", addWalkResultsToInventory);

    function addWalkResultsToInventory() {
        inventory.berries = inventory.berries + lastBerryWalkResult;
        inventory.potions = inventory.potions + lastPotionWalkResult;
        updateInventory();
    }

    function walkDisturbance() {
        $("#walkDisturbanceModal .main-modal-content").text("You hear a rustling coming from the long grass.");
        $("#walkDisturbanceModal").modal("show");
        modalIsOpen = true;
    }

    $("#investigate-button").on("click", surpriseEncounter);

    function surpriseEncounter() {
        $("#walkDisturbanceModal").modal("hide");
        modalIsOpen = false;
        // Generate random species number and save to global variable
        wildSpeciesNum = Math.floor(Math.random() * 151) + 1;
        // Fetch details of random pokémon from PokeAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${wildSpeciesNum}/`)
            .then(response => response.json())
            .then(data => {
                let pokemonName = data.name;
                if (pokemonName === "nidoran-f") {
                    pokemonName = "Nidoran♀"
                } else if (pokemonName === "nidoran-m") {
                    pokemonName = "Nidoran♂"
                } else if (pokemonName === "mr-mime") {
                    pokemonName = "Mr Mime"
                }
                const imageFront = data.sprites.front_default;
                // Adding the new details to the modal box
                let results = `<img src="${imageFront}" alt="${pokemonName}">`
                results += `<p>A wild ${capitalizeWords(pokemonName)} appears in front of you. What do you do?<p>`
                $("#wildEncounterModal .main-modal-content").html(results);
                // displaying the modal
                $("#wildEncounterModal").modal("show");
                modalIsOpen = true;
                // Update displays in HTML
                updateInventory();
                displayUserPokemon();
            })
            .catch(error => {
                console.error("Error fetching Pokémon:", error);
            });
    }

    $("#adopt-button").on("click", addWildPokemon);

    function addWildPokemon() {
        // removed hiding the walkDisturbanceModal from here as already done in previous function above
        const speciesNumber = wildSpeciesNum;
        let personality = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];
        let level = Math.floor(Math.random() * 5) + 1; // random between 1 and 5
        let happiness = 10;
        let health = 80;
        let hunger = 40;
        let uniqueIndex = Date.now();
        // Fetch details of new pokémon from PokeAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${speciesNumber}/`)
            .then(response => response.json())
            .then(data => {
                let pokemonName = data.name;
                if (pokemonName === "nidoran-f") {
                    pokemonName = "Nidoran♀;"
                } else if (pokemonName === "nidoran-m") {
                    pokemonName = "Nidoran♂"
                } else if (pokemonName === "mr-mime") {
                    pokemonName = "Mr Mime"
                }
                const imageFront = data.sprites.front_default;
                const imageBack = data.sprites.back_default;
                // Just the first type
                const primaryType = data.types[0].type.name;
                let nickname = pokemonName;
                // Adding the new details as an object in the userPokemon array
                userPokemon.push({
                    index: uniqueIndex,
                    species: speciesNumber,
                    name: capitalizeWords(pokemonName),
                    image_front: imageFront,
                    image_back: imageBack,
                    nickname: nickname,
                    type: primaryType,
                    personality: personality,
                    level: level,
                    happiness: happiness,
                    health: health,
                    hunger: hunger,
                });
                // update pokémon to edit index to new pokemon for renaming
                pokemonToEditIndex = uniqueIndex;
                // Update displays in HTML
                updateInventory();
                displayUserPokemon();
                // To double check details of new pokémon added
                console.log("New pokemon added:", userPokemon);
                $("#wildRenameModal").modal("show");
                modalIsOpen = true;
            })
            .catch(error => {
                console.error("Error fetching Pokémon:", error);
            });
    }

    // Anonymous function to clear old wild pokémon nickname from bootstrap modal and add focus to input box
    // - only fires once modal and input are fully loaded and visible
    $('#wildRenameModal').on('shown.bs.modal', function () {
        $('#wild-new-nickname').val('').trigger('focus');
    });

    $("#wild-rename-button").on("click", renameNewPokemon)

    function renameNewPokemon() {
        let newNickname = $("#wild-new-nickname").val().trim();
        // Use find() to instantly locate the one object we need.
        const pokemonToRename = userPokemon.find(p => p.index === pokemonToEditIndex);
        if (!newNickname) {
            // Use the original species name as the nickname
            pokemonToRename.nickname = pokemonToRename.name;
        } else {
            pokemonToRename.nickname = newNickname;
        }
        $("#wildRenameModal").modal("hide");
        modalIsOpen = false;
        pokemonToEditIndex = null; // Clear the global index
        displayUserPokemon();
    }

});