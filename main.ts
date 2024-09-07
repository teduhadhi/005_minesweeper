import { LEVEL_CONFIG } from "./src/CONFIG/gameConfig";
import { frontAnimation } from "./src/page/front page/frontPage";
import { renderHighScore } from "./src/page/leaderboard page/leaderboardPage";
import { gridLayout } from "./src/game layout/gridLayout";
import { mineSpreads } from "./src/game layout/mineSpreads";
import { checkFlagged } from "./src/game check/checkFlagged";
import checkTile from "./src/game check/checkTile";
import checkGame from "./src/game check/checkGame";
import switchPage from "./src/animation/switchPage";
import reloadPage from "./src/animation/reloadPage";


const htmlBody = document.body as HTMLBodyElement;
const levelPage = document.querySelector(
	".container-level-page"
) as HTMLDivElement;
const levelButtons = document.querySelectorAll(
	".button-level"
) as NodeListOf<HTMLButtonElement>;
const moreButtonLevel = document.querySelector(
	".more-leaderboard"
) as HTMLButtonElement;
const leaderboardPage = document.querySelector(
	".container-leaderboard-page"
) as HTMLDivElement;
const homeButtonLeaderboard = document.querySelector(
	".home-leaderboard"
) as HTMLButtonElement;
const gamePage = document.querySelector(
	".container-game-page"
) as HTMLDivElement;
const gridContainer = document.querySelector(
	".container-grid"
) as HTMLDivElement;
const resetButtonGame = document.querySelector(
	".reset-game"
) as HTMLButtonElement;
const homeButtonGame = document.querySelector(
	".home-game"
) as HTMLButtonElement;
const flagButtonGame = document.querySelector(
	".button-flag-game"
) as HTMLButtonElement;
const flagCounterGame = document.querySelector(
	".counter-game"
) as HTMLParagraphElement;

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

frontAnimation(levelPage);
window.onresize = () => frontAnimation(levelPage);

levelButtons.forEach(function (button, index) {
	button.onclick = (): void => {
		handleClickLevelButton(index);

		if (index == 2) reloadPage.expandPage(htmlBody, 1.25);
	};
});

const handleClickLevelButton = (index: number): void => {
	switchPage.fade(levelPage, gamePage, 0.35);
	handleLevelSelect(index);
};

const handleLevelSelect = (index: number): void => {
	gridArray = gridLayout(LEVEL_CONFIG[index], gridContainer);
	minesArray = mineSpreads(LEVEL_CONFIG[index], gridArray);
	checkTile.tileConfig(LEVEL_CONFIG[index], minesArray);

	configIndex = LEVEL_CONFIG[index];
	flagNumber = LEVEL_CONFIG[index][2];

	flagCounterGame.innerHTML = flagNumber.toString();
	flagButtonGame.style.backgroundColor = "white";
	flagStatus = false;

	levelIndex = index;
};

moreButtonLevel.onclick = () => {
	switchPage.fade(levelPage, leaderboardPage, 0.35);
	renderHighScore(1);
};

homeButtonLeaderboard.onclick = () => {
	switchPage.fade(leaderboardPage, levelPage, 0.35);
	
};

resetButtonGame.onclick = (): void => {
	reloadPage.fadePage(gamePage, RESET_TIMEFRAME);
	setTimeout(() => {
		handleLevelSelect(levelIndex);
	}, (RESET_TIMEFRAME / 2) * 1000);
	handleReset();
};

homeButtonGame.onclick = (): void => {
	reloadPage.shrinkPage(htmlBody, 1);
	switchPage.fade(gamePage, levelPage, 0.35);
	handleReset();
};

const handleReset = (): void => {
	setTimeout(() => {
		if (gameStart)
			(gameStart = false), (gameOver = false), checkGame.gameReset();
	}, (RESET_TIMEFRAME / 2) * 1000);
};

flagButtonGame.onclick = (event: MouseEvent): void => {
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

	if (!gameStart) (gameStart = true), checkGame.gameStart();

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

	flagCounterGame.innerHTML = flagNumber.toString();
};

