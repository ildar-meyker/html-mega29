const $ = (global.$ = global.jQuery = require("jquery"));
require("bootstrap/js/dist/collapse");
require("simplebar");
require("jquery-lazy");

$(".lazy-image img").Lazy({
	afterLoad: function (element) {
		$(element).closest(".lazy-image").addClass("inited");
	},
});
