import $ from "jquery";
window.$ = window.jQuery = $;

import "bootstrap/js/dist/collapse";
import "simplebar";
import "select2";

import NavInfo from "./modules/NavInfo";

$(function () {
	NavInfo.init();

	$("select").select2({
		minimumResultsForSearch: -1,
	});

	$(document).on("click", ".sorting__modes__item", function () {
		const mode = $(this).data("mode");

		$(this).siblings().removeClass("active").end().addClass("active");
		$("#news").toggleClass("news--list", mode === "list");
	});
});
