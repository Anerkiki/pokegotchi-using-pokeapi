$(document).ready(function() {

    // Global Variables

    let userPokemon = []; // This is where collected pokemon are stored/removed from

    const inventory = {
        pokemon: userPokemon.length,
        berries: 0,
        potions: 0,
    };

    const pokemonPersonality = [
        "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful",
        "Docile", "Gentle", "Hardy", "Hasty", "Impish", "Jolly",
        "Loud", "Mild", "Modest", "Naive", "Naughty", "Quiet",
        "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
    ];

    let lastBerryWalkResult = 0; // Used in goForAWalk & addWalkResultsToInventory functions
    let lastPotionWalkResult = 0; // Used in goForAWalk & addWalkResultsToInventory functions
    let pokemonToReleaseIndex = null; // Used in openReleaseModal & releasePokemon functions

    // Functions called when page loads
    updateInventory();
    addPersonalitiesToStarterChoices();

    // Basic Text-conversion Functions
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

    function addPersonalitiesToStarterChoices () {
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
                    <div class="col-12 col-lg-6">
                        <div class="pokemon-card" data-index="${pokemon.index}">

                            <h2 class="mb-1">${capitalizeWords(pokemon.nickname)} the ${capitalizeWords(pokemon.name)}</h2>

                            <div class = "row justify-content-center text-start">
                                    <p>Level: ${pokemon.level}</p>
                                    <p>Type: ${capitalizeFirstLetter(pokemon.type)}</p>
                                    <p>Personality: ${pokemon.personality}</p>
                                    
                                    <img src="${pokemon.image}" class="img-responsive col-4 col-sm-5" alt="${pokemon.name}">

                                <div class="progress-bars col-11 col-sm-6">
                                    <div>
                                        <p><label for="happiness">Happiness:</label></p>
                                        <progress id="happiness" max="100" value="${pokemon.happiness}"></progress>
                                    </div>
                                    <div>
                                        <p><label for="health">Health:</label></p>
                                        <progress id="health" max="100" value="${pokemon.health}"></progress>
                                    </div>
                                    <div>
                                        <p><label for="hunger">Hunger:</label></p>
                                        <progress id="hunger" max="100" value="${pokemon.hunger}"></progress>
                                    </div>
                                </div>

                            </div>

                            <div>
                                <button type="button" class="btn-lg dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Interact with ${capitalizeWords(pokemon.nickname)}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button class="action-pet dropdown-item"
                                            aria-label="Pet ${pokemon.nickname} to increase it's happiness bar">Pet</button>
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
                                        <button class="action-battle dropdown-item"
                                            aria-label="Battle with ${pokemon.nickname} to increase it's level">Battle in Arena</button>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <button class="rename-pokemon" type="button">
                                    Rename ${capitalizeWords(pokemon.nickname)}
                                </button>
                                <button class="release-pokemon" type="button">
                                    Release ${capitalizeWords(pokemon.nickname)}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
            // Replace #pokemon-collection content with the current list
            $("#pokemon-collection").html(currentUserPokemon);
        } else {
            // Clears any old pokemon from the HTML
            $("#pokemon-collection").html("");

            $("#starter-options-form").removeClass("hidden");
            $("#walk-button").addClass("hidden");
        }
    }

    // Functions with Handlers

    $("#add-first-pokemon").on("click", addStarterPokemon);

    function addStarterPokemon(event) {
        event.preventDefault();
        // Get the selected starter radio value
        const species = $("input[name='starter']:checked").val();
        // If no starter selected, show modal and stop
        if (!species) {
            $("#errorModal .modal-body").text("You need to pick a Pokémon!");
            $("#errorModal").modal("show");
            return;
        }
        // In case new pokemon is slow to load, so the user knows the click has worked
        $("#add-first-pokemon>h3").text("Adding...");
        // Get nickname or default to species string
        let nicknameInput = $("#pokemon-nickname").val().trim();
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
                const imageUrl = data.sprites.front_default;
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
                    image: imageUrl,
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
                // To double check details of new pokémon added
                console.log("Starter chosen:", userPokemon);
            })
            .catch(error => {
                console.error("Error fetching Pokémon:", error);
            });
    }

    // Remove/release functions

    $("#pokemon-collection").on("click", ".release-pokemon", openReleaseModal);

    function openReleaseModal() {
        // Find the index of the clicked Pokémon
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        // Store the index globally so releasePokemon can access it
        pokemonToReleaseIndex = uniqueIndex;
        // Show the modal
        $("#releaseModal").modal("show");
    }

    $("#confirm-release-button").on("click", releasePokemon);

    function releasePokemon() {
        if (userPokemon.length === 1) {
            userPokemon = [];
            // Reset the text on the choose starter button back
            $("#add-first-pokemon>h3").text("Add To Collection")
        } else {
            let newPokemonArray = [];
            for (let i = 0; i < userPokemon.length; i++) {
                let pokemon = userPokemon[i];

                if (pokemon.index !== pokemonToReleaseIndex) {
                    newPokemonArray.push(pokemon);
                }
            }
            userPokemon = newPokemonArray;
        }
        $("#releaseModal").modal("hide"); 
        pokemonToReleaseIndex = null;
        updateInventory();
        displayUserPokemon();
    }

    // Rename functions

    $("#pokemon-collection").on("click", ".rename-pokemon", openRenameModal);

    function openRenameModal () {
        // TO COMPLETE
    }

    $("#confirm-rename-button").on("click", renamePokemon);

    function renamePokemon () {
        // TO COMPLETE
    }

    // Walk button functions

    $("#walk-button").on("click", goForAWalk);

    function goForAWalk () {
        // generate random pokemon name from user's pokemon collection
        const randomPokemon = Math.floor(Math.random() * userPokemon.length);
        // add the random pokemon nickname to the text in the modal
        $("#random-user-pokemon").text(capitalizeWords(userPokemon[randomPokemon].nickname));
        // Set the walk results:
        lastBerryWalkResult = Math.floor(Math.random() * 9) + 2; // 2 - 10
        lastPotionWalkResult = Math.floor(Math.random() * 4) + 2; // 2 - 5
        // results to display in modal:
        let results = lastBerryWalkResult + " berries"
        if (lastBerryWalkResult < 4) {
            results += " and " + lastPotionWalkResult + " potions"
        } else {
            lastPotionWalkResult = 0;
        }
        // updating the inner text
        $("#walk-results").text(results);
        // displaying the modal
        $("#walkResultsModal").modal("show");
    }

    $("#add-walk-items").on("click", addWalkResultsToInventory);

    function addWalkResultsToInventory () {
        inventory.berries = inventory.berries + lastBerryWalkResult;
        inventory.potions = inventory.potions + lastPotionWalkResult;
        updateInventory();
    }

    // Action/Interaction functions

    $("#pokemon-collection").on("click", ".action-pet", actionPet);

    function actionPet () {
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                // Math.min will always find the minimum value, so if the
                // first value is set to 100 then no matter how high the new
                // happiness value gets after petting, it won't ever exceed 100
                pokemon.happiness = Math.min(100, pokemon.happiness + 5);
                // this stops it cycling through the rest of the
                // pokemon once the correct one has been found
                break;
            }
        }
        displayUserPokemon();
    }

    $("#pokemon-collection").on("click", ".action-berry", actionBerry);

    function actionBerry () {
        if (inventory.berries < 1) {
            $("#errorModal .modal-body").text("You don't have any berries! Try going for a walk to find more.");
            $("#errorModal").modal("show");
        } else {
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                if (pokemon.hunger === 100) {
                    $("#errorModal .modal-body").text("Your pokémon is now full!");
                    $("#errorModal").modal("show");
                } else {
                pokemon.hunger = Math.min(100, pokemon.hunger + 5);
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

    function actionPotion () {
        if (inventory.potions < 1) {
            $("#errorModal .modal-body").text("You don't have any potions! Potions are rarer than berries, so you may have to go on more walks to find some.");
            $("#errorModal").modal("show");
        } else {
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                if (pokemon.health === 100) {
                    $("#errorModal .modal-body").text("Your pokémon is now at full health.");
                    $("#errorModal").modal("show");
                } else {
                pokemon.health = Math.min(100, pokemon.health + 5);
                inventory.potions = inventory.potions - 1;
                break;
                }
            }
        }
        displayUserPokemon();
        updateInventory();
        }
    }

    $("#pokemon-collection").on("click", ".action-battle", actionBattle);

    function actionBattle () {
        const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));
        for (let pokemon of userPokemon) {
            if (pokemon.index === uniqueIndex) {
                // Math.max will always find the maximum value, so if the
                // first value is set to 0 then no matter how low the health
                // value gets from battling, it won't ever be less than 0
                pokemon.health = Math.max(0, pokemon.health - 10);
                pokemon.level = pokemon.level + 0.5;
                break;
            }
        }
        displayUserPokemon();
    }

});