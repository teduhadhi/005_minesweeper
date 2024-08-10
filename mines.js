

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

// const displayMine = () => {
//   const mine = document.querySelectorAll("[data-status]")

//   for (let i = 0; i < mine.length; i++){
//       mine[i].style.setProperty("opacity", "0")
//       mine[i].innerText ="💣"

//       setTimeout(() => {
//         mine[i].classList.add("fade-in")
//       }, (Math.random())*1300 );
//   }
// }

