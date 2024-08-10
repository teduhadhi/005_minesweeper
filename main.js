const level = [
  [9,   9,  10] , // [rows, columns, mines]
  [9,   9,  20] ,
  [16,  9,  50]
]

const tileLayout  = document.querySelector(".tile-layout");
const flagButton  = document.querySelector(".button-flag");
const levelButton = document.querySelectorAll(".button-level");

let flag = false

levelButton.forEach(function(item, index) {
  item.onclick = function() {
    gridLayout(level[index]);
    mineSpreader(level[index])
  }
})


const gridLayout = (level) => {

  gridReset();

  let rows = level[0];
  let cols = level[1];

  tileLayout.style = `grid-template : repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;

  for (let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      
    let tile = document.createElement("p");
    let box = document.createElement("div");

    tile.onclick = tileClick;
    tile.setAttribute("id", `tile-${j}-${i}`);
    
    box.classList.add("tile");

    box.appendChild(tile)
    tileLayout.appendChild(box);
    }
  }
}



const mineSpreader = (level) => {
  let mines = level[2]
    let tilesArray = document.querySelectorAll("p");

    do{
      let tile = tilesArray[Math.floor(Math.random() * tilesArray.length)]
      if(!tile.innerText){
        
        tile.setAttribute("data-status", "marked")
        tile.innerText ="💣"
        mines--;
      }
    } while(mines > 0)
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
  console.log(tile)

  if (flag) {
    if(tile.innerText != "🚩"){
      tile.innerText = "🚩"
    } else if(tile.innerText == "🚩"){
      tile.innerText = ""
    } 
  }

  if (!flag && tile.dataset.status){
    displayMine();
    alert("refresh")
  } else {
    // tileCheck();
  }
}

// recursion tile check

// const tileCheck = () => {
//   let mineCounter = 0;
//   mineCounter += mineCheck(row - 1, col - 1, level)

// }

// const mineCheck = (row, col, level) => {
//   const gridRow = level[0];
//   const gridCol = level[1];
  
//   let tile = document.querySelector(`#tile-${row}-${col}`);
  
//   if (row > gridRow || col > gridCol || row < 0 || col < gridCol){
//     return 0;
//   }
//   if (tile.dataset.status = "marked"){
//     return 1;
//   }
//   return 0;
  
//   // return 0;
// }

const gridReset = () => {
  const grid = document.querySelectorAll(".tile")
  grid.forEach(item => {
    item.remove();
  })  
}

const displayMine = () => {
  const mine = document.querySelectorAll("[data-status]")

  for (let i = 0; i < mine.length; i++){
      mine[i].style.setProperty("opacity", "0")
      mine[i].innerText ="💣"

      setTimeout(() => {
        mine[i].classList.add("fade-in")
      }, (Math.random())*1300 );
  }
}
   
gridLayout(level[0]);

flagButton.onclick = flagFeature

// const loadAnimation = (level) => {
//   const tile = document.querySelectorAll(".tile")
//  console.log(tile)

//   // for (let i = 0; i < row; i++){

//   // }
// }



// loadAnimation()







