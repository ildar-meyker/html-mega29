import $ from "jquery";
import CatalogFilter from "./CatalogFilter";
import NavBurger from "./NavBurger";

const BgMobile = {
	_handleOverlayClick() {
		CatalogFilter.close();
		NavBurger.close();
		this.hide();
	},

	show() {
		$("#bg-mobile").addClass("active");
		$("body").addClass("page__lock-mobile");
	},

	hide() {
		if (CatalogFilter.isActive()) return;
		if (NavBurger.isActive()) return;

		$("#bg-mobile").removeClass("active");
		$("body").removeClass("page__lock-mobile");
	},

	init() {
		$(document).on(
			"click",
			".page__bg-mobile",
			this._handleOverlayClick.bind(this)
		);
	},
};

$(function () {
	BgMobile.init();
});

export default BgMobile;
