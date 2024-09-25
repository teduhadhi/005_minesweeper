import { LEVEL_NAME, leaderboards, Profile } from "../../CONFIG/gameConfig";

const highScoresLevelContainer = document.querySelector(
	".container-leaderboard-level"
) as HTMLDivElement;
const highScoresLevel = document.querySelector(
	".leaderboard-level"
) as HTMLUListElement;
const highScoresContainer = document.querySelector(
	"container-high-scores"
) as HTMLDivElement;
const highScoresList = document.querySelector(
	".high-scores-list"
) as HTMLTableElement;

const leftLeaderboard = document.querySelector(
	".left-leaderboard"
) as HTMLButtonElement;
const rightLeaderboard = document.querySelector(
	".right-leaderboard"
) as HTMLButtonElement;

let levelIndex: number = 1;
let level: string;

export const renderHighScore = (levelInput: number) => {
	highScoresList.innerHTML = "";
  levelIndex = levelInput
	switch (levelIndex) {
		case 1:
			level = LEVEL_NAME[0];
			break;
		case 2:
			level = LEVEL_NAME[1];
			break;
		case 3:
			level = LEVEL_NAME[2];
			break;

		default:
			break;
	}

	highScoreList(level);
};

const highScoreList = (level: string) => {
	leaderboards[level].map((item: Profile, index: number) => {
		const scoreRow: HTMLTableRowElement = document.createElement("tr");
		const scorePosition: HTMLTableCellElement = document.createElement("td");
		const scoreName: HTMLTableCellElement = document.createElement("td");
		const scoreTime: HTMLTableCellElement = document.createElement("td");

		scorePosition.innerHTML = (index + 1).toString();
		scoreName.innerHTML = item.name;
		scoreTime.innerHTML = item.timer;

		scoreRow.appendChild(scorePosition);
		scoreRow.appendChild(scoreName);
		scoreRow.appendChild(scoreTime);
		highScoresList.appendChild(scoreRow);
	});
};

leftLeaderboard.onclick = () => {
	if (levelIndex > 1) {
		--levelIndex;
		renderHighScore(levelIndex);
	}
};

rightLeaderboard.onclick = () => {
	if (levelIndex < 3) {
		++levelIndex;
		renderHighScore(levelIndex);
	}
};
