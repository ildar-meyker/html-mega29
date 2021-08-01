import $ from "jquery";
import "jquery-range";
import "jquery-mask-plugin";

const RangeSlider = {
	_handleInputChange(e) {
		const $root = $(e.currentTarget).closest(".js-range");
		const from = $root.find(".js-range__from").val();
		const to = $root.find(".js-range__to").val();

		$root.find(".js-range__hidden").jRange("setValue", `${from},${to}`);
	},

	init() {
		$(document).on(
			"change",
			".js-range__from, .js-range__to",
			this._handleInputChange.bind(this)
		);

		$(".js-range__from, .js-range__to").mask("0#");

		$(".js-range").each(function () {
			const $root = $(this);
			const $hidden = $root.find(".js-range__hidden");

			$hidden.jRange({
				from: $hidden.data("from"),
				to: $hidden.data("to"),
				step: 1,
				width: "100%",
				showLabels: false,
				isRange: true,
				onstatechange(value) {
					const parts = value.split(",");
					$root.find(".js-range__from").val(parts[0]);
					$root.find(".js-range__to").val(parts[1]);
				},
			});
		});
	},
};

export default RangeSlider;
