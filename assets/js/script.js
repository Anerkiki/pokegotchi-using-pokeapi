$(document).ready(function () {

    // Global Variables

    // Where collected pokémon are stored/removed from
    let userPokemon = []; 

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

    // Used in goForAWalk and addWalkResultsToInventory functions
    let lastBerryWalkResult = 0;
    let lastPotionWalkResult = 0;
    // Used in release and rename functions:
    let pokemonToEditIndex = null;
    // Used when finding a wild pokémon to store species number
    let wildSpeciesNum = null;
    // To ensure multiple modals can't be opened at the same time
    let modalIsOpen = false;

    // Event listener to change state of modalIsOpen when a modal is closed with a cancel/confirm button
    $(".cancel-modal-button, .confirm-modal-button").on("click", updateModalStateToClosed);
    
    // Functions called when page loads
    updateInventory();
    addNewPersonalitiesToStarters();

    // Basic Functions
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function capitalizeWords(str) {
        return str
            .split(" ")
            .map(word => capitalizeFirstLetter(word))
            .join(" ");
    }

    function updateModalStateToClosed () {
        modalIsOpen = false;
    }

    function updateModalStateToOpen () {
        modalIsOpen = true;
    }

    // Functions that fire on startup
    function updateInventory() {
        // These need a forEach to loop through as they are displayed in more than 1 place
        document.querySelectorAll(".pokemon-count").forEach(count => {
            count.textContent = userPokemon.length;
        });
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
            // Loop through all pokémon in the userPokemon array
            for (const pokemon of userPokemon) {
                currentUserPokemon += `
                    <div class="col-12 col-lg-6 col-xxl-4">
                        <div class="pokemon-card" data-index="${pokemon.index}">

                            <h2 class="mb-1">${capitalizeWords(pokemon.nickname)}<br>the ${capitalizeWords(pokemon.name)}</h2>

                            <div class = "row justify-content-center text-start">
                                    <div class="details">
                                        <p class="level">Level: ${pokemon.level}</p>
                                        <p>Type: ${capitalizeFirstLetter(pokemon.type)}</p>
                                        <p class="personality">Personality: ${pokemon.personality}</p>
                                    </div>
                                    <img src="${pokemon.image_front}" class="col-12 col-md-6" alt="${pokemon.name}">
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
            // Replace #pokemon-collection content with updated list
            $("#pokemon-collection").html(currentUserPokemon);
        } else {
            // If the last pokémon has been deleted, this ensures the userCollection shows as empty/0
            $("#pokemon-collection").html("");
            // Reset the starter form page
            $("#starter-options-form").removeClass("hidden");
            $("#walk-button").addClass("hidden");
            $("#add-first-pokemon").prop("disabled", false).text("Add To Collection");
            $("#refresh-personalities-nav").removeClass("hidden");
            $("#starter-nickname").focus();
        }
    }

    // Functions with Handlers

    // This means users can use ESC/ENTER keys to interact with modals
    document.addEventListener('keydown', handleModalKeyActions);
    function handleModalKeyActions(event) {
        const currentlyOpenModal = document.querySelector('.modal.show');
        // Bootstrap adds the 'show' class to a modal when it is visible
        // so this checks to find the modal that is currently open
        if (modalIsOpen && currentlyOpenModal) {
            if (event.key === 'Escape') {
                event.preventDefault();
                currentlyOpenModal.querySelector('.cancel-modal-button').click();
            } else if (event.key === 'Enter') {
                event.preventDefault();
                currentlyOpenModal.querySelector('.confirm-modal-button, .continue-modal-button').click();
            }

        }
        // testing ------------------------------------------------------------------------------------- REMOVE LATER
        console.log(modalIsOpen);
        // testing ------------------------------------------------------------------------------------- REMOVE LATER
    }

    $(".starter").on("click", selectAndStyleStarter);
    // This function allows the initial selection to be made by clicking anywhere inside the starter box,
    // not only on the radio/name label and also adds a class to highlight the selected starter pokémon box
    function selectAndStyleStarter() {
        // This is necessary to remove highlight from previously checked starters
        // so they don't all end up highlighted if more are clicked
        $(".starter").removeClass("selected-starter");
        // Find and select the radio that is a child of the div clicked on
        const radio = $(this).find('input[type="radio"]')
        radio.prop("checked", true);
        // Adds the highlight to selected starter div
        $(this).addClass("selected-starter");
    }

    $("#add-first-pokemon").on("click", addStarterPokemon);

    function addStarterPokemon(event) {
        event.preventDefault();
        // Get the selected starter value
        const species = $("input[name='starter']:checked").val();
        // If no starter selected, show modal and stop
        if (!species) {
            $("#alertModal .main-modal-content").text("You need to pick a pokémon!");
            $("#alertModal").modal("show");
            updateModalStateToOpen();
            return;
        }
        // Disables button so double clicks don't work and changes text so the user knows click has worked
        $("#add-first-pokemon").prop("disabled", true).text("Adding...");
        let nicknameInput = $("#starter-nickname").val().trim();
        let personality = $(`.starter-personality-${species}`).first().text();
        let level = 1;
        let happiness = 80;
        let health = 80;
        let hunger = 80;
        let uniqueIndex = Date.now();
        // Fetch pokémon data from PokéAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${species}/`)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.name;
                const imageFront = data.sprites.front_default;
                const imageBack = data.sprites.back_default;
                // Just the first type
                const primaryType = data.types[0].type.name;
                // Get nickname or default to species string
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
                // Remove starter choice form and 'Refresh Personality' buttons
                $("#starter-options-form").addClass("hidden");
                $("#refresh-personalities-nav").addClass("hidden");
                $("#refresh-personalities-main").addClass("hidden");
                // Add 'Go For A Walk' button
                $("#walk-button").removeClass("hidden");
                // testing ------------------------------------------------------------------------------------- REMOVE LATER
                // To double check details of new pokémon added
                console.log("Starter chosen:", userPokemon);
                // testing ------------------------------------------------------------------------------------- REMOVE LATER
            })
            .catch(error => {
                console.error("Error fetching pokémon:", error);
                // If there is an error with the fetch, the button won't stay disabled
                $("#add-first-pokemon").prop("disabled", false).text("Error - Try Again!");
            });
    }

    // Remove/release functions

    $("#pokemon-collection").on("click", ".release-pokemon", openReleaseModal);

    function openReleaseModal() {
        // Find the index of the clicked pokémon
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        // Store the index globally so releasePokemon can access it
        pokemonToEditIndex = uniqueIndex;
        $("#releaseModal").modal("show");
        updateModalStateToOpen();
    }

    $("#confirm-release-button").on("click", releasePokemon);

    function releasePokemon() {
        if (userPokemon.length === 1) {
            userPokemon = [];
            // Clear the nickname input box
            $("#starter-nickname").val("");
            // Deselect the radio
            $('input[name="starter"]').prop('checked', false);
            // Remove visual highlight
            $(".starter").removeClass("selected-starter");
            addNewPersonalitiesToStarters();
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
        updateModalStateToClosed();
        pokemonToEditIndex = null;
        updateInventory();
        displayUserPokemon();
    }

    // Rename functions

    $("#pokemon-collection").on("click", ".rename-pokemon", openRenameModal);

    function openRenameModal() {
        // Find the index of the clicked pokémon
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        // Find the pokémon object to get its current nickname
        // find() is like doing a for loop through all of the userPokemon array
        const pokemonToRename = userPokemon.find(pokemon => pokemon.index === uniqueIndex);
        // Store the index globally so releasePokemon can access it
        pokemonToEditIndex = uniqueIndex;
        // Pre-fill the modal input with original nickname
        $("#new-nickname").val(capitalizeWords(pokemonToRename.nickname));
        $("#renameModal").modal("show");
        updateModalStateToOpen();
    }

    $("#rename-button").on("click", renamePokemon);

    function renamePokemon() {
        let newNickname = $("#new-nickname").val().trim();
        // Use find() to instantly locate the one object we need
        const pokemonToRename = userPokemon.find(p => p.index === pokemonToEditIndex);
        if (!newNickname) {
            // Use the original species name as the nickname
            pokemonToRename.nickname = pokemonToRename.name;
        } else {
            pokemonToRename.nickname = newNickname;
        }
        $("#renameModal").modal("hide");
        updateModalStateToClosed();
        // Clear the global index
        pokemonToEditIndex = null;
        displayUserPokemon();
    }

    // Action/Interaction functions

    $("#pokemon-collection").on("click", ".action-play", actionPlay);

    function actionPlay() {
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                // Math.min will always find the minimum value, so if the first value is set to 100 then no
                // matter how high the new happiness value gets after playing, it won't ever exceed 100
                pokemon.happiness = Math.min(100, pokemon.happiness + 15);
                // This will stop cycling through the list of pokémon once the correct one has been found
                break;
            }
        }
        displayUserPokemon();
    }

    $("#pokemon-collection").on("click", ".action-berry", actionBerry);

    function actionBerry() {
        // A safeguard to prevent the multiple open modals issue
        if (modalIsOpen) {
            return; 
        }
        if (inventory.berries < 1) {
            $("#alertModal .main-modal-content").html("<p class='larger-font'>You don't have any&nbsp;berries!</p><p>(Try going for a walk to&nbsp;find&nbsp;some)<p>");
            $("#alertModal").modal("show");
            updateModalStateToOpen();
        } else {
            const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
            for (let pokemon of userPokemon) {
                if (pokemon.index === uniqueIndex) {
                    if (pokemon.hunger === 100) {
                        $("#alertModal .main-modal-content").text("Your pokémon is now full!");
                        $("#alertModal").modal("show");
                        updateModalStateToOpen();
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
        // A safeguard to prevent the multiple open modals issue
        if (modalIsOpen) {
            return; 
        }
        if (inventory.potions < 1) {
            $("#alertModal .main-modal-content").html("<p class='larger-font'>You don't have any&nbsp;potions!</p><p>(Potions are rare, so you may have to go on a few walks to&nbsp;find&nbsp;some)</p>");
            $("#alertModal").modal("show");
            updateModalStateToOpen();
        } else {
            const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
            for (let pokemon of userPokemon) {
                if (pokemon.index === uniqueIndex) {
                    if (pokemon.health === 100) {
                        $("#alertModal .main-modal-content").text("Your pokémon is now at full health.");
                        $("#alertModal").modal("show");
                        updateModalStateToOpen();
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
        // A safeguard to prevent the multiple open modals issue
        if (modalIsOpen) {
            return; 
        }
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                if (pokemon.health < 20) {
                    pokemon.happiness = Math.max(0, pokemon.happiness - 5);
                    $("#alertModal .main-modal-content").html("<p class='larger-font'>Your pokémon needs to heal before anymore training!</p><p>(Try giving them a potion)</p>");
                    $("#alertModal").modal("show");
                    updateModalStateToOpen();
                } else if (pokemon.hunger < 20) {
                    pokemon.happiness = Math.max(0, pokemon.happiness - 10);
                    $("#alertModal .main-modal-content").html("<p class='larger-font'>Your pokémon is too hungry to train!</p><p>(Try feeding them some berries)</p>");
                    $("#alertModal").modal("show");
                    updateModalStateToOpen();
                } else {
                    // Math.max will always find the maximum value, so if the first value is set to 0 then no
                    // matter how low the health value gets from battling, it won't ever be less than 0
                    pokemon.health = Math.max(0, pokemon.health - 10);
                    pokemon.hunger = Math.max(0, pokemon.hunger - 20);
                    pokemon.level = pokemon.level + 1;
                    break;
                }
            }
        }
        displayUserPokemon();
    }

    // 'Go For A Walk' button functions

    $("#walk-button").on("click", goForAWalk);

    function goForAWalk() {
        // A safeguard to prevent the multiple open modals issue
        if (modalIsOpen) {
            return;
        }
        // Generate random pokémon from user's pokémon collection
        const randomPokemon = Math.floor(Math.random() * userPokemon.length);
        // Generate random number
        let randomNumber = Math.floor(Math.random() * 5);
        if (userPokemon[randomPokemon].level > 4 && randomNumber === 3) {
            walkDisturbance();
        } else {
            // Set the walk results
            lastBerryWalkResult = Math.floor(Math.random() * 9) + 2; // 2 - 10
            lastPotionWalkResult = Math.floor(Math.random() * 4) + 2; // 2 - 5
            // Results to display in modal
            let results = lastBerryWalkResult + " berries"
            if (lastBerryWalkResult < 5) {
                results += " and " + lastPotionWalkResult + " potions"
            } else {
                lastPotionWalkResult = 0;
            }
            // Updating the modal:
            // Add the random pokémon nickname to the text in the modal
            $("#random-user-pokemon").text(capitalizeWords(userPokemon[randomPokemon].nickname));
            // Add image to modal (reversed to look like user is walking behind pokémon)
            $("#walk-image").html(`<img src="${userPokemon[randomPokemon].image_back}" alt="pixelated image of ${userPokemon[randomPokemon].name}">`)
            // Update the inner text of walk results modal
            $("#walk-results").text(results);
            $("#walkResultsModal").modal("show");
            updateModalStateToOpen();
        }
    }

    $("#add-walk-items").on("click", addWalkResultsToInventory);

    function addWalkResultsToInventory() {
        inventory.berries = inventory.berries + lastBerryWalkResult;
        inventory.potions = inventory.potions + lastPotionWalkResult;
        updateInventory();
        updateModalStateToClosed;
    }

    function walkDisturbance() {
        $("#walkDisturbanceModal .main-modal-content").text("You hear a rustling coming from the long grass.");
        $("#walkDisturbanceModal").modal("show");
        updateModalStateToOpen();
    }

    $("#investigate-button").on("click", surpriseEncounter);

    function surpriseEncounter() {
        // Don't need to update modalIsOpen state here as this function closes and opens a modal
        $("#walkDisturbanceModal").modal("hide");
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
                // Adding the new details to the modal
                let results = `<img src="${imageFront}" alt="${pokemonName}">`
                results += `<p>A wild ${capitalizeWords(pokemonName)} appears in front of you. What do you do?<p>`
                $("#wildEncounterModal .main-modal-content").html(results);
                // Don't need to update modalIsOpen state here as this function closes and opens a modal
                $("#wildEncounterModal").modal("show");
                // Update displays in HTML
                updateInventory();
                displayUserPokemon();
            })
            .catch(error => {
                console.error("Error fetching pokémon:", error);
            });
    }

    $("#adopt-button").on("click", addWildPokemon);

    function addWildPokemon() {
        const speciesNumber = wildSpeciesNum;
        let personality = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];
        // Generate random level between 1 and 5
        let level = Math.floor(Math.random() * 5) + 1;
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
                // Finds only the first type
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
                // Update pokémon to edit index to new pokémon for renaming
                pokemonToEditIndex = uniqueIndex;
                // Update displays in HTML
                updateInventory();
                displayUserPokemon();
                // testing ------------------------------------------------------------------------------------- REMOVE LATER
                // To double check details of new pokémon added
                console.log("New pokemon added:", userPokemon);
                // testing ------------------------------------------------------------------------------------- REMOVE LATER
                $("#wildRenameModal").modal("show");
                updateModalStateToOpen();
            })
            .catch(error => {
                console.error("Error fetching pokémon:", error);
            });
    }

    // Anonymous function to clear old wild pokémon nickname from bootstrap modal and add focus to input box
    // - only triggered once modal and input are fully loaded and visible
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
        updateModalStateToClosed();
        // Clear the global index
        pokemonToEditIndex = null;
        displayUserPokemon();
    }

});