export const mineSpreads = (
	config: number[],
	tiles: HTMLCollection
): string[] => {
	let [rows, cols, mines] = config;
	let minesArray: string[] = [];

	while (mines > 0) {
		const row: number = Math.floor(Math.random() * rows);
		const col: number = Math.floor(Math.random() * cols);
		const id: string = row.toString().concat("-", col.toString());
		if (!minesArray.includes(id)) {
			minesArray.push(id);
			mines--;
		}
	}

	for (const tile of tiles) {
		if (minesArray.includes(tile.id)) {
			tile.setAttribute("data-content", "mine");
		}
	}
	return minesArray;
};
