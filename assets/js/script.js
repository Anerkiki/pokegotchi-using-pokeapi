$(document).ready(function() {

    // Global Variables
    let userPokemon = [];

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

    // Used in the goForAWalk & addWalkResultsToInventory functions
    let lastBerryWalkResult = 0;
    let lastPotionWalkResult = 0;
    // Used in openReleaseModal & releasePokemon functions
    let pokemonToReleaseIndex = null;

    // Functions to be called on page-load
    updateInventory();
    addPersonalitiesToStarterChoices();

    // Event Handlers
    $("#add-first-pokemon").on("click", addStarterPokemon);
    // Walk handlers
    $("#walk-button").on("click", goForAWalk);
    $("#add-walk-items").on("click", addWalkResultsToInventory);
    // Remove/release event handlers
    $("#pokemon-collection").on("click", ".release-pokemon", openReleaseModal);
    $("#confirm-release-button").on("click", releasePokemon);

    // all handlers below are not connected to working functions yet

    // Rename pokemon event handlers - to link later
    $("#pokemon-collection").on("click", ".rename-pokemon", openRenameModal);
    $("#confirm-rename-button").on("click", renamePokemon);

    $("#action-pet").on("click", petPokemon);
    $("#action-feed-berry").on("click", feedBerry);
    $("#action-feed-potion").on("click", feedPotion);
    $("#action-battle").on("click", battleInArena);
    // LATER - ADD onclick handler to add checked to radio of starter parent element clicked
    
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

    // Functions that happen when triggered by certain events
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
        let nicknameInput = $("#pokemonNickname").val().trim();
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

                updateInventory();
                displayUserPokemon();

                $("#starter-options-form").addClass("hidden");
                $("#walk-button").removeClass("hidden");

                console.log("Starter chosen:", userPokemon);
            })
            .catch(error => {
                console.error("Error fetching Pokémon:", error);
            });
    }

    // Triggered once first pokemon is chosen
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
                                        <button id="action-pet" class="dropdown-item"
                                            aria-label="Pet ${pokemon.nickname} to increase it's happiness bar">Pet</button>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <button id="action-feed-berry" class="dropdown-item"
                                            aria-label="Feed a berry to ${pokemon.nickname} to increase it's hunger bar">Feed Berry</button>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <button id="action-feed-potion" class="dropdown-item"
                                            aria-label="Feed a potion to ${pokemon.nickname} to increase it's health bar">Feed Potion</button>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <button id="action-battle" class="dropdown-item"
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

    function goForAWalk () {

        // generate random pokemon name from user's pokemon collection
        const randomPokemon = Math.floor(Math.random() * userPokemon.length);
        // add the random pokemon nickname to the text in the modal
        $("#randomUserPokemon").text(capitalizeWords(userPokemon[randomPokemon].nickname));

        // Set the walk results:

        // Generating a random number between 2 and 10 for berries and between 2 and 3 for potions
        lastBerryWalkResult = Math.floor(Math.random() * 9) + 2; // 2 - 10
        lastPotionWalkResult = Math.floor(Math.random() * 4) + 2; // 2 - 5

        let results = lastBerryWalkResult + " berries"

        if (lastBerryWalkResult < 4) {
            results += " and " + lastPotionWalkResult + " potions"
        } else {
            lastPotionWalkResult = 0;
        }

        // TO ADD LATER: Random Pokémon Encounter as an option on walks
        // if pokemon level < 10, default to above code
        // else pokemon encounter chance - change the whole inner HTML of modal to 
        // randomised pokemon (from API) encounter

        // the results of the walk:

        // updating the inner text
        $("#walk-results").text(results);
        // displaying the modal
        $("#walkResults").modal("show");
    }

    function addWalkResultsToInventory () {
        inventory.berries = inventory.berries + lastBerryWalkResult;
        inventory.potions = inventory.potions + lastPotionWalkResult;
        updateInventory();
    }

    // Remove/release functions
    function openReleaseModal() {
    // Find the index of the clicked Pokémon
    const uniqueIndex = parseInt($(this).closest(".pokemon-card").data("index"));

    // Store the index globally so releasePokemon can access it
    pokemonToReleaseIndex = uniqueIndex;

    console.log(pokemonToReleaseIndex);
    // This is now showing as the unique index number

    // Show the modal
    $("#releaseModal").modal("show");
    }

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

    // Future functions - to link in later
    function renamePokemon () {
        //
    }

    function petPokemon () {
        //
    }

    function feedBerry () {
        //
    }

    function feedPotion () {
        //
    }

    function battleInArena () {
        //
    }

});