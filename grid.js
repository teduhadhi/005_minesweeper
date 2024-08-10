

const gridReset = () => {
  const grid = document.querySelectorAll(".tile")
  grid.forEach(item => {
    item.remove();
  })  
}

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


