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

    // Get the selected starter (radio value as string)
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
        nickname = species; // fallback = "1", "4", or "7"
    }

    // Add new Pokémon object to the array
    userPokemon.push({
        species: species,   // stays string
        nickname: nickname
    });

    updateInventory();
    displayUserPokemon();

    $("#starter-options-form").addClass("hidden");
    $("#walk-button").removeClass("hidden");

    console.log("Starter chosen:", userPokemon);
    console.log("Inventory:", inventory);
}

function displayUserPokemon() {
    if (userPokemon.length > 0) {
        let html = "";

        // Loop through all Pokémon in the userPokemon array
        for (const pokemon of userPokemon) {
            html += `
              <div class="page-section"><h3>${pokemon.nickname} the ${pokemon.species}</h3>
              <button class="delete-button">Delete</button></div>
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