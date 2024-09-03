const reloadPage = (() => {
	let pageExpand: boolean = false;

	const expandPage = (page: HTMLBodyElement) => {
		pageExpand = true;
		page.style.overflowY = "scroll";
		page.style.animation = "expand 1.25s ease forwards";

		setTimeout(() => {
			page.style.animation = "";
			page.style.height = "125vh";
		}, 1250);
	};

	const compactPage = (page: HTMLBodyElement) => {
		if (pageExpand) {
			pageExpand = false;
			page.style.animation = "expand 1s ease-in-out reverse";

			setTimeout(() => {
				page.style.overflowY = "unset";
				page.style.height = "100vh";
				page.style.animation = "";
			}, 1000);
		}
	};
	return { expandPage, compactPage };
})();

export default reloadPage;
