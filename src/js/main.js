import "./modules/globals";
import "bootstrap/js/dist/collapse";
import "jquery-mask-plugin";
import SimpleBar from "simplebar";
import "select2";
import "icheck";

import autosize from "autosize";
import datepicker from "js-datepicker";
import NavInfo from "./modules/NavInfo";

$(function () {
	NavInfo.init();

	autosize($("textarea"));

	$("select").each(function () {
		$(this).select2({
			minimumResultsForSearch: -1,
			dropdownParent: $(this).parent(),
		});
	});

	// icheck
	$("input").iCheck({
		checkboxClass: "icheckbox_flat",
		radioClass: "iradio_flat",
	});

	$(document).on("ifCreated ifToggled", "input", function () {
		const isChecked = $(this).prop("checked");
		$(this).closest("label").toggleClass("active", isChecked);
	});

	// datepicker
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

	// sorting
	$(document).on("click", ".sorting__modes__item", function () {
		const mode = $(this).data("mode");

		$(this).siblings().removeClass("active").end().addClass("active");
		$("#news").toggleClass("news--list", mode === "list");
	});
});
