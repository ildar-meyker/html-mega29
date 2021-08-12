import $ from "jquery";

const CountEditor = {
	_previosValue: null,

	_isInMinMaxRange($root, value) {
		if (value > $root.data("max") || value < $root.data("min")) {
			return false;
		}

		return true;
	},

	_handleMinusClick(e) {
		const $root = $(e.currentTarget).closest(".count-editor");
		const $input = $root.find(".count-editor__input");
		const newValue = parseInt($input.val()) - 1;

		if (!this._isInMinMaxRange($root, newValue)) return;

		$input.val(newValue);
	},

	_handlePlusClick(e) {
		const $root = $(e.currentTarget).closest(".count-editor");
		const $input = $root.find(".count-editor__input");
		const newValue = parseInt($input.val()) + 1;

		if (!this._isInMinMaxRange($root, newValue)) return;

		$input.val(newValue);
	},

	_handleInputChange(e) {
		const $root = $(e.currentTarget).closest(".count-editor");
		const $input = $root.find(".count-editor__input");
		const newValue = $input.val();

		if (!this._isInMinMaxRange($root, newValue)) {
			$input.val(this._previosValue);
		}
	},

	_handleInputFocus(e) {
		this._previosValue = $(e.currentTarget).val();
	},

	init() {
		$(document).on(
			"click",
			".count-editor__minus",
			this._handleMinusClick.bind(this)
		);

		$(document).on(
			"click",
			".count-editor__plus",
			this._handlePlusClick.bind(this)
		);

		$(document).on(
			"change",
			".count-editor__input",
			this._handleInputChange.bind(this)
		);

		$(document).on(
			"focus",
			".count-editor__input",
			this._handleInputFocus.bind(this)
		);
	},
};

export default CountEditor;
