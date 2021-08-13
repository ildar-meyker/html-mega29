import $ from "jquery";

const Search = {
	showPanel() {
		$("#panel-search").addClass("panel-search--active");
	},

	hidePanel() {
		$("#panel-search").removeClass("panel-search--active");
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
			".header__search__input",
			this._handleInputFocus.bind(this)
		);

		$(document).on(
			"blur",
			".header__search__input",
			this._handleInputBlur.bind(this)
		);
	},
};

$(function () {
	Search.init();
});

export default Search;
