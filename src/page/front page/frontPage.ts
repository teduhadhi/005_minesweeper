import switchPage from "../../animation/switchPage";

export const frontAnimation = (levelButtonsContainer: HTMLDivElement) => {
	const frontPageContainer = document.querySelector(".container-front-page") as HTMLDivElement;
	
	const frontPageTilesContainer = document.querySelector(
		".container-front-tiles"
	) as HTMLDivElement;
	frontPageTilesContainer.innerHTML = "";

	let size: number;
	frontPageTilesContainer.clientWidth < 780 ? (size = 100) : (size = 200);
	const rows = Math.floor(frontPageTilesContainer.clientHeight / size),
		cols = Math.floor(frontPageTilesContainer.clientWidth / size);

	frontPageTilesContainer.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols},  1fr)`;

	for (let row = 1; row <= rows; row++) {
		for (let column = 1; column <= cols; column++) {
			const frontGrid = document.createElement("div");
			frontGrid.classList.add("front-tiles");
			frontPageTilesContainer.appendChild(frontGrid);
		}
	}
	const frontTiles = frontPageTilesContainer.children;
	frontPageContainer.onclick = () => {

		switchPage.zoomToFade(frontPageContainer, levelButtonsContainer,1)
		for (const tile of frontTiles) {
			setTimeout(() => {
				tile.classList.add("opaque");
			}, Math.random() * 750);
		}
	};
};
