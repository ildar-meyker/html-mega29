import $ from "jquery";
import { throttle } from "throttle-debounce";

import Utils from "./Utils";

const ScrollUp = {
	_handleWindowScroll(e) {
		const scrollTop = $(window).scrollTop();
		const windowH = $(window).height();

		$("#scroll-up").toggleClass("hidden", scrollTop < windowH);
	},

	init() {
		if (!$("#scroll-up").length) return;

		$(document).on("click", "#scroll-up", function (e) {
			e.preventDefault();

			Utils.scrollTo(0);
		});

		$(window).on(
			"scroll",
			throttle(250, this._handleWindowScroll.bind(this))
		);
	},
};

$(function () {
	ScrollUp.init();
});

export default ScrollUp;
