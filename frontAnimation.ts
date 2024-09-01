export const frontAnimation = (frontContainer: HTMLDivElement) => {
	frontContainer.innerHTML = "";

	const rows = Math.floor(frontContainer.clientHeight / 100),
		cols = Math.floor(frontContainer.clientWidth / 100);

	frontContainer.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols},  1fr)`;

	for (let row = 1; row <= rows; row++) {
		for (let column = 1; column <= cols; column++) {
			const frontGrid = document.createElement("div");
			frontGrid.classList.add("front-grid");
			frontContainer.appendChild(frontGrid);
		}
	}

	frontContainer.onclick = () => {
		const title = document.querySelector(".title-container") as HTMLDivElement;
		title.classList.add("zoom-in");
		frontContainer.classList.add("zoom-in");
		for (const tile of frontContainer.children) {
			console.log(tile);
			setTimeout(() => {
				tile.classList.add("transparent");
			}, Math.random() * 1250);
		}

		title.classList.add("transparent");

		setTimeout(() => {
			title.classList.add("display-none");
			frontContainer.classList.add("display-none");
		}, 1750);
	};
};
