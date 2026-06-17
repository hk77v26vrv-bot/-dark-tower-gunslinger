alert("game.js loaded");
const player={
health:10,
ammo:6,
food:3,
water:3,
distance:0
};

function update(){

health.textContent=player.health;
ammo.textContent=player.ammo;
food.textContent=player.food;
water.textContent=player.water;
distance.textContent=player.distance;

localStorage.setItem("gunslingerSave",JSON.stringify(player));

}

function write(text){
story.innerHTML+="<p>"+text+"</p>";
story.scrollTop=story.scrollHeight;
}

function travel(){

player.distance+=5;
player.food--;
player.water--;

const roll=Math.random();

if(roll<0.3){

fight();

}else if(roll<0.5){

player.water++;
write("You discover a small spring.");

}else{

write("The desert stretches endlessly before you.");

}

update();

}

function rest(){

player.health=Math.min(10,player.health+2);
write("You rest beneath the stars.");
update();

}

function hunt(){

if(player.ammo<=0){

write("You have no ammunition.");
return;

}

player.ammo--;
player.food+=2;

write("You hunt successfully.");

update();

}

function fight(){

if(player.ammo<=0){

player.health-=2;
write("A mutant attacks. You have no bullets!");
update();
return;

}

player.ammo--;

if(Math.random()<0.7){

write("You kill the mutant with a single shot.");

}else{

player.health-=2;
write("The mutant wounds you before escaping.");

}

update();

}

const save=localStorage.getItem("gunslingerSave");

if(save){

Object.assign(player,JSON.parse(save));
write("Game loaded.");

}

update();
