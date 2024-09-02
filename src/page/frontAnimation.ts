export const frontAnimation = (frontContainer: HTMLDivElement, levelButtonsContainer: HTMLDivElement) => {
	frontContainer.innerHTML = "";

	let size;
	frontContainer.clientWidth < 780 ? (size = 100) : (size = 200);
	const rows = Math.floor(frontContainer.clientHeight / size),
		cols = Math.floor(frontContainer.clientWidth / size);

	frontContainer.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols},  1fr)`;

	for (let row = 1; row <= rows; row++) {
		for (let column = 1; column <= cols; column++) {
			const frontGrid = document.createElement("div");
			frontGrid.classList.add("front-grid");
			frontContainer.appendChild(frontGrid);
		}
	}
	const frontTiles = frontContainer.children;
	frontContainer.onclick = () => {
		const title = document.querySelector(".title-container") as HTMLDivElement;


		title.classList.add("zoom-out");
		frontContainer.classList.add("zoom-out");
		for (const tile of frontTiles) {
			setTimeout(() => {
				tile.classList.add("opaque");
			}, Math.random() * 1250);
		}

		title.classList.add("opaque");
		setTimeout(() => {
			levelButtonsContainer.classList.add("fade-in")
		}, 1250);
		
	};
};
