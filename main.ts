import gridLayout from "./src/game layout/gridLayout";
import mineSpreads from "./src/game layout/mineSpreads";
import checkTile from "./src/game check/checkTile";
import { frontAnimation } from "./src/page/frontAnimation";

const LEVEL_CONFIG: number[][] = [
	[9, 9, 10],
	[9, 9, 20],
	[16, 9, 40],
];

const gridContainer = document.querySelector(
	".grid-container"
) as HTMLDivElement;
const levelButtonsContainer = document.querySelector(
	".level-select-container"
) as HTMLDivElement;
const levelButtons = document.querySelectorAll(
	".button-level"
) as NodeListOf<HTMLButtonElement>;
const flagButton = document.querySelector(".button-flag") as HTMLButtonElement;
const frontContainer = document.querySelector(".front") as HTMLDivElement;
const gameBoard = document.querySelector(".display-board") as HTMLDivElement;

let flagStatus: boolean = false;
let minesArray: string[] = [];
let configIndex: number[] = [];
let gridArray = gridContainer.children as HTMLCollection;

frontAnimation(frontContainer, levelButtonsContainer);
window.onresize = () => frontAnimation(frontContainer, levelButtonsContainer);

levelButtons.forEach(function (button, index) {
	button.onclick = (): number[] => {
		gameBoard.classList.add("display-flex");
		levelButtonsContainer.classList.add("zoom-fade");

		gridArray = gridLayout.gridCreate(LEVEL_CONFIG[index], gridContainer);
		minesArray = mineSpreads.mineSet(LEVEL_CONFIG[index], gridArray);

		checkTile.tileConfig(LEVEL_CONFIG[index], minesArray);

		return (configIndex = LEVEL_CONFIG[index]);
	};
});

flagButton.onclick = (event: MouseEvent) => {
	const target = event.target as HTMLDivElement;
	if (flagStatus) {
		target.classList.remove("gray");
		flagStatus = false;
	} else {
		target.classList.add("gray");
		flagStatus = true;
	}
};

gridContainer.onclick = (event: MouseEvent) => {
	const target = event.target as HTMLDivElement;
	const flagExist = target.innerHTML == "🚩";
	const tileChecked = target.attributes["data-status"]?.value == "checked";
	const tileValidation = target.classList.contains("grid-tile");

	if (tileValidation) {
		if (!flagStatus) {
			if (target.classList.contains("x")) checkTile.checkBomb(target.id);
			if (!flagExist) checkTile.checkMine(target.id);
		} else {
			if (target.classList.contains("x")) checkTile.checkBomb(target.id);
			if (!tileChecked) {
				target.innerHTML != "🚩"
					? (target.innerHTML = "🚩")
					: (target.innerHTML = "");
			}
		}
	}
};
