const checkBomb = (targetId:string) => {

  for (let rowIndex = -1; rowIndex <= 1; rowIndex++) {
    for (let colIndex = -1; colIndex <= 1; colIndex++) {
      const targetId: string = rowIndex.toString().concat("-", colIndex.toString());
      const selectedTile = document.getElementById(
        `${targetId}`
      ) as HTMLDivElement;
    }
  }
};

export default checkBomb