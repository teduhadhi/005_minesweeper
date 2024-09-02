import gridLayout from "./src/game layout/gridLayout";
import mineSpreads from "./src/game layout/mineSpreads";
import checkTile from "./src/game check/checkTile";
import { frontAnimation } from "./src/page/front page/frontPage";
import { checkFlagged } from "./src/game check/checkFlagged";
import switchPage from "./src/animation/switchPage";

const LEVEL_CONFIG: number[][] = [
	[9, 9, 10],
	[9, 9, 20],
	[16, 9, 40],
];

const gridContainer = document.querySelector(
	".container-grid"
) as HTMLDivElement;
const levelPageContainer = document.querySelector(
	".container-level-page"
) as HTMLDivElement;
const levelButtons = document.querySelectorAll(
	".button-level"
) as NodeListOf<HTMLButtonElement>;
const flagButton = document.querySelector(".button-flag") as HTMLButtonElement;
const gameBoard = document.querySelector(".display-board") as HTMLDivElement;

let flagStatus: boolean = false;
let minesArray: string[] = [];
let configIndex: number[] = [];
let gridArray = gridContainer.children as HTMLCollection;

frontAnimation(levelPageContainer);
window.onresize = () => frontAnimation(levelPageContainer);

levelButtons.forEach(function (button, index) {
	button.onclick = (): void => {

    switchPage.fade(levelPageContainer,gameBoard,0.5)

		gridArray = gridLayout.gridCreate(LEVEL_CONFIG[index], gridContainer);
		minesArray = mineSpreads.mineSet(LEVEL_CONFIG[index], gridArray);

		checkTile.tileConfig(LEVEL_CONFIG[index], minesArray);

		configIndex = LEVEL_CONFIG[index];
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
	const target    = event.target as HTMLDivElement;
	const isFlagged = target.innerHTML == "🚩";
	const isChecked = target.attributes["data-status"]?.value == "checked";
  const isANumber = target.classList.contains("x");
	const isATile   = target.classList.contains("grid-tile");

	if (isATile) {
		if (!flagStatus) {
			if (isANumber) checkFlagged(target.id, configIndex);
			if (!isFlagged) checkTile.checkMine(target.id);
		} else {
			if (isANumber) checkFlagged(target.id, configIndex);
			if (!isChecked) {
				target.innerHTML != "🚩"
					? (target.innerHTML = "🚩")
					: (target.innerHTML = "");
          
			}
		}
	}
};
