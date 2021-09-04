import $ from "jquery";

const SliderGallery = {
	_$root: $(),

	_$slider: $(),

	_setActiveNavItem(index) {
		this._$root
			.find(".slider-gallery__nav__item")
			.eq(index)
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	_setActiveSlide(index) {
		this._$slider.slick("slickGoTo", index);
	},

	_handleNavItemClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).index();

		this._setActiveNavItem(index);
		this._setActiveSlide(index);
	},

	_handleImageMouseover(e) {
		$(e.currentTarget).addClass("hover");
	},

	_handleImageMouseout(e) {
		$(e.currentTarget).removeClass("hover");
	},

	_handleImageMousemove(e) {
		const $item = $(e.currentTarget);
		const w = $item.outerWidth();
		const h = $item.outerHeight();

		$item
			.find(".slider-gallery__zoom")
			.css(
				"background-position",
				`${(e.offsetX / w) * 100}% ${(e.offsetY / h) * 100}% `
			);
	},

	init() {
		this._$root = $("#slider-gallery");
		this._$slider = this._$root.find(".slider-gallery__list");

		if (this._$root.length === 0) return;

		$(document).on(
			"click",
			".slider-gallery__nav__item",
			this._handleNavItemClick.bind(this)
		);

		$(document).on(
			"mouseover",
			".slider-gallery__item",
			this._handleImageMouseover.bind(this)
		);

		$(document).on(
			"mouseout",
			".slider-gallery__item",
			this._handleImageMouseout.bind(this)
		);

		$(document).on(
			"mousemove",
			".slider-gallery__item",
			this._handleImageMousemove.bind(this)
		);

		this._$slider.on("afterChange", (event, slick, currentSlide) => {
			this._setActiveNavItem(currentSlide);
		});

		this._$slider.slick({
			arrows: false,
			slidesToShow: 1,
			dots: true,
			swipe: false,
			speed: 0,

			responsive: [
				{
					breakpoint: 1220,
					settings: {
						swipe: true,
						speed: 300,
					},
				},
			],
		});
	},
};

$(function () {
	SliderGallery.init();
});

export default SliderGallery;
