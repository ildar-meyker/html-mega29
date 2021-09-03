function getPanelOffset() {
	const $navBottom = $("#nav-bottom");
	const isNavHidden = $navBottom.hasClass("hidden");
	const bottom = isNavHidden ? 0 : $navBottom.height();

	const scrollTop = $(window).scrollTop();
	const headerH = $("#header").height();
	const top = scrollTop > headerH ? 0 : headerH - scrollTop;

	return {
		top: top,
		bottom: bottom,
	};
}

export default getPanelOffset;
