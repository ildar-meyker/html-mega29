import $ from "jquery";

const Panel = {
	_timers: {},
	_zIndex: 100,

	_closePanel(panelId) {
		this._timers[panelId] = setTimeout(() => {
			$("#" + panelId).removeClass("panel--ready panel--active");
		}, 200);
	},

	_handleButtonMouseenter(e) {
		const $button = $(e.currentTarget);
		const $parent = $($button.data("parent"));
		const $panel = $($button.data("target"));

		const panelId = $panel.attr("id");

		clearTimeout(this._timers[panelId]);

		// точка посередине кнопки
		const x = $button.position().left + $button.outerWidth() / 2;
		const y = $parent.height() - 10;

		// рассчет коррекции, чтобы не выходило за пределы окна
		const maxPanelEdge =
			$(window).width() - parseInt($parent.css("padding-right"));
		const panelEdge = x + $panel.outerWidth() / 2;
		const xFix = panelEdge > maxPanelEdge ? panelEdge - maxPanelEdge : 0;

		$panel.find(".panel__arrow").css({
			left: `calc(50% + ${xFix}px)`,
		});

		$panel.addClass("panel--ready").css({
			zIndex: this._zIndex++,
			left: x - xFix,
			top: y,
		});

		setTimeout(() => {
			$panel.addClass("panel--active");
		}, 0);
	},

	_handleButtonMouseleave(e) {
		const panelId = $(e.currentTarget).data("target").substring(1);

		this._closePanel(panelId);
	},

	_handlePanelMouseenter(e) {
		const panelId = $(e.currentTarget).attr("id");

		clearTimeout(this._timers[panelId]);
	},

	_handlePanelMouseleave(e) {
		const panelId = $(e.currentTarget).attr("id");

		this._closePanel(panelId);
	},

	init() {
		$(document).on(
			"mouseenter",
			".js-panel-button",
			this._handleButtonMouseenter.bind(this)
		);

		$(document).on(
			"mouseleave",
			".js-panel-button",
			this._handleButtonMouseleave.bind(this)
		);

		$(document).on(
			"mouseenter",
			".panel",
			this._handlePanelMouseenter.bind(this)
		);

		$(document).on(
			"mouseleave",
			".panel",
			this._handlePanelMouseleave.bind(this)
		);
	},
};

export default Panel;
