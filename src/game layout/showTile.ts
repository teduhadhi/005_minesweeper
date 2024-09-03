const showTile = (() => {
	const showMine = (minesArray: string[], targetId: string) => {
		for (const index in minesArray) {
			const tile = document.getElementById(minesArray[index]) as HTMLDivElement;
			const item: HTMLParagraphElement = document.createElement("p");

			if (tile.innerHTML != "🏴") {
				item.innerHTML = "&#11044";
				item.classList.add("mine");
				tile.appendChild(item);
			}

			if (minesArray[index] == targetId) {
				item.style.animation = "fade 0.2s ease-in forwards";
				tile.classList.add("exploded");
			} else {
				setTimeout(() => {
					item.style.animation = "fade 0.2s ease-in forwards";
					tile.classList.add("gray");
				}, 750 + Math.log(Number(index) + 1) * 250);
			}
		}
	};

	const showMisplacedFlag = () => {
		const misplacedFlagArray = document.querySelectorAll(
			".misplaced"
		) as NodeListOf<HTMLParagraphElement>;
		for (const tile of misplacedFlagArray) {
			tile.innerHTML = "&#10799;";
			tile.style.animation = "fade 0.05s ease-in forwards";
		}
	};
	return { showMine, showMisplacedFlag };
})();

export default showTile;
