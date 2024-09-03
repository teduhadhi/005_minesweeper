import checkTile from "./checkTile";

export const checkFlagged = (targetId: string, configIndex: number[]): void => {
	const id: string[] = targetId.split("-");
	const [row, col] = id.map((item) => Number(item));

	let [gridRow, gridCol] = configIndex;

	let mineCounter: number = 0;
	let flagCounter: number = 0;
	let targetList: string[] = [];

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
			targetList.push(newTargetId);
			const isAMineExist =
				selectedTile.attributes["data-content"]?.value == "mine";
			const isFlagged = selectedTile.innerHTML == "🏴";
			if (isAMineExist) {
				mineCounter++;
			}
			if (isFlagged) {
				flagCounter++;
				if(!isAMineExist) {
					const item: HTMLParagraphElement = document.createElement("p");
					item.classList.add("misplaced")
					selectedTile.appendChild(item)
				}
					
					
			}
		}
	}
	if (mineCounter <= flagCounter && flagCounter >= 1) {
		targetList.forEach((target) => {
			checkTile.checkMine(target);
		});
	}
};
