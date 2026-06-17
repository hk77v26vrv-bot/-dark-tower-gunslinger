const player = {
    day: 1,
    location: "Mohaine Desert",
    distance: 0,
    health: 10,
    ammo: 6,
    food: 3,
    water: 3
};

// Grab HTML elements
const day = document.getElementById("day");
const location = document.getElementById("location");
const distance = document.getElementById("distance");
const ammo = document.getElementById("ammo");
const food = document.getElementById("food");
const water = document.getElementById("water");
const healthBar = document.getElementById("healthBar");
const story = document.getElementById("story");

// Grab buttons
const travelBtn = document.getElementById("travelBtn");
const restBtn = document.getElementById("restBtn");
const huntBtn = document.getElementById("huntBtn");
const inventoryBtn = document.getElementById("inventoryBtn");

// Update screen
function updateScreen() {

    day.textContent = player.day;
    location.textContent = player.location;
    distance.textContent = player.distance + " miles";
    ammo.textContent = player.ammo;
    food.textContent = player.food;
    water.textContent = player.water;

    healthBar.style.width = (player.health * 10) + "%";

    localStorage.setItem("gunslingerSave", JSON.stringify(player));
}

// Add text to story
function write(text) {

    story.innerHTML += `<p>${text}</p>`;
    story.scrollTop = story.scrollHeight;

}

// Travel
function travel() {

    player.day++;
    player.distance += 5;
    player.food--;
    player.water--;

    const roll = Math.random();

    if (roll < 0.25) {

        write("A mutant watches you from a distant dune.");

    } else if (roll < 0.50) {

        player.water++;
        write("You discover a tiny spring hidden among the rocks.");

    } else if (roll < 0.75) {

        write("The desert stretches endlessly before you.");

    } else {

        player.food++;
        write("You find an abandoned camp with edible supplies.");

    }

    if (player.food < 0) player.food = 0;
    if (player.water < 0) player.water = 0;

    updateScreen();

}

// Rest
function rest() {

    player.health = Math.min(10, player.health + 2);

    write("You sleep beneath the cold desert stars.");

    updateScreen();

}

// Hunt
function hunt() {

    if (player.ammo <= 0) {

        write("You have no ammunition.");

        return;

    }

    player.ammo--;

    if (Math.random() < 0.7) {

        player.food += 2;

        write("You bring down a desert hare.");

    } else {

        write("Your shot echoes across the desert.");

    }

    updateScreen();

}

// Inventory
function inventory() {

    alert(
`Inventory

🔫 Revolver

Ammo: ${player.ammo}

🥩 Food: ${player.food}

💧 Water: ${player.water}

❤️ Health: ${player.health}/10

📅 Day: ${player.day}`
    );

}

// Button events
travelBtn.addEventListener("click", travel);
restBtn.addEventListener("click", rest);
huntBtn.addEventListener("click", hunt);
inventoryBtn.addEventListener("click", inventory);

// Load save
const save = localStorage.getItem("gunslingerSave");

if (save) {

    Object.assign(player, JSON.parse(save));

    write("Previous journey loaded.");

}

updateScreen();