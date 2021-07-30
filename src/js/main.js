import "./modules/globals";
import "bootstrap/js/dist/collapse";
import "jquery-mask-plugin";
import "jquery-custom-select";
import "slick-carousel";
import "tooltipster";
import "icheck";
import "simplebar";

import autosize from "autosize";
import datepicker from "js-datepicker";
import NavInfo from "./modules/NavInfo";
import Gallery from "./modules/Gallery";

$(function () {
	NavInfo.init();
	Gallery.init();

	autosize($("textarea"));

	$(".js-tooltip").tooltipster();

	$("select").customSelect({
		includeValue: true,
	});

	$(".promo-1").each(function () {
		$(this)
			.find(".promo-1__slider")
			.slick({
				dots: true,
				appendArrows: $(this),
				appendDots: $(this),
			});
	});

	// icheck
	$(document).on("ifCreated ifToggled", "input", function () {
		const isChecked = $(this).prop("checked");
		$(this).closest("label").toggleClass("active", isChecked);
	});

	$("input").iCheck({
		checkboxClass: "icheckbox_flat",
		radioClass: "iradio_flat",
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
