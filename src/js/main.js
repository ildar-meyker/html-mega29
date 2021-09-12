import "./modules/globals";

import "bootstrap/js/dist/collapse";
import "slick-carousel";
import "tooltipster";
import "simplebar";

import "./modules/iOSClickFix";
import "./modules/CatalogFilter";
import "./modules/CustomForm";
import "./modules/CountEditor";
import "./modules/NavInfo";
import "./modules/NavCatalog";
import "./modules/NavBottom";
import "./modules/NavBurger";
import "./modules/RangeSlider";
import "./modules/Panel";
import "./modules/PopupCity";
import "./modules/Search";
import "./modules/SliderCards";
import "./modules/SliderItems1";
import "./modules/SliderMain";
import "./modules/SliderGallery";
import "./modules/ScrollUp";

$(function () {
	$(".nav-path__window").scrollLeft(9999);

	$(".js-tooltip").tooltipster({
		side: ["right", "bottom"],
	});

	$(".promo-1").each(function () {
		$(this)
			.find(".promo-1__slider")
			.slick({
				dots: true,
				appendArrows: $(this),
				appendDots: $(this),
			});
	});
});
