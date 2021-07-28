import $ from "jquery";

const NavInfo = {
	$root: $(),

	_handleTabClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).index();

		$("#nav-info-tabs .js-nav-info-tab")
			.removeClass("active")
			.eq(index)
			.addClass("active");

		$(".nav-info__group", this.$root)
			.removeClass("active")
			.eq(index)
			.addClass("active");
	},

	init() {
		if (!$("#nav-info").length) return;

		this.$root = $("#nav-info");

		$(document).on(
			"click",
			".js-nav-info-tab",
			this._handleTabClick.bind(this)
		);
	},
};

export default NavInfo;
