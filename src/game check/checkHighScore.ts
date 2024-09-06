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

let level: string;

export const checkHighScore = (mines: number, timer: string, index: number): number => {
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
				level = "easy";
				break;

			case LEVEL_CONFIG[1][2]:
				level = "medium";
				break;

			case LEVEL_CONFIG[2][2]:
				level = "hard";
				break;

			default:
				break;
		}

		leaderboards[level] = [...leaderboards[level], newProfile]
			.sort((a: Profile, b: Profile) => {
				return a.index - b.index;
			})
			.splice(0, 5);
		leaderboards = { ...leaderboards, [level]: leaderboards[level] };

		localStorage.setItem("leaderboards", JSON.stringify(leaderboards));

		if(leaderboards[level].includes(newProfile)){
			return leaderboards[level].indexOf(newProfile)
		} else {
			return 0
		}
	};
