const health = document.getElementById("health");
const ammo = document.getElementById("ammo");
const food = document.getElementById("food");
const water = document.getElementById("water");
const distance = document.getElementById("distance");
const story = document.getElementById("story");

const day = document.getElementById("day");
const location = document.getElementById("location");
const healthBar = document.getElementById("healthBar");

const player = {
    health: 10,
    ammo: 6,
    food: 3,
    water: 3,
    distance: 0,
    day: 1,
    location: "Mohaine Desert"
};

function update() {

    if (health) health.textContent = player.health;
    if (ammo) ammo.textContent = player.ammo;
    if (food) food.textContent = player.food;
    if (water) water.textContent = player.water;
    if (distance) distance.textContent = player.distance;

    if (day) day.textContent = player.day;
    if (location) location.textContent = player.location;

    if (healthBar) {
        healthBar.style.width = (player.health * 10) + "%";
    }

    localStorage.setItem("gunslingerSave", JSON.stringify(player));
}

function write(text) {
    if (story) {
        story.innerHTML += "<p>" + text + "</p>";
        story.scrollTop = story.scrollHeight;
    }
}

function travel() {

    player.distance += 5;
    player.day++;
    player.food--;
    player.water--;

    const roll = Math.random();

    if (roll < 0.3) {

        fight();

    } else if (roll < 0.5) {

        player.water++;
        write("You discover a small spring.");

    } else {

        write("The desert stretches endlessly before you.");

    }

    update();
}

function rest() {

    player.health = Math.min(10, player.health + 2);

    write("You rest beneath the stars.");

    update();
}

function hunt() {

    if (player.ammo <= 0) {

        write("You have no ammunition.");
        return;

    }

    player.ammo--;
    player.food += 2;

    write("You hunt successfully.");

    update();
}

function fight() {

    if (player.ammo <= 0) {

        player.health -= 2;

        write("A mutant attacks. You have no bullets!");

        update();

        return;

    }

    player.ammo--;

    if (Math.random() < 0.7) {

        write("You kill the mutant with a single shot.");

    } else {

        player.health -= 2;

        write("The mutant wounds you before escaping.");

    }

    update();
}

function inventory() {

    alert(
`Inventory

🔫 Revolver

Ammo: ${player.ammo}

🥩 Food: ${player.food}

💧 Water: ${player.water}

❤️ Health: ${player.health}/10`
    );

}

const save = localStorage.getItem("gunslingerSave");

if (save) {

    Object.assign(player, JSON.parse(save));

    write("Game loaded.");

}

update();