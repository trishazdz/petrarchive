/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function () {\n\tvar $window = $(window),\n\t    $stickyHeader = $('header.sticky'),\n\t    $threshHold = $('#vizindex').offset().top;\n\n\tvar debouncedStickyHeader = util_browser.debounce(function (ev) {\n\t\tvar scroll = $window.scrollTop();\n\t\tif (scroll >= $threshHold) {\n\t\t\t$stickyHeader.removeClass('hide');\n\t\t\treturn;\n\t\t}\n\t\t$stickyHeader.addClass('hide');\n\t}, 100);\n\n\t$(window).scroll(debouncedStickyHeader);\n\n\t$(document).tooltip({\n\t\titems: $(\".built-vizindex a\"),\n\t\t/* hide: {\r\n       effect: \"explode\",\r\n       delay: 30000\r\n     },*/\n\t\tcontent: function () {\n\t\t\tvar a = $(this);\n\t\t\tvar noFile = a.hasClass('no-file');\n\n\t\t\tvar ch = a.find('img').attr('alt');\n\n\t\t\tvar facsSrc = '\"images/thumb-vat-lat3195-f/vat-lat3195-f-' + ch + '.jpg\"';\n\t\t\tvar img = '<img class=\"facs\" src=' + facsSrc + ' />';\n\n\t\t\tvar prettyCh = prettify(ch);\n\t\t\tvar p = '<p class=\"charta\">' + prettyCh;\n\n\t\t\tif (noFile) {\n\t\t\t\tp += ' <cite>Text encoding in progress</cite>';\n\t\t\t}\n\n\t\t\tp += '</p>';\n\t\t\tvar html = p + img;\n\t\t\treturn html;\n\t\t}\n\t});\n\n\tfunction prettify(ugly) {\n\t\tvar base = 'charta';\n\t\tvar noZero = ugly.slice(0, 3).replace(/^0+/, '');\n\t\tvar rv;\n\n\t\tif (ugly[3] == 'r') {\n\t\t\trv = 'recto';\n\t\t} else {\n\t\t\trv = 'verso';\n\t\t}\n\n\t\treturn base + ' ' + noZero + ' ' + rv;\n\t}\n});\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });