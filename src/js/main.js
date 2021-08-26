import "./modules/globals";

import "bootstrap/js/dist/collapse";
import "slick-carousel";
import "tooltipster";
import "simplebar";

import "./modules/CustomForm";
import "./modules/CountEditor";
import "./modules/NavInfo";
import "./modules/NavCatalog";
import "./modules/NavBottom";
import "./modules/RangeSlider";
import "./modules/Gallery";
import "./modules/Panel";
import "./modules/Search";
import "./modules/SliderCards";
import "./modules/SliderItems1";
import "./modules/SliderMain";

$(function () {
	$("#nav-path").scrollLeft(99999);

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

	// sorting
	$(document).on("click", ".sorting__modes__item", function () {
		const mode = $(this).data("mode");

		$(this).siblings().removeClass("active").end().addClass("active");
		$("#news").toggleClass("news--list", mode === "list");
	});
});
