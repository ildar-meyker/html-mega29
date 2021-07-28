const Gallery = {
	_handleNavItemClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).index();
		const src = $(e.currentTarget).find("img").attr("src");

		$("#gallery .gallery__image__default img").attr("src", src);
		$("#gallery .gallery__image__zoomed").attr(
			"style",
			`background-image: url('${src}')`
		);

		$(e.currentTarget).addClass("active").siblings().removeClass("active");
	},
	init() {
		if (!$("#gallery").length) return;

		$(document).on(
			"click",
			".gallery__nav__item",
			this._handleNavItemClick.bind(this)
		);
	},
};

export default Gallery;
