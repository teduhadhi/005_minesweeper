const level = [
  [9,   9,  10] , // [rows, columns, mines]
  [9,   9,  20] ,
  [16,  9,  50]
]

const levelButton = document.querySelectorAll(".button-level");
const tileLayout  = document.querySelector(".tile-layout");

levelButton.forEach(function(item, index) {
  item.onclick = function() {
    gridLayout(level[index]);
    mineSpreader(level[index])
  }
})

const startGame = () => {
  
}






// const flagButton  = document.querySelector(".button-flag");


// let flag = false



// const flagFeature = () => {
//   if (!flag) {
//     flag = true;
//     flagButton.classList.add("active")
//   } else {
//     flag = false;
//     flagButton.classList.remove("active")
//   }
// }



// const tileClick = (event) => {
//   let tile = event.target;
//   console.log(tile)

//   if (flag) {
//     if(tile.innerText != "🚩"){
//       tile.innerText = "🚩"
//     } else if(tile.innerText == "🚩"){
//       tile.innerText = ""
//     } 
//   }

//   if (!flag && tile.dataset.status){
//     displayMine();
//     alert("refresh")
//   } else {
//     // tileCheck();
//   }
// }

// // recursion tile check

// // const tileCheck = () => {
// //   let mineCounter = 0;
// //   mineCounter += mineCheck(row - 1, col - 1, level)

// // }

// // const mineCheck = (row, col, level) => {
// //   const gridRow = level[0];
// //   const gridCol = level[1];
  
// //   let tile = document.querySelector(`#tile-${row}-${col}`);
  
// //   if (row > gridRow || col > gridCol || row < 0 || col < gridCol){
// //     return 0;
// //   }
// //   if (tile.dataset.status = "marked"){
// //     return 1;
// //   }
// //   return 0;
  
// //   // return 0;
// // }




   
// gridLayout(level[0]);

// flagButton.onclick = flagFeature

// // const loadAnimation = (level) => {
// //   const tile = document.querySelectorAll(".tile")
// //  console.log(tile)

// //   // for (let i = 0; i < row; i++){

// //   // }
// // }



// // loadAnimation()







