const mineSpreads = (() => {
  const mineSet = (config: number[], tiles: HTMLCollection) : string[] => {
    const rows: number = config[0];
    const cols: number = config[1];
    let mineNumber: number = config[2];
    let minesArray: string[] = []

    while(mineNumber > 0){
      let row: number = Math.floor(Math.random() * rows);
      let col: number = Math.floor(Math.random() * cols);
      let id: string = row.toString().concat("-", col.toString())
      if (!minesArray.includes(id)){
        minesArray.push(id);
        mineNumber--;
      }
    }
    
    for (const tile of tiles){
      if (minesArray.includes(tile.id)){
        const item: HTMLParagraphElement = document.createElement("p");
        item.innerHTML = "test";
        tile.appendChild(item);
        tile.setAttribute("data-status", "marked");
        }
      }
      return minesArray;
    }

  return {mineSet}
})();

export default mineSpreads;