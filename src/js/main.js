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
});
