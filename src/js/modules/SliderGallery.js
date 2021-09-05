import $ from "jquery";
import { throttle } from "throttle-debounce";

const SliderGallery = {
	_$root: $(),

	_$basicSlider: $(),

	_$popup: $(),

	_$popupSlider: $(),

	_setVideosSize() {
		const ratio = 0.5625;
		const $content = this._$popup.find(".popup-gallery__content");
		const contentW = $content.width();
		const contentH = $content.height();

		if (contentH / contentW <= ratio) {
			var videoH = contentH;
			var videoW = contentH / ratio;
		} else {
			var videoH = contentW * ratio;
			var videoW = contentW;
		}

		this._$popup.find(".popup-gallery__video").css({
			width: videoW,
			height: videoH,
		});
	},

	_setActiveByIndex($collection, index) {
		$collection
			.eq(index)
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	_setActiveNavItem(index) {
		this._setActiveByIndex(
			this._$root.find(".slider-gallery__nav__item"),
			index
		);
		this._setActiveByIndex(
			this._$popup.find(".popup-gallery__nav__item"),
			index
		);
	},

	_setActiveSlide(index) {
		this._$basicSlider.slick("slickGoTo", index);
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

	_handleSlideClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).data("index");

		this._setActiveNavItem(index);
		this._setActiveSlide(index);
		this._setVideosSize();
		this.openPopup();
	},

	_handlePopupClose(e) {
		e.preventDefault();

		this.closePopup();
	},

	_handleWindowResize() {
		this._setVideosSize();
	},

	_initSlickSlider() {
		this._$basicSlider.slick({
			asNavFor: "#popup-gallery .popup-gallery__list",
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

		this._$popupSlider.slick({
			asNavFor: "#slider-gallery .slider-gallery__list",
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
		});
	},

	isPopupOpen() {
		return this._$popup.hasClass("active");
	},

	closePopup() {
		this._$popup.removeClass("active");
		$("body").removeClass("page__lock");
	},

	openPopup() {
		this._$popup.addClass("active");
		$("body").addClass("page__lock");
	},

	init() {
		this._$root = $("#slider-gallery");
		this._$basicSlider = this._$root.find(".slider-gallery__list");

		this._$popup = $("#popup-gallery");
		this._$popupSlider = this._$popup.find(".popup-gallery__list");

		if (this._$root.length === 0) return;

		$(document).on(
			"click",
			".slider-gallery__nav__item, .popup-gallery__nav__item",
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

		$(document).on(
			"click",
			".slider-gallery__item",
			this._handleSlideClick.bind(this)
		);

		$(document).on(
			"click",
			".popup-gallery__close",
			this._handlePopupClose.bind(this)
		);

		$(window).on(
			"resize",
			throttle(250, this._handleWindowResize.bind(this))
		);

		this._$basicSlider.on("afterChange", (event, slick, currentSlide) => {
			this._setActiveNavItem(currentSlide);
		});

		this._$popupSlider.on("afterChange", (event, slick, currentSlide) => {
			this._setActiveNavItem(currentSlide);
		});

		this._initSlickSlider();
	},
};

$(function () {
	SliderGallery.init();
});

export default SliderGallery;
