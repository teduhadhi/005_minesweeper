const checkGamge = (() => {
	const timer = document.querySelector(".timer") as HTMLParagraphElement;

	let timerCounter: number = 0,
		seconds: number = 0,
		secondsString: string,
		minutes: number = 0,
		minutesString: string,
		display: string,
		startTimer: number;
	const gameOver = () => {};

	const gameReset = () => {
		clearInterval(startTimer);
		timerCounter = 0;
		timer.innerHTML = "00:00";
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
