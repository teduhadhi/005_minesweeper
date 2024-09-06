import { LEVEL_CONFIG } from "../CONFIG/gameConfig";

interface Leaderboards {
	easy: Profile[];
	medium: Profile[];
	hard: Profile[];
}

interface Profile {
	name: string;
	timer: string;
	index: number;
}

const currentLeaderboards = localStorage.getItem("leaderboards");
let leaderboards: Leaderboards = {
	easy: [],
	medium: [],
	hard: [],
};

const dateConfig: Intl.DateTimeFormatOptions = {
	year: "2-digit",
	month: "short",
	day: "2-digit",
};

let date = new Date().toLocaleDateString("de-De", dateConfig);
while (date.includes(".")) {
	date = date.replace(".", "");
}

const checkHighScore = (() => {
	const newHighScore = (mines: number, timer: string, index: number) => {
		const newProfile: Profile = {
			name: date,
			timer: timer,
			index: index,
		};

		if (currentLeaderboards) {
			leaderboards = JSON.parse(currentLeaderboards);
		}

		switch (mines) {
			case LEVEL_CONFIG[0][2]:
				leaderboards.easy = [...leaderboards.easy, newProfile]
					.sort((a: Profile, b: Profile) => {
						return a.index - b.index;
					})
					.splice(0, 5);
				leaderboards = { ...leaderboards, easy: leaderboards.easy };

				break;

			case LEVEL_CONFIG[1][2]:
				leaderboards.medium = [...leaderboards.medium, newProfile]
					.sort((a: Profile, b: Profile) => {
						return a.index - b.index;
					})
					.splice(0, 5);
				leaderboards = { ...leaderboards, medium: leaderboards.medium };

				break;

			case LEVEL_CONFIG[2][2]:
				leaderboards.hard = [...leaderboards.hard, newProfile]
					.sort((a: Profile, b: Profile) => {
						return a.index - b.index;
					})
					.splice(0, 5);
				leaderboards = { ...leaderboards, hard: leaderboards.hard };

				break;

			default:
				break;
		}
		localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
	};

	return {
		newHighScore,
	};
})();

export default checkHighScore;
