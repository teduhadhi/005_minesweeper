
const gridLayout = (() => {
  const gridCreate = (level : number[], gridContainer : HTMLDivElement): void => {
    gridContainer.innerHTML = "";

    const rows: number = level[0];
    const cols: number = level[1];

    gridContainer.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`
  
    for (let row: number = 0; row < rows; row++) {
      for (let col: number = 0; col < cols; col++ ) {
        const gridTile: HTMLDivElement = document.createElement("div");
        // const gridItem: HTMLParagraphElement = document.createElement("p");
        
        gridTile.classList.add("grid-tile")
        // gridItem.classList.add("grid-item")
        
        // gridTile.appendChild(gridItem);
        gridContainer.appendChild(gridTile);
      }
    }
  }

  return {gridCreate}
})();

export default gridLayout;


