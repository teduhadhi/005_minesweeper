import gridLayout from "./gridLayout";
import mineSpreads from "./mineSpreads";
import checkTile from "./checkTile";
import { frontAnimation } from "./frontAnimation";

const LEVEL_CONFIG: number[][] = [
	[9, 9, 10],
	[9, 9, 20],
	[16, 9, 40],
];



const gridContainer = document.querySelector(
	".grid-container"
) as HTMLDivElement;
const levelButtons = document.querySelectorAll(
	".button-level"
) as NodeListOf<HTMLButtonElement>;
const flagButton = document.querySelector(".button-flag") as HTMLButtonElement;
const frontContainer = document.querySelector(".front") as HTMLDivElement

let flagStatus: boolean = false;
let minesArray: string[] = [];
let configIndex: number[] = [];
let gridArray = gridContainer.children as HTMLCollection;

frontAnimation(frontContainer)
window.onresize = () => frontAnimation(frontContainer)

levelButtons.forEach(function (button, index) {
	button.onclick = (): number[] => {
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
	const mineExist = target.attributes["data-status"]?.value == "mine";

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
