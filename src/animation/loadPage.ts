const reloadPage = (() => {
	const headerCover = document.querySelector(".header-cover") as HTMLDivElement;
	let pageExpand: boolean = false;

	const expandPage = (page: HTMLBodyElement, timeframe: number) => {
		pageExpand = true;
		page.style.overflowY = "scroll";
		page.style.animation = `expand ${timeframe}s ease forwards`;
		headerCover.style.display = "flex";

		setTimeout(() => {
			page.style.animation = "";
			page.style.height = "125vh";
			headerCover.style.display = "none";
		}, timeframe * 1000);
	};

	const shrinkPage = (page: HTMLBodyElement, timeframe: number) => {
		if (pageExpand) {
			pageExpand = false;
			page.style.animation = `expand ${timeframe}s ease-in-out reverse`;

			setTimeout(() => {
				page.style.overflowY = "unset";
				page.style.height = "100vh";
				page.style.animation = "";
			}, timeframe * 1000);
		}
	};

	const fadePage = (page: HTMLDivElement, timeframe: number) => {
		page.style.animation = `fade ${timeframe / 2}s ease-in reverse `;

		setTimeout(() => {
			page.style.animation = "";
			page.style.opacity = "0";
		}, (timeframe / 2) * 1000);

		setTimeout(() => {
			page.style.animation = `fade ${timeframe / 2}s ease-out forwards `;
			page.style.opacity = "";
		}, (timeframe / 2) * 1000 + 50);

		setTimeout(() => {
			page.style.animation = "";
		}, (timeframe) * 1000 + 75);
	};
	return { expandPage, shrinkPage, fadePage };
})();

export default reloadPage;
