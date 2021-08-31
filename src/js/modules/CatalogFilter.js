import $ from "jquery";

const CatalogFilter = {
	_setPanelSize() {
		const $navBottom = $("#nav-bottom");
		const isNavHidden = $navBottom.hasClass("hidden");
		const bottom = isNavHidden ? 0 : $navBottom.height();

		const scrollTop = $(window).scrollTop();
		const headerH = $("#header").height();
		const top = scrollTop > headerH ? 0 : headerH - scrollTop;

		$("#form-filter .form-filter__panel").css({
			top: top,
			bottom: bottom,
		});
	},

	open() {
		this._setPanelSize();
		$("#form-filter").addClass("active");
		$("body").addClass("form-filter__lock");
	},

	close() {
		$("#form-filter").removeClass("active");
		$("body").removeClass("form-filter__lock");
	},

	_handleShowButton(e) {
		e.preventDefault();

		console.log(1);

		this.open();
	},

	_handleOverlayClick(e) {
		e.preventDefault();

		this.close();
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
			".form-filter__overlay",
			this._handleOverlayClick.bind(this)
		);
	},
};

$(function () {
	CatalogFilter.init();
});

export default CatalogFilter;
