const inventory = { pokemon: 80, berries: 3, potions: 1, coins: 50 };

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
        count.textContent = inventory.pokemon;
    });
    // these need a foreach to loop through every display of each count
    document.querySelectorAll(".berries-count").forEach(count => {
        count.textContent = inventory.berries;
    });
    document.querySelectorAll(".potions-count").forEach(count => {
        count.textContent = inventory.potions;
    });
    document.querySelectorAll(".coins-count").forEach(count => {
        count.textContent = inventory.coins;
    });
}

updateInventory();