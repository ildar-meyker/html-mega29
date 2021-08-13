import $ from "jquery";
import { throttle } from "throttle-debounce";

const NavBottom = {
	_$root: $(),

	_lastScrollTop: 0,

	_handleWindowScroll(e) {
		const scrollTop = $(window).scrollTop();

		this._$root.toggleClass("hidden", scrollTop > this._lastScrollTop);
		this._lastScrollTop = scrollTop;
	},

	init() {
		if (!$("#nav-bottom").length) return;

		this._$root = $("#nav-bottom");

		$(window).on(
			"scroll",
			throttle(250, this._handleWindowScroll.bind(this))
		);
	},
};

$(function () {
	NavBottom.init();
});

export default NavBottom;
