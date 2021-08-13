import $ from "jquery";

const NavCatalog = {
	_timer: {},

	_closePanel(panelId) {
		this._timer = setTimeout(() => {
			$("#nav-catalog").removeClass("nav-catalog--active");
		}, 100);
	},

	_handleButtonMouseenter(e) {
		clearTimeout(this._timer);

		const y = $("#header").height() + 10;

		$("#nav-catalog")
			.css({
				top: y,
			})
			.addClass("nav-catalog--active");
	},

	_handleButtonMouseleave(e) {
		this._closePanel();
	},

	_handlePanelMouseenter(e) {
		clearTimeout(this._timer);
	},

	_handlePanelMouseleave(e) {
		this._closePanel();
	},

	_handleTabMouseenter(e) {
		const index = $(e.currentTarget).index();

		$(e.currentTarget).addClass("active").siblings().removeClass("active");

		$("#nav-catalog .nav-catalog__pane")
			.removeClass("active")
			.eq(index)
			.addClass("active");
	},

	init() {
		$(document).on(
			"mouseenter",
			".js-show-catalog",
			this._handleButtonMouseenter.bind(this)
		);

		$(document).on(
			"mouseleave",
			".js-show-catalog",
			this._handleButtonMouseleave.bind(this)
		);

		$(document).on(
			"mouseenter",
			".nav-catalog__center",
			this._handlePanelMouseenter.bind(this)
		);

		$(document).on(
			"mouseleave",
			".nav-catalog__center",
			this._handlePanelMouseleave.bind(this)
		);

		$(document).on(
			"mouseenter",
			".nav-catalog__side a",
			this._handleTabMouseenter.bind(this)
		);
	},
};

$(function () {
	NavCatalog.init();
});

export default NavCatalog;
