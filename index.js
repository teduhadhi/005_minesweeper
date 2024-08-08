const level = [
  [9,   9,  2] , // [rows, columns, difficulty (1 - 10)]
  [9,   9,  3] ,
  [16,  9,  4]
]

const tileLayout = document.querySelector(".tile-layout");


const gridLayout = (level) => {

  gridChecker();

  let rows = level[0];
  let cols = level[1];
  let tileId = 0;

  tileLayout.style = `grid-template : repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;

  for (let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      
    const tile = document.createElement("p");

    tile.setAttribute("id", `tile-${tileId}`);
    tile.classList.add("tile");
    tileLayout.appendChild(tile);
    tileId++
    }
  }
}


const mineSpreader = (level) => {
  let difficulty = level[2] * 0.1;
    let tilesArray = document.querySelectorAll(".tile");

    tilesArray.forEach(selectedTile => {
      let spreader = Math.random();
      if (difficulty > spreader) {
        selectedTile.innerText = "X";
        }
      })
      mineIndicator(level)
      gameTest();
}



const gridChecker = () => {
  const grid = document.querySelectorAll("p")
  grid.forEach(item => {
    item.remove();
  })  
}


const buttonArray = document.querySelectorAll(".button-level");
buttonArray.forEach(function(item, index) {
item.onclick = function() {
  gridLayout(level[index]);
  mineSpreader(level[index])
}
})

let mineContainer = "";


const mineIndicator = (level) => {
  let tilesArray = document.querySelectorAll(".tile");
  let cols = level[0];
  let rows = level[1];

  tilesArray.forEach(function(selectedTile,index) {

  if(!selectedTile.innerText){
    let safeCoordinate = mineCoordinate(cols, rows, index);
    let selectedTile = document.querySelector(`#tile-${index}`);
    
      switch (true) {

        case safeCoordinate[0]:
          safeLocation = tileTop(safeCoordinate);
          break;

        case safeCoordinate[1]:
          safeLocation = tileRight(safeCoordinate);
        break;

        case safeCoordinate[2]:
          safeLocation = tileBottom(safeCoordinate);
        break;

        case safeCoordinate[3]:
          safeLocation = coordinate.left
        break;
      
        default:
          safeLocation = coordinate.middle
          break;
      }
      mineCounter(safeLocation, tilesArray, index, selectedTile)
    }
  })
}
         
const coordinate = {
 top          : [-1, 1, 8, 9 ,10],
 topRight     : [-1, 8, 9],
 right        : [-10, -9, -1, 8, 9],
 bottomRight  : [-10, -9, -1],
 bottom       : [-10, -9, -8, -1, 1],
 bottomLeft   : [-9, -8, 1,],
 left         : [-9, -8, 1, 9 ,10],
 topLeft      : [1, 9 ,10],
 middle       : [-10, -9, -8, -1, 1, 8, 9, 10],
}


const tileTop = (index) => {
  if (index[1]){
    safeLocation = coordinate.topRight

  } else if(index[3]) {
    safeLocation = coordinate.topLeft

  } else {
    safeLocation = coordinate.top
  } 
  return safeLocation
}


const tileRight = (index) => {
  if (index[2]){
    safeLocation = coordinate.bottomRight

  } else {
    safeLocation = coordinate.right
  } 
  return safeLocation
}


const tileBottom = (index) => {
if (index[3]){
    safeLocation = coordinate.bottomLeft
  } else {
    safeLocation = coordinate.bottom
  }
  return safeLocation
}


const mineCounter = (indicator, array, index, selectedTile) => {
  indicator.forEach(item => { 
    const mineCheck = array[index+item].innerText;
    if (mineCheck == "X"){
      mineContainer = mineContainer.concat(mineCheck);
    }
  })
  const mineNumber = mineContainer.length
  const theTile = selectedTile
  if (mineNumber !=0){
    theTile.innerText = mineNumber
  }
    mineContainer = "";
}


  const mineCoordinate = (cols, rows, index) => {
    const top     = index < cols; ;
    const right   = (index + 1) % cols == 0 ;
    const bottom  = index > (cols * (rows - 1)) - 1 ;
    const left    = index % cols == 0 ;

    let location = [top, right, bottom, left];

    return location
  }
   

gridLayout(level[0]);


const gameTest = () => {
  const tile = document.querySelectorAll("p");

tile.forEach(item =>{
  item.onclick =function () {
    if (item.innerText == "X"){
      alert("duar")
    }
  }
})
}









