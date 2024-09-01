const checkTile = (() => {
	let gridRow: number,
		gridCol: number,
		mines: number,
		minesArray: string[],
		counter: number;

	const tileConfig = (configIndex: number[], mineArray: string[]) => {
		[gridRow, gridCol, mines] = configIndex;
		minesArray = mineArray;
		counter = 0;
	};

	const checkMine = (targetId: string): void => {
		const selectedTile = document.getElementById(
			`${targetId}`
		) as HTMLDivElement;
		const id: string[] = targetId.split("-");
		const [row, col] = id.map((item) => Number(item));

		let mineCount: number = 0;

		if (selectedTile.innerHTML != "🚩") {
			selectedTile.setAttribute("data-status", "checked");

			if (minesArray.includes(targetId)) {
				alert("duar");
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
				alert("cleared");
			}
		}
	};

	const checkMineNumber = (row: number, col: number): number => {
		const idCheck: string = row.toString().concat("-", col.toString());
		if (row < 0 || col < 0 || row >= gridRow || col >= gridCol) {
			return 0;
		} else if (minesArray.includes(idCheck)) {
			return 1;
		} else {
			return 0;
		}
	};

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
	};

	return {
		tileConfig,
		checkMine,
		checkBomb,
	};
})();


export default checkTile;
