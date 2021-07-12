const $ = require("jquery");

const NavInfo = {
	$root: $(),

	handleTabClick(e) {
		e.preventDefault();

		const index = $(e.currentTarget).index();

		$(".nav-info__tabs__item", this.$root)
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
			".nav-info__tabs__item",
			this.handleTabClick.bind(this)
		);
	},
};

module.exports = NavInfo;
