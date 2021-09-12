import $ from "jquery";

const Popup = {
	_handleCloseButton(e) {
		e.preventDefault();

		const popupId = $(e.currentTarget).closest(".popup").attr("id");

		this.close("#" + popupId);
	},

	_handleOpenButton(e) {
		e.preventDefault();

		const target = $(e.currentTarget).data("target");

		this.open(target);
	},

	close(target) {
		$(target).removeClass("active");
	},

	open(selector) {
		$(selector).addClass("active");
	},

	init() {
		$(document).on(
			"click",
			".js-popup-close",
			this._handleCloseButton.bind(this)
		);

		$(document).on(
			"click",
			".js-popup-open",
			this._handleOpenButton.bind(this)
		);
	},
};

$(function () {
	Popup.init();
});

export default Popup;
