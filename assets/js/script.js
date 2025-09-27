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
        // these need a foreach to loop through every display of each count
        document.querySelectorAll(".berries-count").forEach(count => {
            count.textContent = inventory.berries;
        });
        document.querySelectorAll(".potions-count").forEach(count => {
            count.textContent = inventory.potions;
        });
    }

    updateInventory();

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
        let nickname = $("#pokemonNickname").val().trim();
        if (!nickname) {
            nickname = species; // fallback if user leaves blank
        }

        // Fetch Pokémon data from PokéAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${species}/`)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.name;
                const spriteUrl = data.sprites.front_default;
                // Just the first type
                const primaryType = data.types[0].type.name;

                userPokemon.push({
                    species: species,
                    name: pokemonName,
                    sprite: spriteUrl,
                    nickname: nickname,
                    type: primaryType,
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
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="pokemon-card">
                            <h3>${capitalizeWords(pokemon.nickname)} the ${capitalizeWords(pokemon.name)}</h3>
                            <div class="row justify-content-center">
                                <img src="${pokemon.sprite}" 
                                    class="sprite img-fluid col-6 col-md-12 order-2 order-md-1" alt="pixelated image of ${pokemon.name}">
                                <div class="details col-4 col-md-12 order-1 order-md-2 align-self-center">
                                    <p>Level: 1</p>
                                    <p>Type: ${capitalizeFirstLetter(pokemon.type)}</p>
                                    <p>Personality: ...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Replace #allPokemon content with the current list
            $("#allPokemon").html(html);
        } else {
            $("#starter-options-form").removeClass("hidden");
            $("#walk-button").addClass("hidden");
        }
    }

    $("#walk-button").on("click", goForAWalk);

    function goForAWalk () {
        $("#walkResults").modal("show");
    }

});