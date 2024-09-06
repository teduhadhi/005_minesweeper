import showTile from "../game layout/showTile";
import checkHighScore from "./checkHighScore";

const checkGamge = (() => {
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

	const gameOverCover = document.querySelector(".game-over") as HTMLDivElement;
	const timer = document.querySelector(".timer") as HTMLParagraphElement;
	const headerTopMessage = document.querySelector(
		".message-top"
	) as HTMLParagraphElement;
	const headerBottomMessage = document.querySelector(
		".message-bottom"
	) as HTMLParagraphElement;

	let timerCounter: number = 0,
		seconds: number = 0,
		secondsString: string,
		minutes: number = 0,
		minutesString: string,
		display: string,
		startTimer: number;

	const gameStart = () => {
		startTimer = setInterval(() => {
			timerInterval();
		}, 1000);

		const timerInterval = () => {
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
	) => {
		clearInterval(startTimer);
		if (status) {
			const messageIndex: number = Math.floor(
				Math.random() * winningMessage.length
			);
			headerTopMessage.innerHTML = winningMessage[messageIndex];
			headerBottomMessage.innerHTML = display;
			console.log("win");

			checkHighScore.newHighScore(minesArray.length, display, timerCounter);
			
		} else if (targetId) {
			showTile.showMine(minesArray, targetId);
			showTile.showMisplacedFlag();
		}
		gameOverCover.style.display = "grid";
	};

	const gameReset = () => {
		clearInterval(startTimer);
		timerCounter = 0;
		timer.innerHTML = "00:00";
		headerTopMessage.innerHTML = "";
		headerBottomMessage.innerHTML = "";
		gameOverCover.style.display = "none";
	};

	return {
		gameOver,
		gameReset,
		gameStart,
	};
})();

export default checkGamge;
