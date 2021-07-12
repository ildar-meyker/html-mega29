const $ = (global.$ = global.jQuery = require("jquery"));
require("bootstrap/js/dist/collapse");
require("simplebar");

const NavInfo = require("./modules/NavInfo");

NavInfo.init();
