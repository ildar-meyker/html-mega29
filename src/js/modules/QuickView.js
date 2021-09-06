import $ from "jquery";

const QuickView = {
	_handleOpenButton(e) {
		e.preventDefault();

		this.open();
	},

	_handleCloseButton(e) {
		e.preventDefault();

		this.close();
	},

	open() {
		$("#popup-quick").addClass("active");
	},

	close() {
		$("#popup-quick").removeClass("active");
	},

	init() {
		$(document).on(
			"click",
			".js-quick-open",
			this._handleOpenButton.bind(this)
		);

		$(document).on(
			"click",
			".js-quick-close",
			this._handleCloseButton.bind(this)
		);
	},
};

$(function () {
	QuickView.init();
});

export default QuickView;
