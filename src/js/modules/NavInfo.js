import $ from "jquery";

const NavInfo = {
	_$root: $(),

	_handleTabClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).index();

		$("#nav-info-tabs .js-nav-info-tab")
			.removeClass("active")
			.eq(index)
			.addClass("active");

		$(".nav-info__group", this._$root)
			.removeClass("active")
			.eq(index)
			.addClass("active");
	},

	init() {
		this._$root = $("#nav-info");

		if (this._$root.length === 0) return;

		$(document).on(
			"click",
			".js-nav-info-tab",
			this._handleTabClick.bind(this)
		);
	},
};

$(function () {
	NavInfo.init();
});

export default NavInfo;
