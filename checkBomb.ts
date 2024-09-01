const checkBomb = (targetId: string): void => {
  const id: string[] = targetId.split("-");
  const [row, col] = id.map((item) => Number(item));

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

      const mineExist =
        selectedTile.attributes["data-status"]?.value == "mine";

      const flagExist = selectedTile.innerHTML == "🚩";
      const tileChecked =
        selectedTile.attributes["data-status"]?.value == "checked";

      if (mineExist) {
        mineCounter++;
        if (!flagExist) {
          misplacedFlag++;
        }
      }
      if (flagExist) {
        flagCounter++;
      }
      if (flagCounter >= mineCounter && !tileChecked && !flagExist) {
        selectedTile.classList.add("gray");
        selectedTile.setAttribute("data-status", "checked");
        counter++
        if (counter == gridRow * gridCol - mines) {
          alert("cleared");
        }
      }
    }
  }
  if (flagCounter >= mineCounter && misplacedFlag > 0) {
    alert("duar");
  }
  console.log(
    "Mine ",
    mineCounter,
    ", Flag ",
    flagCounter,
    ",misplaced ",
    misplacedFlag
  );
};
