const Gallery = {
	_$default: $(),
	_$zoomed: $(),

	_handleNavItemClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).index();
		const src = $(e.currentTarget).find("img").attr("src");

		this._$default.find("img").attr("src", src);
		this._$zoomed.attr("style", `background-image: url('${src}')`);

		$(e.currentTarget).addClass("active").siblings().removeClass("active");
	},

	_handleImageMouseover(e) {
		this._$zoomed.addClass("active");
	},

	_handleImageMouseout(e) {
		this._$zoomed.removeClass("active");
	},

	_handleImageMousemove(e) {
		const $box = $("#gallery .gallery__image");
		const w = $box.outerWidth();
		const h = $box.outerHeight();

		this._$zoomed.css(
			"background-position",
			`${(e.offsetX / w) * 100}% ${(e.offsetY / h) * 100}% `
		);
	},

	init() {
		if (!$("#gallery").length) return;

		this._$default = $("#gallery .gallery__image__default");
		this._$zoomed = $("#gallery .gallery__image__zoomed");

		$(document).on(
			"click",
			".gallery__nav__item",
			this._handleNavItemClick.bind(this)
		);

		$(document).on(
			"mouseover",
			".gallery__image",
			this._handleImageMouseover.bind(this)
		);

		$(document).on(
			"mouseout",
			".gallery__image",
			this._handleImageMouseout.bind(this)
		);

		$(document).on(
			"mousemove",
			".gallery__image",
			this._handleImageMousemove.bind(this)
		);
	},
};

export default Gallery;
