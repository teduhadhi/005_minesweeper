import reloadPage from "../animation/reloadPage";

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

const HIGH_SCORE_TIMEFRAME: number = 0.65;
const MESSAGE_DELAY: number = 0.75;

const middleSection = document.querySelector(
	".middle-section"
) as HTMLDivElement;

let headerMessageText: string;
let placement: string;

export const gameOverMessages = (
	status: boolean,
	newHighScore: number,
	headerMessage: HTMLParagraphElement
): void => {
  placement = ""

	if (status) {
		const messageIndex: number = Math.floor(
			Math.random() * winningMessage.length
		);
		headerMessageText = winningMessage[messageIndex];

		if (newHighScore >= 0) {
			headerMessageText = "new high score!";

			const position = newHighScore + 1;

			switch (position) {
				case 1:
					placement = position + "st";
					break;
				case 2:
					placement = position + "nd";
					break;
				case 3:
					placement = position + "rd";
					break;

				default:
					placement = position + "th";
					break;
			}
		}
	} else {
		headerMessageText = "Better luck </br> next time";
	}
	messageLoad(placement, headerMessage);
};

const messageLoad = (
	placement: string,
	headerMessage: HTMLParagraphElement
) => {
	setTimeout(() => {
		headerMessage.innerHTML = headerMessageText;
		headerMessage.style.animation = `fade ${
			MESSAGE_DELAY / 2
		}s ease-out forwards`;

		if (placement) {
			setTimeout(() => {
				setTimeout(() => {
					reloadPage.fadePage(middleSection, HIGH_SCORE_TIMEFRAME);
				}, (HIGH_SCORE_TIMEFRAME * 1000) / 2);

				setTimeout(() => {
					headerMessage.innerHTML = `You got </br> the ${placement} place!`;
				}, HIGH_SCORE_TIMEFRAME * 1000);
			}, MESSAGE_DELAY * 1000);
		}
	}, (MESSAGE_DELAY / 3) * 1000);
	headerMessage.style.animation = "";
};
