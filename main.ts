import { gridLayout } from "./src/game layout/gridLayout";
import { mineSpreads } from "./src/game layout/mineSpreads";
import checkTile from "./src/game check/checkTile";
import { frontAnimation } from "./src/page/front page/frontPage";
import { checkFlagged } from "./src/game check/checkFlagged";
import switchPage from "./src/animation/switchPage";
import checkGamge from "./src/game check/checkGame";
import reloadPage from "./src/animation/reloadPage";
import { LEVEL_CONFIG } from "./src/CONFIG/gameConfig";


const htmlBody = document.body as HTMLBodyElement;
const gameBoard = document.querySelector(".container-board") as HTMLDivElement;
const gridContainer = document.querySelector(
	".container-grid"
) as HTMLDivElement;
const levelPageContainer = document.querySelector(
	".container-level-page"
) as HTMLDivElement;
const levelButtons = document.querySelectorAll(
	".button-level"
) as NodeListOf<HTMLButtonElement>;
const resetButton = document.querySelector(".reset") as HTMLButtonElement;
const homeButton = document.querySelector(".home") as HTMLButtonElement;
const flagButton = document.querySelector(".button-flag") as HTMLButtonElement;
const flagCounter = document.querySelector(".counter") as HTMLParagraphElement;

const RESET_TIMEFRAME: number = 0.65;
let levelIndex: number;
let flagNumber: number;
let minesArray: string[] = [];
let configIndex: number[] = [];
let gameStart: boolean = false;
let gameOver: boolean = false;
let gameReset: boolean = false;
let flagStatus: boolean = false;
let gridArray = gridContainer.children as HTMLCollection;

frontAnimation(levelPageContainer);
window.onresize = () => frontAnimation(levelPageContainer);

levelButtons.forEach(function (button, index) {
	button.onclick = (): void => {
		handleClickLevelButton(index);

		if (index == 2) reloadPage.expandPage(htmlBody, 1.25);
	};
});

const handleClickLevelButton = (index: number): void => {
	switchPage.fade(levelPageContainer, gameBoard, 0.35);
	handleLevelSelect(index);
};

const handleLevelSelect = (index: number): void => {
	gridArray = gridLayout(LEVEL_CONFIG[index], gridContainer);
	minesArray = mineSpreads(LEVEL_CONFIG[index], gridArray);
	checkTile.tileConfig(LEVEL_CONFIG[index], minesArray);

	configIndex = LEVEL_CONFIG[index];
	flagNumber = LEVEL_CONFIG[index][2];

	flagCounter.innerHTML = flagNumber.toString();
	flagButton.style.backgroundColor = "white";
	flagStatus = false;

	levelIndex = index;
};

const handleReset = (): void => {
	setTimeout(() => {
		if (gameStart)
			(gameStart = false), (gameOver = false), checkGamge.gameReset();
	}, (RESET_TIMEFRAME / 2) * 1000);
};

resetButton.onclick = (): void => {
	reloadPage.fadePage(gameBoard, RESET_TIMEFRAME);
	setTimeout(() => {
		handleLevelSelect(levelIndex);
	}, (RESET_TIMEFRAME / 2) * 1000);
	handleReset();
};

homeButton.onclick = (): void => {
	reloadPage.shrinkPage(htmlBody, 1);
	switchPage.fade(gameBoard, levelPageContainer, 0.35);
	handleReset();
};

flagButton.onclick = (event: MouseEvent): void => {
	const target = event.target as HTMLDivElement;
	if (flagStatus) {
		target.style.backgroundColor = "white";
		flagStatus = false;
	} else {
		target.style.backgroundColor = "lightgray";
		flagStatus = true;
	}
};

gridContainer.onclick = (event: MouseEvent): void => {
	const target = event.target as HTMLDivElement;
	const isFlagged = target.innerHTML.includes("🏴");
	const isChecked = target.attributes["data-status"]?.value == "checked";
	const isATile = target.classList.contains("grid-tile");
	const isANumber = target.classList.contains("x");
	const isAMineExist = target.attributes["data-content"]?.value == "mine";

	if (!gameStart) (gameStart = true), checkGamge.gameStart();

	if (isATile && !gameOver) {
		if (!flagStatus) {
			if (isANumber) checkFlagged(target.id, configIndex);
			if (!isFlagged) checkTile.checkMine(target.id);
		} else {
			if (isANumber) checkFlagged(target.id, configIndex);
			if (!isChecked) {
				!isFlagged
					? ((target.innerHTML = "🏴"), flagNumber--)
					: ((target.innerHTML = ""), flagNumber++);
				if (!isAMineExist) {
				}
			}
		}
	}

	flagCounter.innerHTML = flagNumber.toString();
};
