import $ from "jquery";
import { throttle } from "throttle-debounce";
import BgMobile from "./BgMobile";
import getPanelOffset from "./getPanelOffset";

const Search = {
	_$root: $(),

	_setPanelSize() {
		const offset = getPanelOffset();

		$("#form-search").css({
			bottom: offset.bottom,
		});
	},

	_handleOutsideClick(e) {
		if ($(e.target).closest(".form-search").length) return;

		this._hideDesktop();
	},

	_handleInputFocus() {
		this._loadResults();
		this._showDesktop();
	},

	_handleInputKeyup(e) {
		this._loadResults();
	},

	_handleOpenButton(e) {
		e.preventDefault();

		this._setPanelSize();
		this.open();
		BgMobile.show();
	},

	_handleCloseButton(e) {
		e.preventDefault();

		this.close();
		BgMobile.hide();
	},

	_handleWindowResize() {
		if (!this.isActive()) return;

		setTimeout(() => {
			this._setPanelSize();
		}, 50);
	},

	_showDesktop() {
		$("#form-search").addClass("focus");
	},

	_hideDesktop() {
		$("#form-search").removeClass("focus");
	},

	_loadResults() {
		$("#form-search").addClass("loading");

		// fake demo
		setTimeout(() => {
			$("#form-search").removeClass("loading");
		}, 500);
	},

	isActive() {
		return this._$root.hasClass("active");
	},

	open() {
		this._$root.addClass("active");
		this._$root.find(".js-search-input").focus();
	},

	close() {
		this._$root.removeClass("active");
	},

	init() {
		this._$root = $("#form-search");

		if (this._$root.length === 0) return;

		$(document).on(
			"focus",
			".js-search-input",
			this._handleInputFocus.bind(this)
		);

		$(document).on(
			"keyup",
			".js-search-input",
			throttle(250, this._handleInputKeyup.bind(this))
		);

		$(document).on(
			"click",
			".js-search-open",
			this._handleOpenButton.bind(this)
		);

		$(document).on(
			"click",
			".js-search-close",
			this._handleCloseButton.bind(this)
		);

		$(document).on("click", this._handleOutsideClick.bind(this));

		$(window).on(
			"resize",
			throttle(250, this._handleWindowResize.bind(this))
		);
	},
};

$(function () {
	Search.init();
});

export default Search;
