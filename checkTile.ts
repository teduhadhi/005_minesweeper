const checkTile = (() =>{
  const checkMine = (minesArray: string[], targetId: string, configIndex: number[]) : void => {
    const selectedTile = document.getElementById(`${targetId}`) as HTMLDivElement;

    console.log(targetId)


    const gridRow: number = configIndex[0];
    const gridCol: number = configIndex[1];

    let id: string[] = targetId.split("-");
    const row: number = Number(id[0]);
    const col: number = Number(id[1]); 

    let mineCount: number = 0

    if(minesArray.includes(targetId)) {
      alert("duar")
    }

    if(!selectedTile.classList.contains("gray")){
      for (let rowIndex = -1; rowIndex <= 1; rowIndex++){
        for (let colIndex = -1; colIndex <= 1; colIndex++){
          mineCount += checkMineNumber(row + rowIndex, col + colIndex, gridRow, gridCol, minesArray);
        }
      }
      
      if (mineCount > 0) {
      selectedTile.innerHTML = mineCount.toString();
      } else {
        selectedTile.classList.add("gray")
        for (let rowIndex = -1; rowIndex <= 1; rowIndex++){
          for (let colIndex = -1; colIndex <= 1; colIndex++){
            let newRow = row + rowIndex;
            let newCol = col + colIndex;

            if (newRow >= 0 && newCol >= 0 && newRow < gridRow && newCol < gridCol){
              let newTargetId = newRow.toString().concat("-", newCol.toString())
              checkMine(minesArray, newTargetId, configIndex);} 
          }
        }
      }
    }
  }

  const checkMineNumber = (row: number, col: number, gridRow: number, gridCol: number, minesArray: string[]): number => {
    
    let idCheck: string = row.toString().concat("-", col.toString())
    
    if (row < 0 || col < 0 || row > gridRow || col > gridCol){
      return 0;
    } else if (minesArray.includes(idCheck)) {
      return 1;
    } else {
      return 0;
    }

  }
  return{
    checkMine
  }

})()

export default checkTile;
