export const gridLayout = (
	configIndex: number[],
	gridContainer: HTMLDivElement
): HTMLCollection => {
	gridContainer.innerHTML = "";

	const [rows, cols] = configIndex;

	gridContainer.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;

	for (let row: number = 0; row < rows; row++) {
		for (let col: number = 0; col < cols; col++) {
			const gridTile: HTMLDivElement = document.createElement("div");
			gridTile.classList.add("grid-tile");
			gridTile.id = `${row}-${col}`;
			gridContainer.appendChild(gridTile);
		}
	}

	return gridContainer.children;
};
