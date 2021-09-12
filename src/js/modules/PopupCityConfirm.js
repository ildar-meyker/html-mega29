import $ from "jquery";

const PopupCityConfirm = {
	_handleCloseButton(e) {
		e.preventDefault();

		this.close();
	},

	_handleOpenButton(e) {
		e.preventDefault();

		this.open();
	},

	close() {
		$("#popup-city-confirm").removeClass("active");
	},

	open() {
		$("#popup-city-confirm").addClass("active");
	},

	init() {
		$(document).on(
			"click",
			".js-popup-city-confirm-close",
			this._handleCloseButton.bind(this)
		);

		$(document).on(
			"click",
			".js-popup-city-confirm-open",
			this._handleOpenButton.bind(this)
		);
	},
};

$(function () {
	PopupCityConfirm.init();
});

export default PopupCityConfirm;
