import checkTile from "./checkTile";

export const checkFlagged = (targetId: string, configIndex: number[]): void => {
  const id: string[] = targetId.split("-");
  const [row, col] = id.map((item) => Number(item));

  let [gridRow, gridCol] = configIndex;

  let mineCounter: number = 0;
  let flagCounter: number = 0;
  let misplacedFlag: number = 0;

  for (let rowIndex = -1; rowIndex <= 1; rowIndex++) {
    for (let colIndex = -1; colIndex <= 1; colIndex++) {
      let newRow = row + rowIndex;
      let newCol = col + colIndex;

      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= gridRow ||
        newCol >= gridCol ||
        (rowIndex == 0 && colIndex == 0)
      ) {
        continue;
      }
      const newTargetId = newRow.toString().concat("-", newCol.toString());
      const selectedTile = document.getElementById(
        `${newTargetId}`
      ) as HTMLDivElement;

      const isAMineExist =
        selectedTile.attributes["data-status"]?.value == "mine";
      const isFlagged = selectedTile.innerHTML == "🏴";
      const isChecked =
        selectedTile.attributes["data-status"]?.value == "checked";

      if (isAMineExist) {
        mineCounter++;
        if (!isFlagged) {
          misplacedFlag++;
        }
      }
      if (isFlagged) {
        flagCounter++;
      }
      if (flagCounter >= mineCounter && !isChecked && !isFlagged) {
        checkTile.checkMine(newTargetId)
      }
    }
  }
  if (flagCounter >= mineCounter && misplacedFlag > 0) {
    alert("duar");
  }
};