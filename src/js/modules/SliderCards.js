import $ from "jquery";
import { throttle } from "throttle-debounce";

const SliderGoods = {
	_getMaxScroll($slider) {
		const $window = $slider.find(".simplebar-content-wrapper");
		const $contentElems = $slider.find(".js-slider-cards__row > div");

		const windowW = $window.width();
		const contentW = $contentElems.toArray().reduce((total, item) => {
			return total + $(item).outerWidth();
		}, 0);

		return contentW > windowW ? contentW - windowW : 0;
	},

	_updateButtons($slider) {
		const $window = $slider.find(".simplebar-content-wrapper");
		const scrollLeft = $window.scrollLeft();
		const maxScroll = this._getMaxScroll($slider);

		$slider
			.find(".button-slider--prev")
			.toggleClass("disabled", scrollLeft === 0);
		$slider
			.find(".button-slider--next")
			.toggleClass("disabled", Math.abs(maxScroll - scrollLeft) < 1);
	},

	_scrollTo($slider, direction) {
		const $window = $slider.find(".simplebar-content-wrapper");

		const scrollStep = $slider
			.find(".js-slider-cards__row > div:nth-child(2)")
			.outerWidth();
		const scrollNew = $window.scrollLeft() + scrollStep * direction;

		$window.animate({ scrollLeft: scrollNew }, 200, () => {
			this._updateButtons($slider);
		});
	},

	_handleNextClick(e) {
		e.preventDefault();

		const $slider = $(e.currentTarget).closest(".js-slider-cards");
		this._scrollTo($slider, 1);
	},

	_handlePrevClick(e) {
		e.preventDefault();

		const $slider = $(e.currentTarget).closest(".js-slider-cards");
		this._scrollTo($slider, -1);
	},

	_handleWindowScroll(e) {
		const $slider = $(e.target).closest(".js-slider-cards");
		this._updateButtons($slider);
	},

	init() {
		const self = this;

		$(document).on(
			"click",
			".js-slider-cards-next",
			this._handleNextClick.bind(this)
		);

		$(document).on(
			"click",
			".js-slider-cards-prev",
			this._handlePrevClick.bind(this)
		);

		$(".js-slider-cards .simplebar-content-wrapper").on(
			"scroll",
			throttle(250, this._handleWindowScroll.bind(this))
		);

		$(".js-slider-cards").each(function () {
			self._updateButtons($(this));
		});
	},
};

$(function () {
	SliderGoods.init();
});

export default SliderGoods;
