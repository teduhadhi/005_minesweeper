const switchPage = (() => {
	const zoomToFade = (
		firstPage: HTMLDivElement,
		secondPage: HTMLDivElement,
		timeframe: number
	) => {
		firstPage.style.animation = `zoom ${timeframe}s ease-in forwards, fade ${timeframe}s ease-in reverse `;
		secondPage.style.opacity = "0";

		setTimeout(() => {
			secondPage.style.transition = `opacity ${timeframe}s ease`;

			secondPage.style.opacity = "1";
		}, timeframe * 750);

		secondPage.style.animation = "";

		setTimeout(() => {
			firstPage.style.animation = `display-none 0s forwards`;
		}, timeframe * 1000);
	};

	const fade = (
		firstPage: HTMLDivElement,
		secondPage: HTMLDivElement,
		timeframe: number
	) => {
		firstPage.style.animation = `fade ${timeframe}s ease-in reverse `;

		setTimeout(() => {
			secondPage.style.animation = `fade ${timeframe}s ease-in forwards `;
			secondPage.style.opacity = "1";
		}, timeframe * 500);

		secondPage.style.animation = "";

		setTimeout(() => {
			firstPage.style.animation = `display-none 0s forwards`;
		}, timeframe * 1000);
	};

	return {
		zoomToFade,
		fade,
	};
})();

export default switchPage;
