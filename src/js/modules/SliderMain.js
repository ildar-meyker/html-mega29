import $ from "jquery";

const SliderMain = {
	init() {
		$("#slider-main .slider-main__list").slick({
			prevArrow: `<button type="button" class="button-slider button-slider--prev">
                <i class="icon-arrow-left"></i>
            </button>`,
			nextArrow: `<button type="button" class="button-slider button-slider--next">
                <i class="icon-arrow-right"></i>
            </button>`,
			slidesToShow: 1,
			dots: true,
		});
	},
};

$(function () {
	SliderMain.init();
});

export default SliderMain;
