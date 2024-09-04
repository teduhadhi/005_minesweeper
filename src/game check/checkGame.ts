import showTile from "../game layout/showTile";

const checkGamge = (() => {
	const timer = document.querySelector(".timer") as HTMLParagraphElement;
	const gameOverCover = document.querySelector(".game-over") as HTMLDivElement;
	// const modalMessage = document.querySelector(".modal-message") as HTMLDivElement;

	let timerCounter: number = 0,
		seconds: number = 0,
		secondsString: string,
		minutes: number = 0,
		minutesString: string,
		display: string,
		startTimer: number;

	const gameOver = (
		status: boolean,
		minesArray?: string[],
		targetId?: string
	) => {

		clearInterval(startTimer);
		if (status) {
			alert(`congrats ${display}`);
		} else if (minesArray && targetId) {
			showTile.showMine(minesArray, targetId);
			showTile.showMisplacedFlag()
		}
		gameOverCover.style.display = "grid";
		// modalMessage.style.display ="grid"
	};

	const gameReset = () => {
		clearInterval(startTimer);
		timerCounter = 0;
		timer.innerHTML = "00:00";
		gameOverCover.style.display = "none";
	};

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

	return {
		gameOver,
		gameReset,
		gameStart,
	};
})();

export default checkGamge;
