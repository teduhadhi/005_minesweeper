const mineSpreads = (() => {
  const mineSet = (config: number[], tiles: HTMLCollection) : string[] => {
    let [rows, cols, mines] = config; 
    let minesArray: string[] = []

    while(mines > 0){
      let row: number = Math.floor(Math.random() * rows);
      let col: number = Math.floor(Math.random() * cols);
      let id: string = row.toString().concat("-", col.toString())
      if (!minesArray.includes(id)){
        minesArray.push(id);
        mines--;
      }
    }
    
    for (const tile of tiles){
      if (minesArray.includes(tile.id)){
        // const item: HTMLParagraphElement = document.createElement("p");
        // tile.innerHTML = "test";
        // tile.appendChild(item);
        tile.setAttribute("data-status", "mine");
        }
      }
      return minesArray;
    }

  return {mineSet}
})();

export default mineSpreads;