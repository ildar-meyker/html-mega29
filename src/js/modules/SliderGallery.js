import $ from "jquery";
import { throttle } from "throttle-debounce";
import Notify from "./Notify";

const SliderGallery = {
	_scopeSelector: "",

	_fullsizeDefaultHtml: "",

	_setDefaultScope() {
		this._scopeSelector = "#slider-gallery";
	},

	_setVideosSize() {
		const ratio = 0.5625;
		const $content = $("#popup-gallery .popup-gallery__content");
		const contentW = $content.width();
		const contentH = $content.height();

		if (contentH / contentW <= ratio) {
			var videoH = contentH;
			var videoW = contentH / ratio;
		} else {
			var videoH = contentW * ratio;
			var videoW = contentW;
		}

		$("#popup-gallery .popup-gallery__video").css({
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
			$(this._scopeSelector).find(".slider-gallery__nav__item"),
			index
		);
		this._setActiveByIndex(
			$("#popup-gallery .popup-gallery__nav__item"),
			index
		);
	},

	_setActiveSlide(index) {
		$(this._scopeSelector + " .slider-gallery__list").slick(
			"slickGoTo",
			index
		);
	},

	_handleNavItemClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).index();

		this._setActiveNavItem(index);
		this._setActiveSlide(index);
	},

	_handleImageMouseenter(e) {
		$(e.currentTarget).addClass("hover");
	},

	_handleImageMouseleave(e) {
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
		this._openFullsize();
	},

	_handleFullsizeClose(e) {
		e.preventDefault();

		this._closeFullsize();
	},

	_handleWindowResize() {
		this._setVideosSize();
	},

	_handleQuickViewOpen(e) {
		e.preventDefault();

		const productId = $(e.currentTarget)
			.closest(".js-quick-view-card")
			.data("product-id");

		const url = $('head meta[name="gallery-data-url"]')
			.attr("content")
			.replace("{id}", productId);

		$("#popup-quick-view").addClass("loading");

		$.get(url)
			.done((data) => {
				this._scopeSelector = "#slider-gallery--quick-view";

				$("#popup-quick-view .popup-quick-view__window").html(
					$(data).find(".popup-quick-view__window").html()
				);
				this._initBasicSlider();
				$("#popup-quick-view").addClass("active");

				$("#popup-gallery").html($(data).find("#popup-gallery").html());
				this._initFullsizeSlider();
			})
			.fail(() => {
				$("#popup-quick-view").removeClass("loading");
				Notify.error("Ошибка при запросе: " + url);
			});
	},

	_handleQuickViewClose(e) {
		e.preventDefault();

		$("#popup-quick-view").removeClass("loading active");
		this._setDefaultScope();
		this._resetFullsizeSlider();
	},

	_initBasicSlider() {
		$(this._scopeSelector)
			.find(".slider-gallery__list")
			.slick({
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
	},

	_initFullsizeSlider() {
		$("#popup-gallery .popup-gallery__list").slick({
			asNavFor: this._scopeSelector + " .slider-gallery__list",
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
		});
	},

	_resetFullsizeSlider() {
		if (this._fullsizeDefaultHtml.trim() !== "") {
			$("#popup-gallery").html(this._fullsizeDefaultHtml);
			this._initFullsizeSlider();
			this._syncFullsizeWithBasic();
		}
	},

	_syncFullsizeWithBasic() {
		$(this._scopeSelector + " .slider-gallery__nav__item.active").trigger(
			"click"
		);
	},

	_isFullsizeOpen() {
		return $("#popup-gallery").hasClass("active");
	},

	_closeFullsize() {
		$("#popup-gallery").removeClass("active");
		$("body").removeClass("page__lock");
	},

	_openFullsize() {
		$("#popup-gallery").addClass("active");
		$("body").addClass("page__lock");
	},

	init() {
		$(document).on(
			"click",
			".slider-gallery__nav__item, .popup-gallery__nav__item",
			this._handleNavItemClick.bind(this)
		);

		$(document).on(
			"mouseenter",
			".slider-gallery__item",
			this._handleImageMouseenter.bind(this)
		);

		$(document).on(
			"mouseleave",
			".slider-gallery__item",
			this._handleImageMouseleave.bind(this)
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
			this._handleFullsizeClose.bind(this)
		);

		$(document).on(
			"click",
			".js-quick-view-open",
			this._handleQuickViewOpen.bind(this)
		);

		$(document).on(
			"click",
			".js-quick-view-close",
			this._handleQuickViewClose.bind(this)
		);

		$(window).on(
			"resize",
			throttle(250, this._handleWindowResize.bind(this))
		);

		$(document).on(
			"afterChange",
			".slider-gallery__list",
			(event, slick, currentSlide) => {
				this._setActiveNavItem(currentSlide);
			}
		);

		$(document).on(
			"afterChange",
			".popup-gallery__list",
			(event, slick, currentSlide) => {
				this._setActiveNavItem(currentSlide);
			}
		);

		this._setDefaultScope();
		this._initBasicSlider("#slider-gallery");

		this._fullsizeDefaultHtml = $("#popup-gallery").html();
		this._initFullsizeSlider();
	},
};

$(function () {
	SliderGallery.init();
});

export default SliderGallery;
