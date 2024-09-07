import {
	LEVEL_CONFIG,
	LEVEL_NAME,
	leaderboards,
	date,
	Profile,
	Leaderboards
} from "../CONFIG/gameConfig";

let level: string;
let updatedLeaderboards: Leaderboards = leaderboards

export const checkHighScore = (
	mines: number,
	timer: string,
	index: number
): number => {
	const newProfile: Profile = {
		name: date,
		timer: timer,
		index: index,
	};

	switch (mines) {
		case LEVEL_CONFIG[0][2]:
			level = LEVEL_NAME[0];
			break;

		case LEVEL_CONFIG[1][2]:
			level = LEVEL_NAME[1];
			break;

		case LEVEL_CONFIG[2][2]:
			level = LEVEL_NAME[2];
			break;

		default:
			break;
	}

	updatedLeaderboards[level] = [...updatedLeaderboards[level], newProfile]
		.sort((a: Profile, b: Profile) => {
			return a.index - b.index;
		})
		.splice(0, 10);
	updatedLeaderboards = { ...updatedLeaderboards, [level]: updatedLeaderboards[level] };

	localStorage.setItem("leaderboards", JSON.stringify(updatedLeaderboards));

	return updatedLeaderboards[level].indexOf(newProfile);
};
