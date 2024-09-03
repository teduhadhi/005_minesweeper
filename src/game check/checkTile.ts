import checkGamge from "./checkGame";

const checkTile = (() => {
	let gridRow: number,
		gridCol: number,
		mines: number,
		minesArray: string[],
		counter: number,
		gameOver: boolean = false;

	const tileConfig = (configIndex: number[], mineArray: string[]) => {
		[gridRow, gridCol, mines] = configIndex;
		minesArray = mineArray;
		counter = 0;
		gameOver = false;
	};

	const checkMine = (targetId: string): void => {
		const selectedTile = document.getElementById(
			`${targetId}`
		) as HTMLDivElement;
		const id: string[] = targetId.split("-");
		const [row, col] = id.map((item) => Number(item));

		let mineCount: number = 0;

		if (!selectedTile.innerHTML.includes("🏴")) {
			selectedTile.setAttribute("data-status", "checked");

			if (minesArray.includes(targetId)) {
				if (!gameOver) {
					checkGamge.gameOver(false, minesArray, targetId);
					(gameOver = true);
				}
				return;
			}

			if (!selectedTile.classList.contains("gray")) {
				for (let rowIndex = -1; rowIndex <= 1; rowIndex++) {
					for (let colIndex = -1; colIndex <= 1; colIndex++) {
						mineCount += checkMineNumber(row + rowIndex, col + colIndex);
					}
				}

				if (mineCount > 0) {
					selectedTile.innerHTML = mineCount.toString();
					if (!selectedTile.classList.contains("x")) {
						counter++;
					}
					selectedTile.classList.add("x");
				} else {
					selectedTile.classList.add("gray");
					counter++;
					for (let rowIndex = -1; rowIndex <= 1; rowIndex++) {
						for (let colIndex = -1; colIndex <= 1; colIndex++) {
							let newRow = row + rowIndex;
							let newCol = col + colIndex;
							if (
								newRow >= 0 &&
								newCol >= 0 &&
								newRow < gridRow &&
								newCol < gridCol
							) {
								let newTargetId = newRow
									.toString()
									.concat("-", newCol.toString());
								checkMine(newTargetId);
							}
						}
					}
				}
			}
			if (counter == gridRow * gridCol - mines) {
				if (!gameOver) checkGamge.gameOver(true), (gameOver = true);
			}
		}
	};

	const checkMineNumber = (row: number, col: number): number => {
		const idCheck: string = row.toString().concat("-", col.toString());
		if (row < 0 || col < 0 || row > gridRow || col > gridCol) {
			return 0;
		} else if (minesArray.includes(idCheck)) {
			return 1;
		} else {
			return 0;
		}
	};

	return {
		tileConfig,
		checkMine,
	};
})();

export default checkTile;
