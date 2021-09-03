import $ from "jquery";
import { throttle } from "throttle-debounce";
import BgMobile from "./BgMobile";
import getPanelOffset from "./getPanelOffset";

const NavBurger = {
	_setPanelSize() {
		const offset = getPanelOffset();

		$("#nav-burger .nav-burger__panel").css({
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
