import $ from "jquery";
import autosize from "autosize";
import datepicker from "js-datepicker";
import "jquery-custom-select";
import "jquery-mask-plugin";
import "icheck";

const CustomForm = {
	initTextInputs() {
		$(document).on("focus", ".input-label-up__input", function () {
			$(this).parent().addClass("focus");
		});

		$(document).on("blur", ".input-label-up__input", function () {
			$(this).parent().removeClass("focus");
		});

		autosize($("textarea"));
	},

	initSelects() {
		$("select").customSelect({
			includeValue: true,
		});
	},

	initDatepickers() {
		if ($(".input-datepicker input").length) {
			// throws error if element not found
			datepicker(".input-datepicker input", {
				customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
				customMonths: [
					"Январь",
					"Февраль",
					"Март",
					"Апрель",
					"Май",
					"Июнь",
					"Июль",
					"Август",
					"Сентябрь",
					"Октябрь",
					"Ноябрь",
					"Декабрь",
				],
				formatter: (input, date, instance) => {
					const value = new Intl.DateTimeFormat("ru-RU", {
						day: "2-digit",
						month: "2-digit",
						year: "2-digit",
					}).format(date);

					input.value = value;
				},
				overlayButton: "Применить",
				overlayPlaceholder: "Введите год",
				showAllDates: true,
			});
		}
	},

	initCheckboxes() {
		$(document).on("ifCreated ifToggled", "input", function () {
			const isChecked = $(this).prop("checked");
			$(this).closest("label").toggleClass("active", isChecked);
		});

		$("input").iCheck();
	},

	init() {
		this.initCheckboxes();
		this.initDatepickers();
		this.initTextInputs();
		this.initSelects();
	},
};

export default CustomForm;
