

export const mineSpreader = (level, tilesArray) => {
  let mines = level[2]
    do{
      let tile = tilesArray[Math.floor(Math.random() * tilesArray.length)]
      if(!tile.innerText){
        tile.setAttribute("data-status", "marked")
        tile.innerText ="💣"
        mines--;
      }
    } while(mines > 0)
}

export const displayMine = (markedTiles) => {
  for (let i = 0; i < markedTiles.length; i++){
      markedTiles[i].style.setProperty("opacity", "0")
      markedTiles[i].innerText ="💣"

      setTimeout(() => {
        markedTiles[i].classList.add("fade-in")
      }, (Math.random())*1300 );
  }
}

