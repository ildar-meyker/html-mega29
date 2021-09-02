import $ from "jquery";

const Search = {
	showPanel() {
		$("#form-search").addClass("active");
	},

	hidePanel() {
		$("#form-search").removeClass("active");
	},

	_handleInputBlur() {
		this.hidePanel();
	},

	_handleInputFocus() {
		this.showPanel();
	},

	init() {
		$(document).on(
			"focus",
			".js-search-input",
			this._handleInputFocus.bind(this)
		);

		$(document).on(
			"blur",
			".js-search-input",
			this._handleInputBlur.bind(this)
		);
	},
};

$(function () {
	Search.init();
});

export default Search;
