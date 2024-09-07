import reloadPage from "../animation/reloadPage";
import showTile from "../game layout/showTile";
import { checkHighScore } from "./checkHighScore";
import { gameOverMessages } from "./checkMessage";

const winningMessage = [
	"Superb!",
	"Tremendeous!",
	"Sensational!",
	"Fantastic!",
	"Neat!",
	"Way to go!",
	"Right on!",
	"Terrific!",
];

const PLACEMENT_TIMEFRAME: number = 0.65;
const PLACEMENT_DELAY: number = 0.75;

const gameOverCover = document.querySelector(".game-over") as HTMLDivElement;
const middleSection = document.querySelector(
	".middle-section"
) as HTMLDivElement;
const timer = document.querySelector(".timer-game") as HTMLParagraphElement;
const resetButton = document.querySelector(".reset-game") as HTMLButtonElement;
const headerMessage = document.querySelector(
	".message-game"
) as HTMLParagraphElement;



let timerCounter: number = 0,
	seconds: number = 0,
	secondsString: string,
	minutes: number = 0,
	minutesString: string,
	display: string,
	startTimer: number,
	newHighScore: number = 0;

const checkGame = (() => {
	const gameStart = (): void => {
		startTimer = setInterval(() => {
			timerInterval();
		}, 1000);

		const timerInterval = (): void => {
			timerCounter++;
			minutes = Math.floor(timerCounter / 60);
			seconds = timerCounter % 60;

			seconds < 10
				? (secondsString = "0" + seconds)
				: (secondsString = seconds.toString());

			minutes < 10
				? (minutesString = "0" + minutes)
				: (minutesString = minutes.toString());

			display = minutesString.concat(":", secondsString);

			timer.innerHTML = display;
		};
	};

	const gameOver = (
		status: boolean,
		minesArray: string[],
		targetId?: string
	): void => {
		clearInterval(startTimer);
		if (status) {
			newHighScore = checkHighScore(minesArray.length, display, timerCounter);
		} else if (targetId) {
			showTile.showMine(minesArray, targetId);
			showTile.showMisplacedFlag();
		}
		gameOverMessages(status, newHighScore, headerMessage);
		resetButtonGlow();
		gameOverCover.style.display = "grid";
	};

	const gameReset = (): void => {
		clearInterval(startTimer);
		timerCounter = 0;
		timer.innerHTML = "00:00";
		headerMessage.innerHTML = "";
		gameOverCover.style.display = "none";
		resetButton.style.animation = "";
	};

	const resetButtonGlow = () => {
		resetButton.style.animation =
			"fade-30 0.75s linear alternate-reverse infinite";

		resetButton.onmouseover = () => {
			resetButton.style.animation = "";
		};

		resetButton.onmouseleave = () => {
			resetButton.style.animation =
				"fade-30 1s linear alternate-reverse infinite";
		};
	};

	return {
		gameOver,
		gameReset,
		gameStart,
	};
})();

export default checkGame;
