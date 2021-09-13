import $ from "jquery";

const Rating = {
	_handleItemClick(e) {
		e.preventDefault();

		const value = $(e.currentTarget).index() + 1;
		const $rating = $(e.currentTarget).closest(".rating");

		$rating.find("input[type='hidden']").val(value);
		$rating.find(".rating__stars__value").css({
			width: value * 20 + "%",
		});
	},

	init() {
		$(document).on(
			"click",
			".rating__stars__vote > div",
			this._handleItemClick.bind(this)
		);
	},
};

$(function () {
	Rating.init();
});

export default Rating;
