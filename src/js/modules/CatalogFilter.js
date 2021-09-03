import $ from "jquery";
import { throttle } from "throttle-debounce";
import BgMobile from "./BgMobile";
import getPanelOffset from "./getPanelOffset";

const CatalogFilter = {
	_setPanelSize() {
		const offset = getPanelOffset();

		$("#form-filter .form-filter__panel").css({
			top: offset.top,
			bottom: offset.bottom,
		});
	},

	_handleWindowResize() {
		if (!this.isActive()) return;

		setTimeout(() => {
			this._setPanelSize();
		}, 50);
	},

	_handleShowButton(e) {
		e.preventDefault();

		this.open();
	},

	_handleApplyButton(e) {
		e.preventDefault();

		this.close();
	},

	_handleResetButton(e) {
		e.preventDefault();

		this.close();
	},

	isActive() {
		return $("#form-filter").hasClass("active");
	},

	open() {
		this._setPanelSize();
		$("#form-filter").addClass("active");
		BgMobile.show();
	},

	close() {
		$("#form-filter").removeClass("active");
		BgMobile.hide();
	},

	init() {
		if ($("#form-filter").length === 0) return;

		$(document).on(
			"click",
			".js-filter-show",
			this._handleShowButton.bind(this)
		);

		$(document).on(
			"click",
			".js-filter-apply",
			this._handleApplyButton.bind(this)
		);

		$(document).on(
			"click",
			".js-filter-reset",
			this._handleResetButton.bind(this)
		);

		$(window).on(
			"resize",
			throttle(250, this._handleWindowResize.bind(this))
		);
	},
};

$(function () {
	CatalogFilter.init();
});

export default CatalogFilter;
