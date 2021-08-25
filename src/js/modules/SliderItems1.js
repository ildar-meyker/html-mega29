import $ from "jquery";

const SliderItems1 = {
	_$sliders: $(),

	_destroySliders() {
		try {
			this._$sliders.slick("unslick");
		} catch (e) {}
	},

	_initSliders() {
		this._$sliders.each(function () {
			const $root = $(this).closest(".slider-items-1");
			$(this).slick({
				prevArrow: $root.find(".button-slider--prev"),
				nextArrow: $root.find(".button-slider--next"),
				slidesToShow: 1,
				dots: true,
			});
		});
	},

	_onResize(mql) {
		mql.matches ? this._initSliders() : this._destroySliders();
	},

	init() {
		this._$sliders = $(".slider-items-1__list");

		const mql = window.matchMedia("(min-width: 992px)");

		mql.addListener(this._onResize.bind(this));

		this._onResize(mql);
	},
};

$(function () {
	SliderItems1.init();
});

export default SliderItems1;
