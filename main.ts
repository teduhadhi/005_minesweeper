import gridLayout from "./src/game layout/gridLayout";
import mineSpreads from "./src/game layout/mineSpreads";
import checkTile from "./src/game check/checkTile";
import { frontAnimation } from "./src/page/front page/frontPage";
import { checkFlagged } from "./src/game check/checkFlagged";
import switchPage from "./src/animation/switchPage";
import checkGamge from "./src/game check/checkGame";
import reloadPage from "./src/animation/reloadPage";

const LEVEL_CONFIG: number[][] = [
	[9, 9, 10],
	[9, 9, 15],
	[16, 9, 40],
];

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
const gameReset = document.querySelector(".reset") as HTMLButtonElement;
const backToHome = document.querySelector(".home") as HTMLButtonElement;
const flagButton = document.querySelector(".button-flag") as HTMLButtonElement;
const flagCounter = document.querySelector(".counter") as HTMLParagraphElement;

let flagStatus: boolean = false;
let minesArray: string[] = [];
let configIndex: number[] = [];
let levelIndex: number;
let flagNumber: number;
let gameStart: boolean = false;
let gameOver: boolean = false;
let gridArray = gridContainer.children as HTMLCollection;

frontAnimation(levelPageContainer);
window.onresize = () => frontAnimation(levelPageContainer);

levelButtons.forEach(function (button, index) {
	button.onclick = (): void => {
		handleClickLevelButton(index);
		
		if (index == 2) reloadPage.expandPage(htmlBody)
	};
});

const handleClickLevelButton = (index: number) => {
	switchPage.fade(levelPageContainer, gameBoard, 0.35);

	handleLevelSelect(index);
};

const handleLevelSelect = (index: number) => {
	gridArray = gridLayout.gridCreate(LEVEL_CONFIG[index], gridContainer);
	minesArray = mineSpreads.mineSet(LEVEL_CONFIG[index], gridArray);
	checkTile.tileConfig(LEVEL_CONFIG[index], minesArray);

	configIndex = LEVEL_CONFIG[index];
	flagNumber = LEVEL_CONFIG[index][2];

	flagCounter.innerHTML = flagNumber.toString();
	flagButton.classList.remove("gray");
	flagStatus = false;

	levelIndex = index;
};

gameReset.onclick = () => {
	handleLevelSelect(levelIndex);
	if (gameStart)
		(gameStart = false), (gameOver = false), checkGamge.gameReset();
};

backToHome.onclick = () => {
	reloadPage.compactPage(htmlBody)
	switchPage.fade(gameBoard, levelPageContainer, 0.35);
	if (gameStart)
		(gameStart = false), (gameOver = false), checkGamge.gameReset();
};

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
	const isFlagged = target.innerHTML.includes("🏴")
	const isChecked = target.attributes["data-status"]?.value == "checked";
	const isATile = target.classList.contains("grid-tile");
	const isANumber = target.classList.contains("x");

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
			}
		}
	}
	flagCounter.innerHTML = flagNumber.toString();
};

// document.body.onclick = (event) => {
// 	console.log(event.target);
// };
