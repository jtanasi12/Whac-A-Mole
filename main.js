// Variable declarations 
let currentMoleTile;
let currentMoleClicked = false;
let currentPlantTile;
let currentPlantTile2;
let score = 0;
let interval1;
let interval2;
let interval3;
let gameOver = false;
let intervalSpeed1 = 1500;
let intervalSpeed2 = 2000;
let marioBGMusic = new Audio("Music/mario-bg.mp3");
let marioDeathFX = new Audio("Music/mario-death.mp3");
let playMusic = false;
let playButtonWasSelected = false;




// Event Handler declarations 

let marioMusic = document.querySelector("#music-button");

marioMusic.addEventListener("click", ()=>{

    playButtonWasSelected = true;

    if(!playMusic){

        marioMusic.innerHTML = "Pause Music";
        marioBGMusic.play();
        playMusic = true;
    }
    else{
        marioMusic.innerHTML = "Play Music";
        marioBGMusic.pause();
        playMusic = false;
    }
  
});

const reset = document.querySelector("#reset-button");

reset.addEventListener("click", event =>{

    if(playMusic){
        marioBGMusic.pause();
        marioBGMusic.currentTime = 0;
        marioBGMusic.play();
    }
  
    if(playButtonWasSelected && !playMusic){
        marioBGMusic.pause();
        marioBGMusic.currentTime = 0;
    }

   score = 0;
   document.getElementById("score").innerHTML = "Score: " + score.toString();

   if(gameOver){
    gameOver = false;
   }
 
   console.log("Reset Triggered")

   clearInterval(interval1);
   clearInterval(interval2);

   currentPlantTile.innerHTML = "";
   currentMoleTile.innerHTML = "";
   runGame();
  
});

    window.onload = function(){
    setGame();
}

// Create 9 tiles and name then 0-8 and place them inside the board div

function setGame(){
    
    
    for(let index = 0; index < 9; index++){

        let tile = document.createElement("div");

        tile.id = index.toString();

         tile.addEventListener("click", selectTile);

        document.getElementById("board").appendChild(tile);
    }

    interval1 = setInterval(setMole, intervalSpeed1); // Every 1 seconds we set the mole randomly
    interval2 =  setInterval(setPlant, intervalSpeed2); // Every 2 seconds we set the plant randomly

}
// Generate a random number 0 to 8 
function getRandomTile(){
    let num = Math.floor(Math.random() * 9); // generate 9 tiles

    return num.toString();
}

function setMole(){

    // Each time the mole moves this
    currentMoleClicked = false; 

    if(gameOver){
        return;
    }
    // If there is a current Mole, clear it and then we will set another one
    if(currentMoleTile){
        currentMoleTile.innerHTML = "";
    }
        
    // Create an image element and load it with the mole
    let mole = document.createElement("img");
    mole.src = "Images/monty-mole.png"
    
    // Generate random number that corresponds to a tile
    let randomTile = getRandomTile();

    if (currentPlantTile && currentPlantTile.id == randomTile) {
        return;
    }
    
    // Create a pointer to the tile that we randomly generated 
    currentMoleTile = document.getElementById(randomTile);


    // Place a div inside of the tile div with the mole
    currentMoleTile.appendChild(mole);

    currentMoleTile.firstChild
}

function setPlant(){

    if(gameOver){
        return;

    }
    
    //If the current plant tile exist, we get rid of it
    if(currentPlantTile){
        currentPlantTile.innerHTML = "";
    }

    // Load the plant image 
    let plant = document.createElement("img");
    plant.src = "Images/piranha-plant.png"; 
 

    // Generate random tile 
    let randomTile = getRandomTile(); 


    if (currentMoleTile && currentMoleTile.id == randomTile) {
        return;
    }
    // Randomly load a tile from 0 to 8
    currentPlantTile = document.getElementById(randomTile);
   

    // Add the plant as a child img element under the tile
    currentPlantTile.appendChild(plant);
   

}

function selectTile(){
  
    if(gameOver){
        return;
    }
    // this refers to the current tile that was clicked 
    // If we click on a tile with the mole on it then we increase the score
  
      if(!currentMoleClicked){
        if(this == currentMoleTile){

            let marioCoinFX = new Audio("Music/mario-coin.mp3");
            marioCoinFX.play();
            score += 10;

            // Keep track if the current mole is clicked 
            currentMoleClicked = true;

            //update score 
            document.getElementById("score").innerHTML = "Score: " + score.toString();
        }
   

    else if(this == currentPlantTile){
        document.getElementById("score").innerHTML = "GAME OVER: " + score.toString();
        gameOver = true;
        marioBGMusic.pause();
        marioDeathFX.play();

    }
      }
}

function runGame(){
    if(!gameOver){
      
        interval1 = setInterval(setMole, intervalSpeed1); // Every 1 seconds we set the mole randomly
        interval2 = setInterval(setPlant, intervalSpeed2); // Every 1 seconds we set the plant randomly
        interval3 = setInterval(setPlant, intervalSpeed2 );
    }
 
}

