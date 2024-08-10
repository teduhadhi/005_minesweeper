// import { tileClick } from "./tile.js";
import { mineSpreader, displayMine } from "./mines.js";

const levelConfig = [
  [9,   9,  10] , // [rows, columns, mines]
  [9,   9,  20] ,
  [16,  9,  50]
]

const levelButton = document.querySelectorAll(".button-level");
const tileLayout  = document.querySelector(".tile-layout");
const flagButton  = document.querySelector(".button-flag");

let rows, cols;
let flag = false


levelButton.forEach(function(item, index) {
  item.onclick = function() {
  const grid        = document.querySelectorAll(".tile")
  grid.forEach(item => {
    item.remove();
  })

  rows = levelConfig[index][0];
  cols = levelConfig[index][1];
  // level = levelConfig[index]

  gameStart();
  const tilesArray  = document.querySelectorAll("p");
  mineSpreader(levelConfig[index], tilesArray)
  }
})


const gameStart = () => {

  tileLayout.style = `grid-template : repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;
  for (let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      
    let tile = document.createElement("p");
    let box = document.createElement("div");

    tile.onclick = tileClick;
    tile.setAttribute("id", `tile-${j}-${i}`);
    
    box.classList.add("tile");
    tile.classList.add("test")

    box.appendChild(tile)
    tileLayout.appendChild(box);
    }
  }
}

const flagFeature = () => {
  if (!flag) {
    flag = true;
    flagButton.classList.add("active")
  } else {
    flag = false;
    flagButton.classList.remove("active")
  }
}

const tileClick = (event) => {
  let tile = event.target;

  if (flag) {
    if(tile.innerText != "🚩"){
      tile.innerText = "🚩"
    } else if(tile.innerText == "🚩"){
      tile.innerText = ""
    } 
  }
  const markedTiles = document.querySelectorAll("[data-status]")

  if (!flag && !tile.dataset.status){

    let tileId = tile.id

    let row = parseInt(tileId.split("-")[1])
    let col = parseInt(tileId.split("-")[2])

    
    tile.innerText = tileCheck(row, col)
    console.log(tile)
  } 


  if (!flag && tile.dataset.status){
    displayMine(markedTiles);
  } 
}


flagButton.onclick = flagFeature

const tileCheck = (row, col) => {
  let mineCounter = 0;

  let tile = document.querySelector(`#tile-${row}-${col}`);

  if (row > rows - 1|| col > cols - 1 || row < 0 || col < 0){
    return 0;
  }

  if (tile.classList.value.includes("checked")){
    return "";
  }

  tile.classList.add("checked")
 


  mineCounter += mineCheck(row - 1, col + 1);
  mineCounter += mineCheck(row + 1, col + 1);

  mineCounter += mineCheck(row - 1, col);
  mineCounter += mineCheck(row + 1, col);

  mineCounter += mineCheck(row - 1, col - 1);
  mineCounter += mineCheck(row + 1, col - 1)

  mineCounter += mineCheck(row , col - 1)
  mineCounter += mineCheck(row , col + 1);

  

  if (mineCounter > 0) {
    return mineCounter;

  } else {
    tileCheck(row - 1, col + 1);
    tileCheck(row + 1, col + 1);
  
    tileCheck(row - 1, col);
    tileCheck(row + 1, col);
  
    tileCheck(row - 1, col - 1);
    tileCheck(row + 1, col - 1)
  
    tileCheck(row , col - 1)
    tileCheck(row , col + 1);
    return "";
  }
}

const mineCheck = (row, col) => {

  if (row > rows - 1|| col > cols - 1 || row < 0 || col < 0){
    return 0;
  }
  let tile = document.querySelector(`#tile-${row}-${col}`);

  if (tile.dataset.status == "marked"){
    return 1;
  }
  return 0;
}











   
// gridLayout(level[0]);

// flagButton.onclick = flagFeature

// // const loadAnimation = (level) => {
// //   const tile = document.querySelectorAll(".tile")
// //  console.log(tile)

// //   // for (let i = 0; i < row; i++){

// //   // }
// // }



// // loadAnimation()

