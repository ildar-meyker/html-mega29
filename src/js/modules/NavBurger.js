import $ from "jquery";
import { throttle } from "throttle-debounce";
import BgMobile from "./BgMobile";

const NavBurger = {
	_setPanelSize() {
		const $navBottom = $("#nav-bottom");
		const isNavHidden = $navBottom.hasClass("hidden");
		const bottom = isNavHidden ? 0 : $navBottom.height();

		const scrollTop = $(window).scrollTop();
		const headerH = $("#header").height();
		const top = scrollTop > headerH ? 0 : headerH - scrollTop;

		$("#nav-burger .nav-burger__panel").css({
			top: top,
			bottom: bottom,
		});
	},

	_handleWindowResize() {
		setTimeout(() => {
			this._setPanelSize();
		}, 50);
	},

	_handleBurgerClick(e) {
		e.preventDefault();

		if (this.isActive()) {
			this.close();
		} else {
			this.open();
		}
	},

	isActive() {
		return $("#nav-burger").hasClass("active");
	},

	open() {
		this._setPanelSize();
		$("#nav-burger").addClass("active");
		$("#hamburger").addClass("is-active");
		BgMobile.show();
	},

	close() {
		$("#nav-burger").removeClass("active");
		$("#hamburger").removeClass("is-active");
		BgMobile.hide();
	},

	init() {
		$(document).on(
			"click",
			"#hamburger",
			this._handleBurgerClick.bind(this)
		);

		$(window).on(
			"resize",
			throttle(250, this._handleWindowResize.bind(this))
		);
	},
};

$(function () {
	NavBurger.init();
});

export default NavBurger;
