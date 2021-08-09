const CountEditor = {
	_handleMinusClick(e) {
		const $root = $(e.currentTarget).closest(".count-editor");
		const $input = $root.find(".count-editor__input");
		const newValue = parseInt($input.val()) - 1;

		if (newValue < $root.data("min")) return;

		$input.val(newValue);
	},

	_handlePlusClick(e) {
		const $root = $(e.currentTarget).closest(".count-editor");
		const $input = $root.find(".count-editor__input");
		const newValue = parseInt($input.val()) + 1;

		if (newValue > $root.data("max")) return;

		$input.val(newValue);
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
	},
};

export default CountEditor;
