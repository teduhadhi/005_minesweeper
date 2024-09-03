const switchPage = (() => {
	const zoomToFade = (
		firstPage: HTMLDivElement,
		secondPage: HTMLDivElement,
		timeframe: number
	) => {
		firstPage.style.animation = `zoom ${timeframe}s ease-in forwards, fade ${timeframe}s ease-in reverse `;

		setTimeout(() => {
			secondPage.style.animation = `fade ${timeframe / 2}s ease-in forwards `;
			secondPage.style.display ="flex"
		}, timeframe * 750);

		setTimeout(() => {
			firstPage.style.display ="none"
		}, timeframe * 1000);

		setTimeout(() => {
			secondPage.style.animation =""
		}, timeframe * 1250);
	};

	const fade = (
		firstPage: HTMLDivElement,
		secondPage: HTMLDivElement,
		timeframe: number
	) => {
		firstPage.style.animation = `fade ${timeframe}s ease-in reverse `;

		setTimeout(() => {
			secondPage.style.animation = `fade ${timeframe}s ease-in forwards `;
			secondPage.style.display ="flex"
		}, timeframe * 500);

		setTimeout(() => {
			firstPage.style.display ="none"
		}, timeframe * 1000);

		setTimeout(() => {
			secondPage.style.animation =""
		}, timeframe * 1500);
	};

	return {
		zoomToFade,
		fade,
	};
})();

export default switchPage;
