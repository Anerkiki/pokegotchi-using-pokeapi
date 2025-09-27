const userPokemon = [];

const inventory = {
    pokemon: userPokemon.length,
    berries: 0,
    potions: 0
};

const petPersonality = [
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

$("#walk-button").on("click", goForAWalk);

function goForAWalk () {
    $("#walkResults").modal("show");
}