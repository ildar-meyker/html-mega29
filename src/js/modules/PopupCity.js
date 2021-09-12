import $ from "jquery";

const PopupCity = {
	_handleCloseButton(e) {
		e.preventDefault();

		this.close();
	},

	_handleSelectButton(e) {
		e.preventDefault();

		$("#popup-city .popup-city__confirm").removeClass("active");
		$("#popup-city .popup-city__select").addClass("active");
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

		$(document).on(
			"click",
			".js-popup-city-select",
			this._handleSelectButton.bind(this)
		);
	},
};

$(function () {
	PopupCity.init();
});

export default PopupCity;
