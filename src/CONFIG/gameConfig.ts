export const LEVEL_CONFIG: number[][] = [
	[9, 9, 10],
	[9, 9, 15],
	[16, 9, 30],
];

export const LEVEL_NAME: string[] =[
	"easy",
	"medium",
	"hard"
]

export interface Profile {
	name: string;
	timer: string;
	index: number;
}

export interface Leaderboards {
	easy: Profile[];
	medium: Profile[];
	hard: Profile[];
}

export const currentLeaderboards = localStorage.getItem("leaderboards");

export let leaderboards: Leaderboards = {
	easy: [],
	medium: [],
	hard: [],
};

if (currentLeaderboards) {
	leaderboards = JSON.parse(currentLeaderboards);
}

export const dateConfig: Intl.DateTimeFormatOptions = {
	year: "2-digit",
	month: "short",
	day: "2-digit",
};


export	let date = new Date().toLocaleDateString("de-De", dateConfig);
	while (date.includes(".")) {
		date = date.replace(".", "");
	}

