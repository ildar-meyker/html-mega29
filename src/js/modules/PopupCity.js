import $ from "jquery";

const PopupCity = {
	_handleCloseButton(e) {
		e.preventDefault();

		this.close();
	},

	_handleOpenButton(e) {
		e.preventDefault();

		this.open();
	},

	close() {
		$("#popup-city").removeClass("active");
	},

	open() {
		$("#popup-city").addClass("active");
	},

	init() {
		$(document).on(
			"click",
			".js-popup-city-close",
			this._handleCloseButton.bind(this)
		);

		$(document).on(
			"click",
			".js-popup-city-open",
			this._handleOpenButton.bind(this)
		);
	},
};

$(function () {
	PopupCity.init();
});

export default PopupCity;
