import "./modules/globals";
import "bootstrap/js/dist/collapse";
import "slick-carousel";
import "tooltipster";
import "simplebar";

import CustomForm from "./modules/CustomForm";
import CountEditor from "./modules/CountEditor";
import NavInfo from "./modules/NavInfo";
import RangeSlider from "./modules/RangeSlider";
import Gallery from "./modules/Gallery";

$(function () {
	CustomForm.init();
	CountEditor.init();
	NavInfo.init();
	RangeSlider.init();
	Gallery.init();

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
