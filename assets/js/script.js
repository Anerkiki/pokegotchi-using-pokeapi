$(document).ready(function() {

    const userPokemon = [];

    const inventory = {
        pokemon: userPokemon.length,
        berries: 0,
        potions: 0,
    };

    const pokemonPersonality = [
        "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful",
        "Docile", "Gentle", "Hardy", "Hasty", "Impish", "Jolly",
        "Lonely", "Mild", "Modest", "Naive", "Naughty", "Quiet",
        "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
    ];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function capitalizeWords(str) {
        return str
            .split(" ")
            .map(word => capitalizeFirstLetter(word))
            .join(" ");
    }

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

    updateInventory();

    function addPersonalitiesToStarterChoices () {
        let personality1 = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];
        let personality4 = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];
        let personality7 = pokemonPersonality[Math.floor(Math.random() * pokemonPersonality.length)];

        $(".starter-personality-1").text(personality1);
        $(".starter-personality-4").text(personality4);
        $(".starter-personality-7").text(personality7);
    }

    addPersonalitiesToStarterChoices();

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

        // Get nickname or default to species string
        let nicknameInput = $("#pokemonNickname").val().trim();

        let personality = $(`.starter-personality-${species}`).first().text();

        let level = 1;

        // Fetch Pokémon data from PokéAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${species}/`)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.name;
                const spriteUrl = data.sprites.front_default;
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
                    species: species,
                    name: pokemonName,
                    sprite: spriteUrl,
                    nickname: nickname,
                    type: primaryType,
                    personality: personality,
                    level: level,
                });

                updateInventory();
                displayUserPokemon();

                $("#starter-options-form").addClass("hidden");
                $("#walk-button").removeClass("hidden");

                console.log("Starter chosen:", userPokemon);
                console.log("Inventory:", inventory);
            })
            .catch(error => {
                console.error("Error fetching Pokémon:", error);
            });
    }

    function displayUserPokemon() {
        if (userPokemon.length > 0) {
            let html = "";

            // Loop through all Pokémon in the userPokemon array
            for (const pokemon of userPokemon) {
                html += `
                    <div class="col-12 col-lg-6">
                        <div class="pokemon-card">

                            <h2 class="mb-1">${capitalizeWords(pokemon.nickname)} the ${capitalizeWords(pokemon.name)}</h2>

                            <div class = "row justify-content-center text-start">
                                    <p>Level: ${pokemon.level}</p>
                                    <p>Type: ${capitalizeFirstLetter(pokemon.type)}</p>
                                    <p>Personality: ${pokemon.personality}</p>
                                    
                                    <img src="${pokemon.sprite}" class="img-responsive col-4 col-sm-5" alt="${pokemon.name}">

                                <div class="col-11 col-sm-6">
                                
                                    <div>
                                        <p><label for="happiness">Happiness:</label></p>
                                        <progress id="happiness" max="100" value="70">70%</progress>
                                    </div>
                                    <div>
                                        <p><label for="health">Health:</label></p>
                                        <progress id="health" max="100" value="80">80%</progress>
                                    </div>
                                    <div>
                                        <p><label for="hunger">Hunger:</label></p>
                                        <progress id="happiness" max="100" value="50">50%</progress>
                                    </div>

                                </div>

                            </div>

                            <div>
                                <button type="button" class="btn-lg dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Interact with ${capitalizeWords(pokemon.nickname)}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a href="" class="dropdown-item"
                                            aria-label="">Pet</a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <a href="" class="dropdown-item"
                                            aria-label="">Feed Berry</a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <a href="" class="dropdown-item"
                                            aria-label="">Feed Potion</a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <a href="" class="dropdown-item"
                                            aria-label="">Battle in Arena</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <button class="rename" type="button">Rename</button>
                                <button class="delete" type="button">Delete</button>
                            </div>
                        </div>
                    </div>`;
                
            }

            // Replace #allPokemon content with the current list
            $("#allPokemon").html(html);
        } else {
            $("#starter-options-form").removeClass("hidden");
            $("#walk-button").addClass("hidden");
        }
    }

    // These need to be created outside of the goForAWalk function so that the variables are global and 
    // can also be used in the addWalkResultsToInventory function
    let lastBerryWalkResult = 0;
    let lastPotionWalkResult = 0;

    $("#walk-button").on("click", goForAWalk);
    $("#add-walk-items").on("click", addWalkResultsToInventory);

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
});