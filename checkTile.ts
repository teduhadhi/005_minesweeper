const checkTile = (() =>{
  const checkMine = (minesArray: string[], target: HTMLDivElement, configIndex: number[]) => {
    const gridRow: number = configIndex[0];
    const gridCol: number = configIndex[1];

    let id: string[] = target.id.split("-");
    const row: number = Number(id[0]);
    const col: number = Number(id[1]); 

    let mineCount: number = 0

    if(minesArray.includes(target.id)) {
      alert('duar')
      console.log(configIndex)
    }

    for (let rowIndex = -1; rowIndex <= 1; rowIndex++){
      for (let colIndex = -1; colIndex <= 1; colIndex++){
        mineCount += checkMineNumber(row + rowIndex, col + colIndex, gridRow, gridCol, minesArray);
      }
    }
    
    if (mineCount > 0) target.innerHTML = mineCount.toString()
  }

  const checkMineNumber = (row: number, col: number, gridRow: number, gridCol: number, minesArray: string[]): number => {
    
    let idCheck: string = row.toString().concat("-", col.toString())
    

    if (row < 0 || col < 0 || row > gridRow || col > gridCol){
      return 0;
    } else if (minesArray.includes(idCheck)) {
      console.log(idCheck)
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
