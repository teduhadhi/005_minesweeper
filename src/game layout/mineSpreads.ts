const mineSpreads = (() => {
	const mineSet = (config: number[], tiles: HTMLCollection): string[] => {
		let [rows, cols, mines] = config;
		let minesArray: string[] = [];

		while (mines > 0) {
			let row: number = Math.floor(Math.random() * rows);
			let col: number = Math.floor(Math.random() * cols);
			let id: string = row.toString().concat("-", col.toString());
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

	const showMine = (minesArray: string[], targetId: string) => {
		for (const id of minesArray) {
			const tile = document.getElementById(id) as HTMLDivElement;
			const item: HTMLParagraphElement = document.createElement("p");
      
			item.innerHTML = "&#11044";
			item.classList.add("mine");
      tile.appendChild(item);

			let timer: number = 0;
			while (timer < 0.5) {
				timer = Math.random();
			}

			if (id == targetId) {
				item.style.animation = "fade 0.2s ease-in forwards";
			}

			setTimeout(() => {
				item.style.animation = "fade 0.2s ease-in forwards";
			}, timer * 1250);
		}
	};

	return { mineSet, showMine };
})();

export default mineSpreads;
