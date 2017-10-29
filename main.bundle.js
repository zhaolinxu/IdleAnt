webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/action/action.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-block\">\n  <h3 class=\"card-title\"> {{action.name}}\n    <span *ngIf=\"!action.oneTime && action.showNumber\">({{action.quantity | format}})</span>\n  </h3>\n\n  <p class=\"card-text\">\n    <span>{{action.description}} &nbsp;</span>\n    <br/>\n    <span *ngIf=\"!action.oneTime\">获取1个会花费：</span>\n    <span *ngIf=\"action.oneTime\">花费:</span>\n    <span *ngFor=\"let p of action.realPriceNow\" [ngClass]=\"{'notEnought': p.basePrice.greaterThan(p.unit.quantity)}\">\n      {{numberformat.formatShort(p.basePrice)}} {{p.unit.name}},\n    </span>\n    <br/>\n  </p>\n\n  <div *ngIf=\"action.maxBuy.greaterThanOrEqualTo(1)\">\n\n    <div class=\"form-group\" *ngIf=\"!action.oneTime\" class=\"toggle\">\n      <label>获取： </label>\n      <input type=\"number\" placeholder=\"1\" [(ngModel)]=\"required\" class=\"numIn\" min=\"1\">\n      <span>个</span>\n    </div>\n\n    <div class=\"form-group\">\n      <div class=\"btn-group w-100\" role=\"group\">\n\n        <button type=\"button\" class=\"btn btn-secondary w-100\" (click)=\"action.buy(getReqNum())\" [disabled]=\"!action.maxBuy.greaterThanOrEqualTo(1)\">\n          <span *ngIf=\"!action.oneTime\">{{getPriceString1()}}</span>\n          <span *ngIf=\"action.oneTime\">获取</span>\n        </button>\n        <button type=\"button \" class=\"btn btn-secondary w-100\" (click)=\"action.buy(action.maxBuy.div(2).ceil())\"\n          *ngIf=\"action.maxBuy.greaterThanOrEqualTo(3)\">\n          <span>{{getBuyStringHalf()}}</span>\n        </button>\n        <button type=\"button\" class=\"btn btn-secondary w-100\" (click)=\"action.buy(action.maxBuy)\" *ngIf=\"action.maxBuy.greaterThanOrEqualTo(2)\">\n          <span>{{getBuyStringMax()}}</span>\n        </button>\n      </div>\n    </div>\n\n  </div>\n\n  <div *ngIf=\"!action.maxBuy.greaterThanOrEqualTo(1) && !(action.oneTime && action.owned())\">\n    <div class=\"progress-block\" *ngFor=\"let cost of action.realPriceNow; trackBy:getPriceId\">\n      <label>{{cost.basePrice | format}}&nbsp;{{cost.unit.name}}</label>\n      <div class=\"progress-static\" [ngClass]=\"{'success': cost.unit.quantity.greaterThanOrEqualTo(cost.basePrice), 'danger': !cost.unit.quantity.greaterThanOrEqualTo(cost.basePrice)}\">\n        <div class=\"progress-meter\" max=\"100\"\n        attr.data-value=\"{{Math.min(cost.unit.quantity.times(100).div(cost.basePrice).floor().toNumber(),100)}}\">\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/action/action.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".notEnought {\n  color: #F52F22; }\n\n.toggle {\n  margin-bottom: 10px; }\n\n.numIn {\n  width: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/action/action.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__ = __webpack_require__("../../../../swarm-numberformat/es/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ActionComponent = (function () {
    function ActionComponent() {
        this.maxBuy = Decimal(0);
        this.prices1 = new Array();
        this.pricesHalf = new Array();
        this.pricesMax = new Array();
        this.buyString1 = "";
        this.buyStringHalf = "";
        this.buyStringMax = "";
        this.priceString1 = "";
        this.priceStringHalf = "";
        this.priceStringMax = "";
        this.required = 1;
        this.numberformat = __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__;
        this.Math = Math;
    }
    ActionComponent.prototype.ngOnInit = function () {
    };
    ActionComponent.prototype.getReqNum = function () {
        if (!this.required)
            return Decimal(1);
        return Decimal(Math.max(Math.min(this.required, this.action.maxBuy.toNumber()), 1));
    };
    ActionComponent.prototype.getPriceString1 = function () {
        return __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](Decimal(this.action.up ? this.action.up.quantity.plus(1) : 1)
            .times(this.getReqNum()));
    };
    ActionComponent.prototype.getBuyStringHalf = function () {
        return __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](Decimal(this.action.up ? this.action.up.quantity.plus(1) : 1)
            .times(this.action.getBuyMax().div(2).ceil()));
    };
    ActionComponent.prototype.getBuyStringMax = function () {
        return __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](Decimal(this.action.up ? this.action.up.quantity.plus(1) : 1)
            .times(this.action.getBuyMax()));
    };
    ActionComponent.prototype.ngAfterViewChecked = function () {
        // if (this.action)
        //   this.refresh();
    };
    ActionComponent.prototype.refresh = function () {
        this.maxBuy = this.action.getBuyMax();
        this.prices1 = this.action.getCosts(Decimal(1));
        this.pricesHalf = this.action.getCosts(this.maxBuy.div(2).ceil());
        this.pricesMax = this.action.getCosts(this.maxBuy);
        var buyMulti = Decimal(this.action.up ? this.action.up.quantity.plus(1) : 1);
        this.buyString1 = __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](buyMulti);
        this.buyStringHalf = __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](buyMulti.times(this.maxBuy.div(2).ceil()));
        this.buyStringMax = __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](buyMulti.times(this.maxBuy));
        this.priceString1 = '';
        for (var _i = 0, _a = this.prices1; _i < _a.length; _i++) {
            var p = _a[_i];
            this.priceString1 += __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](p.basePrice) +
                ' ' + p.unit.name + '\n';
        }
        this.priceStringHalf = '';
        for (var _b = 0, _c = this.pricesHalf; _b < _c.length; _b++) {
            var p = _c[_b];
            this.priceStringHalf += __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](p.basePrice) +
                ' ' + p.unit.name + '\n';
        }
        this.priceStringMax = '';
        for (var _d = 0, _e = this.pricesMax; _d < _e.length; _d++) {
            var p = _e[_d];
            this.priceStringMax += __WEBPACK_IMPORTED_MODULE_2_swarm_numberformat__["formatShort"](p.basePrice) +
                ' ' + p.unit.name + '\n';
        }
    };
    ActionComponent.prototype.buyFirefox = function () {
        if (this.action) {
            var b = this.maxBuy.toNumber();
            return b >= 1;
        }
        return false;
    };
    ActionComponent.prototype.getPriceId = function (index, cost) {
        return cost.unit.id;
    };
    return ActionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__model_units_action__["h" /* Action */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__model_units_action__["h" /* Action */]) === "function" && _a || Object)
], ActionComponent.prototype, "action", void 0);
ActionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-action',
        template: __webpack_require__("../../../../../src/app/action/action.component.html"),
        styles: [__webpack_require__("../../../../../src/app/action/action.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], ActionComponent);

var _a;
//# sourceMappingURL=action.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<clr-main-container>\n\n  <clr-header class=\"header-5\">\n    <div class=\"branding\">\n      <a href=\"javascript://\" class=\"nav-link\" routerLink=\"/main/unit\">\n        <!-- <clr-icon shape=\"vm-bug\"></clr-icon> -->\n\n        <span class=\"title\">蚂蚁放置</span>\n      </a>\n    </div>\n    <div class=\"header-nav\" [clr-nav-level]=\"1\">\n      <a class=\"nav-link\" class=\"nav-link nav-text\" routerLinkActive=\"active\" routerLink=\"/main/unit\">单位</a>\n\n      <a class=\"nav-link\" class=\"nav-link nav-text\" routerLinkActive=\"active\" routerLink=\"/lab\" *ngIf=\"gameService.game.baseWorld.science.unlocked\">实验室</a>\n\n      <a class=\"nav-link\" class=\"nav-link nav-text\" routerLinkActive=\"active\" routerLink=\"/prestige\" *ngIf=\"gameService.game.worldTabAv\">旅行</a>\n\n      <a class=\"nav-link\" class=\"nav-link nav-text\" routerLinkActive=\"active\" routerLink=\"/main/exp\" *ngIf=\"gameService.game.expTabAv\">经验</a>\n\n      <a class=\"nav-link\" class=\"nav-link nav-text\" routerLinkActive=\"active\" routerLink=\"/world\" *ngIf=\"gameService.game.homeTabAv\">世界</a>\n\n    </div>\n    <div class=\"header-actions\">\n<a class=\"nav-link nav-icon\" href=\"https://zhaolinxu.github.io/IdleAnt/\" title=\"游戏不能直接刷新，想刷新页面请点这里\">\n        刷新页面\n      </a>\n      <clr-dropdown>\n        <button class=\"nav-icon\" clrDropdownTrigger>\n          <clr-icon shape=\"tools\"></clr-icon>\n          <clr-icon shape=\"caret down\"></clr-icon>\n        </button>\n        <clr-dropdown-menu *clrIfOpen clrPosition=\"bottom-right\">\n          <a clrDropdownItem (click)=\"all100()\">All 100%</a>\n\n          <clr-dropdown *ngFor=\"let list of gameService.game.lists | filterListNotEmpty; trackBy:getListId\">\n            <button type=\"button\" clrDropdownTrigger>{{list.type}}</button>\n            <clr-dropdown-menu clrPosition=\"left-top\">\n              <a clrDropdownItem (click)=\"list.all100()\">100%</a>\n              <a clrDropdownItem (click)=\"list.all0()\">0%</a>\n            </clr-dropdown-menu>\n          </clr-dropdown>\n\n\n        </clr-dropdown-menu>\n        </clr-dropdown>\n\n        <a class=\"nav-link nav-icon\" href=\"javascript://\" (click)=\"opeTimeWarp()\" *ngIf=\"gameService.game.prestige.timeMaker.quantity.greaterThan(0)\">\n          <clr-icon shape=\"clock\"></clr-icon>\n        </a>\n\n        <a class=\"nav-link nav-icon\" href=\"javascript://\" (click)=\"gameService.game.pause = !gameService.game.pause\">\n          <clr-icon shape=\"play\" *ngIf=\"gameService.game.pause; else pauseB\"></clr-icon>\n          <ng-template #content #pauseB>\n            <clr-icon shape=\"pause\"></clr-icon>\n          </ng-template>\n        </a>\n\n        <a href=\"javascript://\" class=\"nav-link nav-icon\" routerLink=\"/options\">\n          <clr-icon shape=\"cog\"></clr-icon>\n        </a>\n\n    </div>\n  </clr-header>\n\n  <!-- Top Material Nav -->\n  <nav class=\"subnav\">\n    <ul class=\"nav navMat\">\n      <li class=\"nav-item\" class=\"matTab\" *ngFor=\"let g of gameService.game.baseWorld.listMaterial | filterMax\">\n        <a [routerLink]=\"['/main/unit/unit/'+g.id]\" class=\"nav-link matLink\" routerLinkActive=\"active\" [ngClass]=\"{'red': g.isEnding()}\">\n\n          <span style=\"display:block;\">\n            <clr-icon class=\"is-info\" shape=\"angle-double\" *ngIf=\"g.showUp\"></clr-icon>\n            <clr-icon class=\"alert-icon is-error\" shape=\"exclamation-triangle\" *ngIf=\"g.isEnding()\"></clr-icon>\n            <span class=\"first\">{{g.name}}</span>\n          </span>\n\n          <span class=\"perSecTab small\">\n            <span *ngIf=\"g.totalPerSec.abs().greaterThan(0.001)\">\n              {{g.totalPerSec | format}}/s\n            </span>\n          </span>\n          <span class=\"small\">{{g.quantity | format}}</span>\n\n        </a>\n      </li>\n    </ul>\n  </nav>\n\n  <router-outlet></router-outlet>\n\n  <clr-modal [(clrModalOpen)]=\"gameService.game.timeModalOpened\">\n    <h3 class=\"modal-title\">时间扭曲</h3>\n    <div class=\"modal-body actMinH\" *ngIf=\"gameService.game.actMin && gameService.game.actHour\">\n      <span> 你可以跳过 {{totTime()}}</span>\n      <app-action [action]=\"gameService.game.actMin\"></app-action>\n      <app-action [action]=\"gameService.game.actHour\"></app-action>\n    </div>\n  </clr-modal>\n\n</clr-main-container>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".nowrap {\n  white-space: nowrap;\n  overflow: hidden; }\n\n.main-container {\n  min-height: 100vh;\n  height: auto !important; }\n\n:host /deep/ .content-area {\n  padding: 10px 24px 24px 24px !important; }\n\n.matTab {\n  width: 10%;\n  max-width: 110px;\n  margin-left: 5px; }\n\n.matLink {\n  width: 100%;\n  line-height: 24px;\n  border-style: solid;\n  border-width: 0px 1px 0px 0px; }\n\n.navMat {\n  padding-left: 5px;\n  height: 48px; }\n\n.perSecTab {\n  float: right; }\n\n.main-container .subnav {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 48px;\n          flex: 0 0 48px; }\n\n.red {\n  color: #F52F22 !important; }\n\n.small {\n  font-size: 13px; }\n\n.actMinH {\n  min-height: 400px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_service__ = __webpack_require__("../../../../../src/app/game.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(gameService, toastr, vcr) {
        this.gameService = gameService;
        this.toastr = toastr;
        this.toastr.setRootViewContainerRef(vcr);
    }
    AppComponent.prototype.opeTimeWarp = function () {
        this.gameService.game.timeModalOpened = true;
        this.gameService.game.prestige.time.reloadAtcMaxBuy();
    };
    AppComponent.prototype.totTime = function () {
        __WEBPACK_IMPORTED_MODULE_2_moment__["locale"]('en');
        return __WEBPACK_IMPORTED_MODULE_2_moment__["duration"](this.gameService.game.prestige.time.quantity.toNumber()).humanize();
    };
    AppComponent.prototype.all100 = function () {
        this.gameService.game.all.forEach(function (u) { return u.percentage = 100; });
        this.gameService.game.isChanged = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_0__game_service__["a" /* GameService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__game_service__["a" /* GameService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__unit_unit_component__ = __webpack_require__("../../../../../src/app/unit/unit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__options_options_component__ = __webpack_require__("../../../../../src/app/options/options.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_clarity_angular__ = __webpack_require__("../../../../clarity-angular/clarity-angular/clarity-angular.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__main_nav_main_nav_component__ = __webpack_require__("../../../../../src/app/main-nav/main-nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_swarm_numberformat__ = __webpack_require__("../../../../swarm-numberformat/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__action_action_component__ = __webpack_require__("../../../../../src/app/action/action.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__prestige_prestige_component__ = __webpack_require__("../../../../../src/app/prestige/prestige.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lab_lab_component__ = __webpack_require__("../../../../../src/app/lab/lab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__res_pipe_pipe__ = __webpack_require__("../../../../../src/app/res-pipe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_world_home_world_component__ = __webpack_require__("../../../../../src/app/home-world/home-world.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__price_pipe_pipe__ = __webpack_require__("../../../../../src/app/price-pipe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__prod_togle_pipe_pipe__ = __webpack_require__("../../../../../src/app/prod-togle-pipe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_toastr_src_toast_options__ = __webpack_require__("../../../../ng2-toastr/src/toast-options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_toastr_src_toast_options___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_ng2_toastr_src_toast_options__);
/* unused harmony export Format */
/* unused harmony export FilterListNotEmpty */
/* unused harmony export FilterMax */
/* unused harmony export CustomOptions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var appRoutes = [
    {
        path: '', redirectTo: "main/unit", pathMatch: 'full'
    },
    {
        path: 'main/:type', component: __WEBPACK_IMPORTED_MODULE_7__main_nav_main_nav_component__["a" /* MainNavComponent */],
        children: [
            { path: 'unit', component: __WEBPACK_IMPORTED_MODULE_0__unit_unit_component__["a" /* UnitComponent */] },
            { path: 'unit/:id', component: __WEBPACK_IMPORTED_MODULE_0__unit_unit_component__["a" /* UnitComponent */] }
        ]
    },
    {
        path: 'lab', component: __WEBPACK_IMPORTED_MODULE_13__lab_lab_component__["a" /* LabComponent */]
    },
    {
        path: 'options', component: __WEBPACK_IMPORTED_MODULE_1__options_options_component__["a" /* OptionsComponent */]
    },
    {
        path: 'prestige', component: __WEBPACK_IMPORTED_MODULE_12__prestige_prestige_component__["a" /* PrestigeComponent */]
    },
    {
        path: 'world', component: __WEBPACK_IMPORTED_MODULE_15__home_world_home_world_component__["a" /* HomeWorldComponent */]
    }
];
var Format = (function () {
    function Format() {
    }
    Format.prototype.transform = function (value, short) {
        return value.abs().lessThan(10) ? value.toNumber().toFixed(2).replace(/\.0+$/, '').replace(".", ",") :
            value.abs().lessThan(100) ? value.toNumber().toFixed(1).replace(/\.0+$/, '').replace(".", ",") :
                (value.greaterThanOrEqualTo(0) ? "" : "-") + __WEBPACK_IMPORTED_MODULE_9_swarm_numberformat__["formatShort"](value.abs());
    };
    return Format;
}());
Format = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Pipe"])({ name: 'format' })
], Format);

var FilterListNotEmpty = (function () {
    function FilterListNotEmpty() {
    }
    FilterListNotEmpty.prototype.transform = function (value, param) {
        return value.filter(function (t) { return t.list.filter(function (l) { return l.unlocked; }).length > 0; });
    };
    return FilterListNotEmpty;
}());
FilterListNotEmpty = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Pipe"])({ name: 'filterListNotEmpty', pure: false })
], FilterListNotEmpty);

var FilterMax = (function () {
    function FilterMax() {
    }
    FilterMax.prototype.transform = function (values, filter) {
        return values.filter(function (gen) { return gen.unlocked; });
    };
    return FilterMax;
}());
FilterMax = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Pipe"])({ name: 'filterMax', pure: false })
], FilterMax);

var CustomOptions = (function (_super) {
    __extends(CustomOptions, _super);
    function CustomOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animate = 'fade';
        _this.dismiss = 'auto';
        _this.showCloseButton = true;
        _this.newestOnTop = true;
        _this.enableHTML = true;
        _this.positionClass = 'toast-bottom-right';
        return _this;
    }
    return CustomOptions;
}(__WEBPACK_IMPORTED_MODULE_19_ng2_toastr_src_toast_options__["ToastOptions"]));

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__main_nav_main_nav_component__["a" /* MainNavComponent */],
            __WEBPACK_IMPORTED_MODULE_0__unit_unit_component__["a" /* UnitComponent */],
            FilterListNotEmpty,
            Format,
            FilterMax,
            __WEBPACK_IMPORTED_MODULE_0__unit_unit_component__["b" /* FilterUnlocked */],
            FilterListNotEmpty,
            __WEBPACK_IMPORTED_MODULE_1__options_options_component__["a" /* OptionsComponent */],
            __WEBPACK_IMPORTED_MODULE_11__action_action_component__["a" /* ActionComponent */],
            __WEBPACK_IMPORTED_MODULE_12__prestige_prestige_component__["a" /* PrestigeComponent */],
            __WEBPACK_IMPORTED_MODULE_13__lab_lab_component__["a" /* LabComponent */],
            __WEBPACK_IMPORTED_MODULE_14__res_pipe_pipe__["a" /* ResPipePipe */],
            __WEBPACK_IMPORTED_MODULE_15__home_world_home_world_component__["a" /* HomeWorldComponent */],
            __WEBPACK_IMPORTED_MODULE_0__unit_unit_component__["c" /* FilterActive */],
            __WEBPACK_IMPORTED_MODULE_16__price_pipe_pipe__["a" /* PricePipePipe */],
            __WEBPACK_IMPORTED_MODULE_17__prod_togle_pipe_pipe__["a" /* ProdToglePipePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5_clarity_angular__["a" /* ClarityModule */].forRoot(),
            [__WEBPACK_IMPORTED_MODULE_8__angular_router__["a" /* RouterModule */]],
            __WEBPACK_IMPORTED_MODULE_8__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_18_ng2_toastr_ng2_toastr__["ToastModule"].forRoot()
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_19_ng2_toastr_src_toast_options__["ToastOptions"], useClass: CustomOptions }],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_11__action_action_component__["a" /* ActionComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/game.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_gameModel__ = __webpack_require__("../../../../../src/app/model/gameModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GameService = (function () {
    function GameService(router, toastr) {
        var _this = this;
        this.router = router;
        this.toastr = toastr;
        this.interval = 1000 / 10;
        this.saveFreq = 1000 * 3 * 60;
        this.kongFreq = 1000 * 10 * 60;
        this.isPaused = false;
        this.isKongregate = false;
        this.isMainNav = true;
        this.game = new __WEBPACK_IMPORTED_MODULE_0__model_gameModel__["a" /* GameModel */]();
        this.last = Date.now();
        var l = this.load(false);
        if (l)
            this.last = l;
        this.game.isChanged = true;
        setInterval(this.update.bind(this), this.interval);
        setInterval(this.checkUpgrades.bind(this), 1500);
        setInterval(this.save.bind(this), this.saveFreq);
        if (typeof kongregateAPI !== 'undefined') {
            kongregateAPI.loadAPI(function () {
                _this.kongregate = kongregateAPI.getAPI();
                console.log("KongregateAPI Loaded");
                setTimeout(function () {
                    try {
                        console.log("Kongregate build");
                        _this.sendKong();
                        _this.isKongregate = true;
                        setInterval(_this.sendKong.bind(_this), _this.kongFreq);
                    }
                    catch (e) {
                        console.log("Error: " + e.message);
                    }
                }, 5 * 1000);
            });
        }
        else
            console.log("Github build");
        this.router.navigateByUrl('/');
    }
    GameService.prototype.update = function () {
        var now = new Date().getTime();
        var delta = now - this.last;
        if (delta > this.interval) {
            if (delta > 1000)
                this.game.isChanged = true;
            this.game.longUpdate(delta);
            this.game.prestige.time.quantity = Decimal.min(this.game.prestige.time.quantity.plus(this.game.prestige.timeMaker.quantity.times(0.1).times(delta / 1000)), this.game.prestige.timeBank.quantity.plus(4).times(3600));
            this.last = now;
        }
        this.game.postUpdate();
        // window.requestAnimationFrame(this.update.bind(this))
    };
    GameService.prototype.checkUpgrades = function () {
        if (this.isMainNav)
            this.game.reloadUpIcons();
    };
    GameService.prototype.clear = function () {
        localStorage.clear();
        this.game = new __WEBPACK_IMPORTED_MODULE_0__model_gameModel__["a" /* GameModel */]();
    };
    GameService.prototype.save = function () {
        try {
            if (typeof (Storage) !== 'undefined') {
                var save = this.game.getSave();
                localStorage.setItem('save', save);
                console.log("Saved");
                this.toastr.success("", 'Game Saved');
            }
            else {
                this.toastr.warning("Canot access local storage", "Not saved");
            }
        }
        catch (ex) {
            this.toastr.error(ex && ex.message ? ex.message : "unknow error", "Saving Error");
        }
    };
    GameService.prototype.load = function (notify) {
        if (notify === void 0) { notify = true; }
        try {
            if (typeof (Storage) !== 'undefined') {
                var saveRaw = localStorage.getItem('save');
                if (saveRaw) {
                    var last = this.game.load(saveRaw);
                    if (last) {
                        if (notify)
                            this.toastr.success("Idle time: " + __WEBPACK_IMPORTED_MODULE_4_moment__["duration"](Date.now() - last).humanize(), "Game Loaded");
                        this.last = last;
                        return last;
                    }
                    else {
                        this.toastr.error("Cannot read your savegame", "Error");
                    }
                }
                else {
                    this.toastr.error("No savegame found", "Error");
                }
            }
            else {
                this.toastr.warning("Cannot access localstorage", "Not Loaded");
            }
        }
        catch (ex) {
            this.toastr.error(ex && ex.message ? ex.message : "unknow error", "Load Error");
        }
    };
    GameService.prototype.nonInfinite = function (num) {
        var level = num.toNumber();
        return level < Number.POSITIVE_INFINITY && level < 137438953470 ? level : 0;
    };
    GameService.prototype.sendKong = function () {
        try {
            this.kongregate.stats.submit('Prestige', this.nonInfinite(this.game.maxLevel));
            this.kongregate.stats.submit('Prestige2', this.nonInfinite(this.game.maxLevel));
            this.kongregate.stats.submit('World Done', this.nonInfinite(this.game.prestigeDone));
            console.log("Prestige sent: " + this.game.maxLevel.toNumber());
        }
        catch (e) {
            console.log("Error: " + e.message);
        }
    };
    return GameService;
}());
GameService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _b || Object])
], GameService);

var _a, _b;
//# sourceMappingURL=game.service.js.map

/***/ }),

/***/ "../../../../../src/app/home-world/home-world.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <div class=\"content-area\">\n    <h1>{{gameService.game.world.name}}</h1>\n    <span>Level: {{gameService.game.world.level}}</span>\n    <ul class=\"list\">\n      <li *ngFor=\"let p of gameService.game.world.avaiableUnits\">\n        {{p.name}}: {{p.description }}\n      </li>\n      <li *ngFor=\"let p of gameService.game.world.unlockedUnits\">\n          <span *ngIf=\"!p[1].greaterThan(0)\">\n            {{p[0].name}}: {{p[0].description }}\n          </span>\n          <span *ngIf=\"p[1].greaterThan(0)\">\n            Start with {{p[1] | format }} {{p[0].name}}\n          </span>\n        </li>\n      <li *ngFor=\"let p of gameService.game.world.prodMod\">\n        Production of {{p[0].name}} x {{p[1] }}\n      </li>\n      <li *ngFor=\"let p of gameService.game.world.unitMod\">\n          {{p[0].name}} yield and consume x{{p[1]}} more resources\n        <!-- {{p[0].name}} production x {{p[1] }} -->\n      </li>\n      <li *ngFor=\"let p of gameService.game.world.unitPrice\">\n        {{p[0].name}} price x {{p[1] }}\n      </li>\n    </ul>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home-world/home-world.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home-world/home-world.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_service__ = __webpack_require__("../../../../../src/app/game.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeWorldComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeWorldComponent = (function () {
    function HomeWorldComponent(gameService) {
        this.gameService = gameService;
    }
    HomeWorldComponent.prototype.ngOnInit = function () {
    };
    return HomeWorldComponent;
}());
HomeWorldComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-home-world',
        template: __webpack_require__("../../../../../src/app/home-world/home-world.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home-world/home-world.component.scss")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__game_service__["a" /* GameService */]) === "function" && _a || Object])
], HomeWorldComponent);

var _a;
//# sourceMappingURL=home-world.component.js.map

/***/ }),

/***/ "../../../../../src/app/lab/lab.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <div class=\"content-area\">\n    <h1>在这里，科学家讨论以前没有人看过的事情。</h1>\n    <div class=\"toggle-switch\">\n      <input type=\"checkbox\" id=\"toggle_1\" [(ngModel)]=\"resDone\">\n      <label for=\"toggle_1\">显示已完成的研究</label>\n    </div>\n    <span>科学: {{gameService.game.baseWorld.science.quantity | format}} - {{gameService.game.baseWorld.science.totalPerSec\n      | format}} /秒\n    </span>\n    <div class=\"card-columns card-columns-3\">\n      <app-action [action]=\"res\" *ngFor=\"let res of gameService.game.resList | resPipe: resDone;trackBy:getRestId\"></app-action>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/lab/lab.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/lab/lab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_service__ = __webpack_require__("../../../../../src/app/game.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LabComponent = (function () {
    function LabComponent(gameService) {
        this.gameService = gameService;
        this.resDone = false;
    }
    LabComponent.prototype.ngOnInit = function () {
        this.gameService.game.isLab = true;
    };
    LabComponent.prototype.ngOnDestroy = function () {
        this.gameService.game.isLab = false;
    };
    LabComponent.prototype.getRestId = function (index, res) {
        return res.getId();
    };
    return LabComponent;
}());
LabComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-lab',
        template: __webpack_require__("../../../../../src/app/lab/lab.component.html"),
        styles: [__webpack_require__("../../../../../src/app/lab/lab.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */]) === "function" && _a || Object])
], LabComponent);

var _a;
//# sourceMappingURL=lab.component.js.map

/***/ }),

/***/ "../../../../../src/app/main-nav/main-nav.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <div class=\"content-area\">\n    <router-outlet></router-outlet>\n  </div>\n\n  <clr-vertical-nav [clrVerticalNavCollapsible]=\"false\" [clr-nav-level]=\"2\">\n\n    <a class=\"clr-treenode-link text-capitalize experience font-weight-bold\" routerLinkActive=\"active\" *ngIf=\"showPrestige\"\n      routerLink=\"./unit/exp\">\n      Experience: {{gameService.game.prestige.experience.quantity | format}}\n    </a>\n    <clr-tree-node *ngFor=\"let list of typeLists | filterListNotEmpty; trackBy:getListId\">\n      <span class=\"font-weight-bold\">\n        <clr-icon class=\"alert-icon is-error\" shape=\"exclamation-triangle\" *ngIf=\"list.isEnding\"></clr-icon>\n        {{list.type}}\n      </span>\n\n      <ng-template [(clrIfExpanded)]=\"list.isCollapsed\">\n\n        <div class=\"unit-group\">\n          <clr-tree-node *ngFor=\"let g of list.list | filterMax; trackBy:getUnitId\">\n            <a [routerLink]=\"['./unit/'+g.id]\" class=\"clr-treenode-link\" routerLinkActive=\"active\">\n              <span class=\"resName\">\n                <clr-icon class=\"is-info\" shape=\"angle-double\" *ngIf=\"g.showUp\"></clr-icon>\n                <clr-icon class=\"alert-icon is-error\" shape=\"exclamation-triangle\" *ngIf=\"g.isEnding()\"></clr-icon>\n                <clr-icon class=\"is-warning is-solid\" shape=\"pause\" *ngIf=\"g.isStopped()\"></clr-icon>\n\n                {{g.name}}</span>\n              <span class=\"perSec\">\n                <span *ngIf=\"g.totalPerSec.abs().greaterThan(0.001)\">\n                  {{g.totalPerSec | format:true}}/s\n                </span>\n              </span>\n              <span>{{g.quantity | format:true}}</span>\n            </a>\n          </clr-tree-node>\n        </div>\n\n      </ng-template>\n    </clr-tree-node>\n\n  </clr-vertical-nav>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main-nav/main-nav.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".nav-text,\n.nav-link,\n.nav-group-content,\n.nav-group-trigger {\n  height: 24px !important;\n  line-height: 24px; }\n\n.clr-vertical-nav {\n  width: 320px !important;\n  padding-top: 12px;\n  height: calc(100vh - 108px) !important;\n  display: block !important;\n  overflow-y: scroll;\n  padding-bottom: 15px; }\n\n.resName {\n  display: inline-block;\n  width: 50%; }\n\n.perSec {\n  width: 25%;\n  display: inline-block; }\n\n.content-area {\n  max-height: calc(100vh - 108px) !important; }\n\n.unit-group {\n  margin-left: -21px !important; }\n\n.clr-treenode-link.active {\n  background-color: #fafafa; }\n\n.experience {\n  margin-left: 30px !important; }\n\n.clr-treenode-link {\n  height: auto; }\n\n:host /deep/ .nav-content {\n  min-height: 500px;\n  display: block !important;\n  overflow-y: hidden  !important; }\n\n:host /deep/ .clr-treenode-content {\n  line-height: 25px !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main-nav/main-nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_service__ = __webpack_require__("../../../../../src/app/game.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainNavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MainNavComponent = (function () {
    function MainNavComponent(gameService, route, activatedRoute, router) {
        this.gameService = gameService;
        this.route = route;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.mioId = "";
        this.list = this.gameService.game.baseWorld.list;
        this.showPrestige = false;
        this.gen = this.gameService.game.baseWorld.list[0];
    }
    MainNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameService.isMainNav = true;
        this.gameService.game.reloadUpIcons();
        this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
            _this.mioId = params['type'];
            // console.log(this.mioId)
            if (_this.mioId === "unit") {
                _this.typeLists = _this.gameService.game.lists;
                // this.typeLists = this.gameService.game.unitLists
            }
            else {
                _this.typeLists = _this.gameService.game.prestige.expLists;
            }
            _this.showPrestige = _this.mioId !== "unit";
            if (_this.mioId === undefined) {
                _this.mioId = "gen";
                return;
            }
        });
    };
    MainNavComponent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
        this.gameService.isMainNav = false;
    };
    MainNavComponent.prototype.getListId = function (index, list) {
        return list.getId();
    };
    MainNavComponent.prototype.getUnitId = function (index, base) {
        return base.id;
    };
    return MainNavComponent;
}());
MainNavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-unit',
        template: __webpack_require__("../../../../../src/app/main-nav/main-nav.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main-nav/main-nav.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _d || Object])
], MainNavComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=main-nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/model/cost.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cost; });
var Cost = (function () {
    function Cost(unit, basePrice, growFactor) {
        if (unit === void 0) { unit = null; }
        if (basePrice === void 0) { basePrice = Decimal(1); }
        if (growFactor === void 0) { growFactor = Decimal(1); }
        this.unit = unit;
        this.basePrice = basePrice;
        this.growFactor = growFactor;
    }
    Cost.prototype.getData = function () {
        var data = {};
        data.u = this.unit.id;
        data.b = this.basePrice;
        data.g = this.growFactor;
        return data;
    };
    return Cost;
}());

//# sourceMappingURL=cost.js.map

/***/ }),

/***/ "../../../../../src/app/model/gameModel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__worlds_engineer__ = __webpack_require__("../../../../../src/app/model/worlds/engineer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__("../../../../../src/app/model/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_util_Map__ = __webpack_require__("../../../../rxjs/util/Map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_util_Map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_util_Map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lz_string__ = __webpack_require__("../../../../lz-string/libs/lz-string.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lz_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lz_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__worlds_baseWorld__ = __webpack_require__("../../../../../src/app/model/worlds/baseWorld.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__worlds_machine__ = __webpack_require__("../../../../../src/app/model/worlds/machine.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__worlds_bee__ = __webpack_require__("../../../../../src/app/model/worlds/bee.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__worlds_forest__ = __webpack_require__("../../../../../src/app/model/worlds/forest.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__worlds_beach__ = __webpack_require__("../../../../../src/app/model/worlds/beach.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__worlds_frozen__ = __webpack_require__("../../../../../src/app/model/worlds/frozen.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__worlds_researchs__ = __webpack_require__("../../../../../src/app/model/worlds/researchs.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__worlds_prestige__ = __webpack_require__("../../../../../src/app/model/worlds/prestige.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__worlds_inferstation__ = __webpack_require__("../../../../../src/app/model/worlds/inferstation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__worlds_science__ = __webpack_require__("../../../../../src/app/model/worlds/science.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameModel; });


















var GameModel = (function () {
    //#endregion
    function GameModel() {
        this.isChanged = true;
        this.timeToEnd = Number.POSITIVE_INFINITY;
        //#region
        //    Cost
        this.buyExp = Decimal(1.1);
        this.buyExpUnit = Decimal(1);
        this.scienceCost1 = Decimal(100);
        this.scienceCost2 = Decimal(1E3);
        this.scienceCost3 = Decimal(1E4);
        this.scienceCost4 = Decimal(1E5);
        this.upgradeScienceExp = Decimal(4);
        this.upgradeScienceHireExp = Decimal(6);
        this.actionList = new Array();
        //  Research
        this.resList = Array();
        this.worldList = Array();
        this.unitMap = new __WEBPACK_IMPORTED_MODULE_5_rxjs_util_Map__["Map"]();
        this.lists = new Array();
        this.unitWithUp = new Array();
        //    Prestige
        this.currentEarning = Decimal(0);
        this.lifeEarning = Decimal(0);
        this.prestigeDone = Decimal(0);
        this.maxLevel = Decimal(0);
        this.worldTabAv = false;
        this.expTabAv = false;
        this.homeTabAv = false;
        this.minUser = 0;
        this.maxUser = 100;
        this.maxMax = 100;
        // ui stuff
        this.isLab = false;
        this.pause = false;
        this.timeModalOpened = false;
        this.unitLists = new Array();
        this.initialize();
    }
    GameModel.prototype.initialize = function () {
        this.currentEarning = Decimal(0);
        this.allBase = [];
        this.unitMap = new __WEBPACK_IMPORTED_MODULE_5_rxjs_util_Map__["Map"]();
        this.lists = new Array();
        this.worldList = Array();
        this.baseWorld = new __WEBPACK_IMPORTED_MODULE_8__worlds_baseWorld__["a" /* BaseWorld */](this);
        this.science = new __WEBPACK_IMPORTED_MODULE_17__worlds_science__["a" /* Science */](this);
        this.machines = new __WEBPACK_IMPORTED_MODULE_9__worlds_machine__["a" /* Machine */](this);
        this.engineers = new __WEBPACK_IMPORTED_MODULE_0__worlds_engineer__["a" /* Engineers */](this);
        this.bee = new __WEBPACK_IMPORTED_MODULE_10__worlds_bee__["a" /* Bee */](this);
        this.forest = new __WEBPACK_IMPORTED_MODULE_11__worlds_forest__["a" /* Forest */](this);
        this.beach = new __WEBPACK_IMPORTED_MODULE_12__worlds_beach__["a" /* Beach */](this);
        this.frozen = new __WEBPACK_IMPORTED_MODULE_13__worlds_frozen__["a" /* Frozen */](this);
        this.infestation = new __WEBPACK_IMPORTED_MODULE_16__worlds_inferstation__["a" /* Infestation */](this);
        this.research = new __WEBPACK_IMPORTED_MODULE_14__worlds_researchs__["a" /* Researchs */](this);
        this.prestige = new __WEBPACK_IMPORTED_MODULE_15__worlds_prestige__["a" /* Prestige */](this);
        this.worldList.push(this.baseWorld);
        this.worldList.push(this.science);
        this.worldList.push(this.machines);
        this.worldList.push(this.engineers);
        this.worldList.push(this.forest);
        this.worldList.push(this.bee);
        this.worldList.push(this.beach);
        this.worldList.push(this.frozen);
        this.worldList.push(this.infestation);
        this.worldList.push(this.prestige);
        this.worldList.push(this.research);
        this.worldList.forEach(function (w) { return w.declareStuff(); });
        this.worldList.forEach(function (w) { return w.initStuff(); });
        this.worldList.forEach(function (w) { return w.addWorld(); });
        this.all = Array.from(this.unitMap.values()).filter(function (u) { return !u.neverEnding; });
        this.world = __WEBPACK_IMPORTED_MODULE_1__world__["a" /* World */].getBaseWorld(this);
        this.generateRandomWorld();
        this.setInitialStat();
        // console.log("prefix: " + World.worldPrefix.length)
        // console.log("type: " + World.worldTypes.length)
        // console.log("suff: " + World.worldSuffix.length)
    };
    GameModel.prototype.setInitialStat = function () {
        this.all.forEach(function (u) {
            u.initialize();
            u.actions.forEach(function (a) { return a.initialize(); });
        });
        this.resList.forEach(function (r) { return r.initialize(); });
        this.baseWorld.food.unlocked = true;
        this.baseWorld.littleAnt.unlocked = true;
        this.baseWorld.littleAnt.buyAction.unlocked = true;
        this.research.rDirt.unlocked = true;
        this.unitWithUp = new Array();
        this.unitWithUp.push(this.baseWorld.littleAnt);
        this.baseWorld.food.quantity = this.baseWorld.food.quantity.plus(100);
        this.unlockUnits(this.all.filter(function (u) { return u.quantity.greaterThan(0); }))();
        this.reloadProduction();
        //  this.reloadList()
    };
    GameModel.prototype.setMaxLevel = function () {
        this.maxMax = Decimal.min(this.maxLevel.div(12), 1000).floor().toNumber();
        this.maxUser = Decimal.min(this.maxUser, this.maxMax).floor().toNumber();
    };
    GameModel.prototype.getProduction = function (prod, level, factorial, fraction, previous) {
        if (previous === void 0) { previous = Decimal(1); }
        var ret = Decimal(0);
        var production = prod.getprodPerSec();
        if (prod.isActive())
            ret = Decimal.pow(fraction, level) //    exponential
                .times(prod.unit.quantity) //    time
                .times(production) //    efficenty
                .div(factorial)
                .times(previous);
        var prod2 = prod.unit.producedBy.filter(function (p) { return p.isActive(); });
        for (var _i = 0, prod2_1 = prod2; _i < prod2_1.length; _i++) {
            var p2 = prod2_1[_i];
            ret = ret.plus(this.getProduction(p2, level.plus(1), factorial.times(level.plus(1)), fraction, production.times(previous)));
        }
        return ret;
    };
    /**
     * Perform an update taking care of negative production.
     * If a resource end all consumer will be stopped and the function will be called again.
     * Can handle only 3 level of producer/consumer (it solve equation un to cubic)
     *
     * @param dif time elapsed in millisecond
     */
    GameModel.prototype.longUpdate = function (dif, forceUp) {
        // this.reloadProduction()
        if (forceUp === void 0) { forceUp = false; }
        var maxTime = dif;
        var unitZero = null;
        var unl = this.all.filter(function (u) { return u.unlocked; });
        // console.log(this.timeToEnd + " " + dif)
        if (this.isChanged || dif > this.timeToEnd || dif > 1000) {
            //  reload max time
            this.timeToEnd = Number.POSITIVE_INFINITY;
            this.lists.forEach(function (l) { return l.isEnding = false; });
            this.all.filter(function (u) { return u.quantity.lessThan(1); }).forEach(function (res) {
                res.producedBy.filter(function (p) { return p.efficiency.lessThan(0); })
                    .forEach(function (p) { return p.unit.percentage = 0; });
            });
            this.all.forEach(function (a) { return a.endIn = Number.POSITIVE_INFINITY; });
            for (var _i = 0, _a = unl.filter(function (u) {
                return u.producedBy.filter(function (p) { return p.efficiency.lessThan(0); }).length > 0;
            }); _i < _a.length; _i++) {
                var res = _a[_i];
                var a = Decimal(0);
                var b = Decimal(0);
                var c = Decimal(0);
                var d = res.quantity;
                for (var _b = 0, _c = res.producedBy.filter(function (r) { return r.isActive() && r.unit.unlocked; }); _b < _c.length; _b++) {
                    var prod1 = _c[_b];
                    // x
                    var prodX = prod1.getprodPerSec();
                    c = c.plus(prodX.times(prod1.unit.quantity));
                    for (var _d = 0, _e = prod1.unit.producedBy.filter(function (r2) { return r2.isActive() && r2.unit.unlocked; }); _d < _e.length; _d++) {
                        var prod2 = _e[_d];
                        // x^2
                        var prodX2 = prod2.getprodPerSec().times(prodX);
                        b = b.plus(prodX2.times(prod2.unit.quantity));
                        for (var _f = 0, _g = prod2.unit.producedBy.filter(function (r3) { return r3.isActive() && r3.unit.unlocked; }); _f < _g.length; _f++) {
                            var prod3 = _g[_f];
                            // x^3
                            var prodX3 = prod3.getprodPerSec().times(prodX2);
                            a = a.plus(prodX3.times(prod3.unit.quantity));
                        }
                    }
                }
                a = a.div(6);
                b = b.div(2);
                if (a.lessThan(0)
                    || b.lessThan(0)
                    || c.lessThan(0)
                    || d.lessThan(0)) {
                    var solution = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* Utils */].solveCubic(a, b, c, d).filter(function (s) { return s.greaterThan(0); });
                    if (d.lessThan(Number.EPSILON)) {
                        res.quantity = Decimal(0);
                    }
                    for (var _h = 0, solution_1 = solution; _h < solution_1.length; _h++) {
                        var s = solution_1[_h];
                        if (maxTime > s.toNumber() * 1000) {
                            maxTime = s.toNumber() * 1000;
                            unitZero = res;
                        }
                        res.endIn = Math.min(s.times(1000).toNumber(), res.endIn);
                        this.timeToEnd = Math.min(this.timeToEnd, res.endIn);
                        // console.log("End " + this.timeToEnd)
                    }
                }
            }
            // console.log("long end")
            this.isChanged = false;
        }
        else {
            // console.log("short")
            this.timeToEnd = this.timeToEnd - dif;
        }
        unl.filter(function (u) { return u.endIn > 0; }).forEach(function (u) { return u.endIn = u.endIn - dif; });
        //  Update resource
        if (!this.pause || forceUp) {
            if (maxTime > Number.EPSILON)
                this.update(maxTime);
            if (unitZero && unitZero.quantity.lessThan(Number.EPSILON)) {
                unitZero.producedBy.filter(function (p) { return p.efficiency.lessThan(0); }).forEach(function (p) { return p.unit.percentage = 0; });
                // fix for infestatiion world
                if (unitZero === this.infestation.poisonousPlant) {
                    this.infestation.poisonousPlant2.quantity = Decimal(0);
                }
            }
            var remaning = dif - maxTime;
            if (remaning > Number.EPSILON) {
                this.isChanged = true;
                this.reloadProduction();
                this.longUpdate(remaning);
            }
        }
        //  this.reloadProduction()
    };
    /**
     * Called when update end, adjust some values.
     */
    GameModel.prototype.postUpdate = function () {
        this.all.filter(function (u) { return u.quantity.lessThan(Number.EPSILON); }).forEach(function (u) { return u.quantity = Decimal(0); });
        this.lists.forEach(function (l) { return l.isEnding = !!l.list.find(function (u) { return u.isEnding(); }); });
        this.all.filter(function (un) { return un.unlocked; }).forEach(function (u) {
            u.reloadUiPerSec();
        });
        if (this.isLab)
            this.checkResearch();
        if (this.activeUnit)
            this.activeUnit.reloadAtcMaxBuy();
        if (this.timeModalOpened) {
            this.prestige.time.reloadAtcMaxBuy();
        }
    };
    /**
     * Perform an update without handling negative quantity number, can result in negative quantity.
     *
     * @param dif time elapsed in millisecond
     */
    GameModel.prototype.update = function (dif) {
        var fraction = Decimal(dif / 1000);
        var all = Array.from(this.unitMap.values());
        for (var _i = 0, all_1 = all; _i < all_1.length; _i++) {
            var res = all_1[_i];
            for (var _a = 0, _b = res.producedBy.filter(function (p) { return p.isActive() && p.unit.unlocked; }); _a < _b.length; _a++) {
                var prod = _b[_a];
                res.toAdd = res.toAdd.plus(this.getProduction(prod, Decimal(1), Decimal(1), fraction));
            }
        }
        // all.forEach(u => {
        //   u.quantity = u.quantity.plus(u.toAdd)
        //   u.toAdd = Decimal(0)
        // })
        for (var _c = 0, all_2 = all; _c < all_2.length; _c++) {
            var u = all_2[_c];
            u.quantity = u.quantity.plus(u.toAdd);
            u.toAdd = Decimal(0);
        }
    };
    /**
     * Unlock units and recheck dependencies.
     */
    GameModel.prototype.unlockUnits = function (units, message) {
        var _this = this;
        if (message === void 0) { message = null; }
        return function () {
            var ok = false;
            units.filter(function (u) { return u.avabileThisWorld; }).forEach(function (u) {
                ok = ok || (!u.unlocked);
                u.unlocked = true;
                if (u instanceof __WEBPACK_IMPORTED_MODULE_6__units_unit__["a" /* Unit */])
                    if (u.buyAction)
                        u.buyAction.unlocked = true;
            });
            _this.all.filter(function (u) { return u.unlocked; }).forEach(function (u2) { return u2.produces.forEach(function (p) {
                return p.product.unlocked = p.product.avabileThisWorld;
            }); });
            _this.unitWithUp = _this.all.filter(function (u) { return u.unlocked && (u.upHire || u.upSpecial || u.upAction); });
            // if (ok)
            //   this.reloadList()
            return ok;
        };
    };
    /**
     * Initialize 3 random world
     */
    GameModel.prototype.generateRandomWorld = function (force) {
        if (force === void 0) { force = false; }
        if (!this.nextWorlds || force) {
            this.nextWorlds = [
                __WEBPACK_IMPORTED_MODULE_1__world__["a" /* World */].getRandomWorld(this),
                __WEBPACK_IMPORTED_MODULE_1__world__["a" /* World */].getRandomWorld(this),
                __WEBPACK_IMPORTED_MODULE_1__world__["a" /* World */].getRandomWorld(this)
            ];
        }
        else {
            for (var i = 0; i < 3; i++) {
                if (!this.nextWorlds[i].keep)
                    this.nextWorlds[i] = __WEBPACK_IMPORTED_MODULE_1__world__["a" /* World */].getRandomWorld(this);
            }
        }
        for (var i = 0; i < 3; i++) {
            this.nextWorlds[i].id = "" + i;
        }
    };
    /**
     * Get a savegame
     */
    GameModel.prototype.getSave = function () {
        var save = {};
        save.list = Array.from(this.unitMap.entries()).map(function (v) { return v[1].getData(); });
        save.last = Date.now();
        save.cur = this.currentEarning;
        save.life = this.lifeEarning;
        save.w = this.world.getData();
        save.nw = this.nextWorlds.map(function (w) { return w.getData(); });
        save.pre = this.prestige.allPrestigeUp.map(function (p) { return p.getData(); });
        save.res = this.resList.map(function (r) { return r.getData(); });
        save.pd = this.prestigeDone;
        save.worldTabAv = this.worldTabAv;
        save.expTabAv = this.expTabAv;
        save.ml = this.maxLevel;
        save.htv = this.homeTabAv;
        save.pause = this.pause;
        // save.gameVers = "0.0.1"
        save.gameVers = "0.0.7";
        return __WEBPACK_IMPORTED_MODULE_7_lz_string__["compressToBase64"](JSON.stringify(save));
    };
    /**
     * Load a savegame
     * @param saveRaw
     */
    GameModel.prototype.load = function (saveRaw) {
        var _this = this;
        this.isChanged = true;
        if (saveRaw) {
            this.setInitialStat();
            saveRaw = __WEBPACK_IMPORTED_MODULE_7_lz_string__["decompressFromBase64"](saveRaw);
            var save = JSON.parse(saveRaw);
            // console.log(saveRaw)
            this.currentEarning = Decimal(save.cur);
            this.lifeEarning = Decimal(save.life);
            this.world.restore(save.w, true);
            this.maxLevel = Decimal(save.ml);
            for (var _i = 0, _a = save.list; _i < _a.length; _i++) {
                var s = _a[_i];
                var unit = this.unitMap.get(s.id);
                if (unit)
                    unit.restore(s);
            }
            this.nextWorlds[0].restore(save.nw[0]);
            this.nextWorlds[1].restore(save.nw[1]);
            this.nextWorlds[2].restore(save.nw[2]);
            var _loop_1 = function (s) {
                var up = this_1.prestige.allPrestigeUp.find(function (p) { return p.id === s.id; });
                if (up)
                    up.restore(s);
            };
            var this_1 = this;
            for (var _b = 0, _c = save.pre; _b < _c.length; _b++) {
                var s = _c[_b];
                _loop_1(s);
            }
            var _loop_2 = function (s) {
                var res = this_2.resList.find(function (p) { return p.id === s.id; });
                if (res)
                    res.restore(s);
            };
            var this_2 = this;
            for (var _d = 0, _e = save.res; _d < _e.length; _d++) {
                var s = _e[_d];
                _loop_2(s);
            }
            if (save.pd)
                this.prestigeDone = Decimal(save.pd);
            if (save.worldTabAv)
                this.worldTabAv = save.worldTabAv;
            if (save.expTabAv)
                this.expTabAv = save.expTabAv;
            if (save.htv)
                this.homeTabAv = save.htv;
            this.reloadProduction();
            //  Fixes for older savegame, corrupted...
            this.science.science1Production.unlocked = true;
            this.resList.filter(function (r) { return r.owned(); }).forEach(function (r) {
                return r.toUnlock.filter(function (t) { return t instanceof __WEBPACK_IMPORTED_MODULE_4__units_action__["a" /* Research */] && !t.owned(); })
                    .forEach(function (t2) { return t2.unlocked = true; });
            });
            this.unitWithUp = this.all.filter(function (u) { return u.unlocked && (u.upHire || u.upSpecial || u.upAction); });
            //  fixing for old version
            if (save.gameVers && save.gameVers === "0.0.1") {
                var linear = 1 / 4;
                var toUnlockMultiplier_1 = Decimal.pow(1.0005, this.world.level).times(this.world.level + 1 / linear)
                    .times(linear);
                this.world.toUnlock.forEach(function (tu) {
                    if (tu.unit === _this.baseWorld.nestAnt ||
                        tu.unit === _this.bee.hiveBee ||
                        tu.unit === _this.forest.beetleNest) {
                        tu.basePrice = Decimal(30).times(toUnlockMultiplier_1).floor();
                    }
                    if (tu.unit === _this.bee.hiveBee) {
                        tu.basePrice = tu.basePrice.div(2);
                    }
                });
            }
            if (save.pause)
                this.pause = true;
            this.reloadProduction();
            this.unitLists.splice(0, this.unitLists.length);
            //  this.reloadList()
            return save.last;
        }
        return null;
    };
    GameModel.prototype.reloadProduction = function () {
        this.all.filter(function (un) { return un.unlocked; }).forEach(function (u) {
            u.loadProduction();
        });
        this.actionList.forEach(function (a) { return a.reload(); });
        // console.log("reloadProduction")
    };
    GameModel.prototype.getCost = function (data) {
        return new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.all.find(function (u) { return u.id === data.u; }), Decimal(data.b), Decimal(data.g));
    };
    GameModel.prototype.getExperience = function () {
        return Decimal(this.world.experience);
    };
    GameModel.prototype.reloadUpIcons = function () {
        this.unitWithUp.forEach(function (u) { return u.checkUp(); });
    };
    GameModel.prototype.checkResearch = function () {
        this.resList.filter(function (r) { return r.unlocked && r.avabileThisWorld; })
            .forEach(function (res) { return res.setMaxBuy(); });
    };
    return GameModel;
}());

//# sourceMappingURL=gameModel.js.map

/***/ }),

/***/ "../../../../../src/app/model/production.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("../../../../../src/app/model/utils.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Production; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Production = (function (_super) {
    __extends(Production, _super);
    function Production(unit, // who make
        efficiency, unlocked) {
        if (efficiency === void 0) { efficiency = Decimal(1); }
        if (unlocked === void 0) { unlocked = true; }
        var _this = _super.call(this, unlocked) || this;
        _this.unit = unit;
        _this.efficiency = efficiency;
        _this.product = null;
        _this.defaultUnlocked = true;
        _this.active = true;
        _this.defaultUnlocked = unlocked;
        return _this;
    }
    Production.prototype.getprodPerSec = function (eff) {
        if (eff === void 0) { eff = true; }
        if (this.unit.unlocked && this.unlocked) {
            var sum = Decimal(1);
            for (var _i = 0, _a = this.product.bonusProduction; _i < _a.length; _i++) {
                var p = _a[_i];
                sum = sum.plus(p[0].quantity.times(p[1]));
            }
            var totalBonus = Decimal(1);
            if (this.bonusList && this.bonusList.length > 0)
                for (var i = 0; i < this.bonusList.length; i++)
                    totalBonus = totalBonus.plus(this.bonusList[i][0].quantity.times(this.bonusList[i][1]));
            return this.efficiency
                .times(this.unit.getProduction())
                .times(eff ? this.unit.percentage : Decimal(100)).div(100)
                .times(this.efficiency.greaterThan(0) ? this.product.worldProdModifiers : Decimal(1))
                .times(sum)
                .times(totalBonus);
        }
        else
            return Decimal(0);
    };
    Production.prototype.isActive = function () {
        return this.active && this.unlocked;
    };
    return Production;
}(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* Unlocable */]));

//# sourceMappingURL=production.js.map

/***/ }),

/***/ "../../../../../src/app/model/typeList.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeList; });
var TypeList = (function () {
    function TypeList(type, list) {
        if (type === void 0) { type = ""; }
        if (list === void 0) { list = new Array(); }
        this.type = type;
        this.list = list;
        this.isCollapsed = false;
        this.isEnding = false;
    }
    TypeList.prototype.getId = function () {
        return this.type;
    };
    TypeList.prototype.all100 = function () {
        this.list.forEach(function (u) { return u.percentage = 100; });
        this.list[0].game.isChanged = true;
    };
    TypeList.prototype.all0 = function () {
        this.list.forEach(function (u) { return u.percentage = 0; });
        this.list[0].game.isChanged = true;
    };
    return TypeList;
}());

//# sourceMappingURL=typeList.js.map

/***/ }),

/***/ "../../../../../src/app/model/units/action.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__("../../../../../src/app/model/units/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BuyAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return BuyAndUnlockAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Research; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UpAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return UpSpecial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UpHire; });
/* unused harmony export UnlockProd */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TimeWarp; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Action = (function (_super) {
    __extends(Action, _super);
    function Action(id, name, fn, priceF, description, game, unit) {
        if (priceF === void 0) { priceF = Array(); }
        if (description === void 0) { description = ""; }
        if (unit === void 0) { unit = null; }
        var _this = _super.call(this, game, id, name, description) || this;
        _this.fn = fn;
        _this.priceF = priceF;
        _this.game = game;
        _this.unit = unit;
        _this.oneTime = false;
        _this.showNumber = true;
        _this.realPriceNow = new Array();
        _this.maxBuy = new Decimal(0);
        _this.realPriceNow = _this.getCosts();
        _this.game.actionList.push(_this);
        return _this;
    }
    Action.prototype.getRealPrices = function () {
        var _this = this;
        if (this.unit)
            return this.priceF.map(function (p) { return new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](p.unit, p.basePrice.times(_this.unit.worldBuyModifiers), p.growFactor); });
        else
            return this.priceF;
    };
    Action.prototype.buy = function (number) {
        var _this = this;
        if (number === void 0) { number = new Decimal(1); }
        if (number.lessThanOrEqualTo(0))
            return false;
        if (this.unlocked) {
            var prices = this.getCosts(number);
            if (prices.filter(function (v) { return v.basePrice.greaterThan(v.unit.quantity); }).length === 0) {
                prices.forEach(function (p) {
                    p.unit.quantity = p.unit.quantity.minus(p.basePrice);
                    _this.game.currentEarning = _this.game.currentEarning.plus(p.basePrice);
                });
                this.quantity = this.quantity.plus(number);
                if (this.fn)
                    this.fn(number);
                if (this.oneTime)
                    this.unlocked = false;
                this.game.isChanged = true;
                this.game.reloadProduction();
                this.realPriceNow = this.getCosts();
                this.setMaxBuy();
                return true;
            }
        }
        return false;
    };
    Action.prototype.getCosts = function (number) {
        var _this = this;
        if (number === void 0) { number = new Decimal(1); }
        var price = this.getRealPrices();
        return price.map(function (c) {
            var constRet = new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */]();
            constRet.unit = c.unit;
            if (!c.growFactor.equals(1))
                constRet.basePrice = c.basePrice.times((c.growFactor.pow(_this.quantity)).times((c.growFactor.pow(number)).minus(1))).div(c.growFactor.minus(1)).ceil();
            else
                constRet.basePrice = c.basePrice.times(number).ceil();
            return constRet;
        });
    };
    Action.prototype.getBuyMax = function () {
        if (!this.unlocked)
            return Decimal(0);
        var price = this.getRealPrices();
        //    https://blog.kongregate.com/the-math-of-idle-games-part-i/
        var max = Decimal(Infinity);
        for (var _i = 0, price_1 = price; _i < price_1.length; _i++) {
            var p = price_1[_i];
            max = Decimal.min(max, (p.growFactor.lessThanOrEqualTo(1) ?
                p.unit.quantity.div(p.basePrice) :
                Decimal.log((((p.growFactor.minus(1)).times(p.unit.quantity))
                    .div((p.growFactor.pow(this.quantity)).times(p.basePrice))).plus(1), p.growFactor.toNumber())).floor());
        }
        if (this.oneTime && max.greaterThanOrEqualTo(1))
            return Decimal(1);
        if (this.limit)
            max = Decimal.min(max, this.limit.minus(this.quantity));
        return max;
    };
    Action.prototype.owned = function () {
        return this.quantity.greaterThan(0);
    };
    Action.prototype.reload = function () {
        this.realPriceNow = this.getCosts();
    };
    Action.prototype.setMaxBuy = function () {
        if (this.oneTime) {
            this.maxBuy = !this.owned() && this.checkBuy() ? Decimal(1) : Decimal(0);
        }
        else {
            this.maxBuy = this.getBuyMax();
        }
    };
    Action.prototype.checkBuy = function () {
        if (!this.unlocked)
            return false;
        this.realPriceNow = this.getCosts();
        var size1 = this.realPriceNow.length;
        for (var i = 0; i < size1; i++)
            if (this.realPriceNow[i].basePrice.greaterThan(this.realPriceNow[i].unit.quantity))
                return false;
        return true;
    };
    Action.prototype.getId = function () {
        return (this.unit ? this.unit.id : "") + "_" + this.id;
    };
    return Action;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */]));

var BuyAction = (function (_super) {
    __extends(BuyAction, _super);
    function BuyAction(game, unit, cost, doNext) {
        if (doNext === void 0) { doNext = null; }
        var _this = _super.call(this, "actBuy", "雇佣", (function (n) {
            _this.unit.quantity = _this.unit.quantity.plus(n.times(_this.unit.upHire ? _this.unit.upHire.quantity.plus(1) : Decimal(1)));
            if (_this.doNext)
                _this.doNext();
            return true;
        }), cost, "获得更多的单位。", game, unit) || this;
        _this.doNext = doNext;
        unit.buyAction = _this;
        return _this;
    }
    BuyAction.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.unlocked = false;
    };
    return BuyAction;
}(Action));

var BuyAndUnlockAction = (function (_super) {
    __extends(BuyAndUnlockAction, _super);
    function BuyAndUnlockAction(game, unit, cost, toUnlock, required, doAfter, once) {
        if (required === void 0) { required = 1; }
        if (doAfter === void 0) { doAfter = null; }
        if (once === void 0) { once = false; }
        var _this = _super.call(this, game, unit, cost, function () {
            if (_this.toUnlock && _this.unit.quantity.greaterThanOrEqualTo(_this.required))
                _this.unit.model.unlockUnits(_this.toUnlock)();
            if (_this.doAfter)
                _this.doAfter();
        }) || this;
        _this.unit = unit;
        _this.cost = cost;
        _this.toUnlock = toUnlock;
        _this.required = required;
        _this.doAfter = doAfter;
        _this.oneTime = once;
        return _this;
    }
    return BuyAndUnlockAction;
}(BuyAction));

var Research = (function (_super) {
    __extends(Research, _super);
    function Research(id, name, description, cost, toUnlock, game, doAfter) {
        if (doAfter === void 0) { doAfter = null; }
        var _this = _super.call(this, id, name, function (n) {
            if (_this.toUnlock)
                game.unlockUnits(_this.toUnlock)();
            if (_this.doAfter)
                _this.doAfter();
            return true;
        }, cost, description, game) || this;
        _this.toUnlock = toUnlock;
        _this.game = game;
        _this.doAfter = doAfter;
        _this.oneTime = true;
        game.resList.push(_this);
        return _this;
    }
    return Research;
}(Action));

var UpAction = (function (_super) {
    __extends(UpAction, _super);
    function UpAction(game, unit, costs) {
        var _this = _super.call(this, "upA", "团队合作", null, costs, "获得更好的生产加成。", game, unit) || this;
        _this.unit = unit;
        _this.unit.upAction = _this;
        _this.unlocked = false;
        return _this;
    }
    return UpAction;
}(Action));

var UpSpecial = (function (_super) {
    __extends(UpSpecial, _super);
    function UpSpecial(game, unit) {
        var _this = _super.call(this, "upS", "Experiment", null, [
            new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](unit, Decimal(100), Decimal(10)),
            new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](unit.model.baseWorld.science, Decimal(100), Decimal(12))
        ], "做一些实验，以增加产量。", game, unit) || this;
        _this.unit = unit;
        _this.unit.upSpecial = _this;
        _this.unlocked = false;
        return _this;
    }
    return UpSpecial;
}(Action));

var UpHire = (function (_super) {
    __extends(UpHire, _super);
    function UpHire(game, unit, costs) {
        var _this = _super.call(this, "upH", "双胞胎", null, costs, "以相同的价格获得更多的单位。", game, unit) || this;
        _this.unit = unit;
        _this.unit.upHire = _this;
        _this.unit.buyAction.up = _this;
        _this.unlocked = false;
        return _this;
    }
    return UpHire;
}(Action));

var UnlockProd = (function (_super) {
    __extends(UnlockProd, _super);
    function UnlockProd(game, unit, cost, prod) {
        var _this = _super.call(this, "uProd-" + prod.unit.id, "Training", function (n) { prod.unlocked = true; return true; }, cost, "Train new units", game) || this;
        _this.oneTime = true;
        _this.unlocked = true;
        return _this;
    }
    return UnlockProd;
}(Action));

var TimeWarp = (function (_super) {
    __extends(TimeWarp, _super);
    function TimeWarp(game, timeUnits, timeName) {
        var _this = _super.call(this, "actWarp", timeName, (function (n) {
            game.longUpdate(n.times(timeUnits).times(1000).toNumber(), true);
            _this.game.isChanged = true;
            return true;
        }), [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](game.prestige.time, timeUnits, Decimal(1))], "Time warp by " + timeName, game) || this;
        _this.timeUnits = timeUnits;
        _this.timeName = timeName;
        _this.initialize();
        return _this;
    }
    TimeWarp.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.unlocked = true;
        this.showNumber = false;
    };
    return TimeWarp;
}(Action));

//# sourceMappingURL=action.js.map

/***/ }),

/***/ "../../../../../src/app/model/units/base.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("../../../../../src/app/model/utils.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

// export enum Type {
//   Material,
//   Generator,
//   Ant,
//   Bee,
//   Food,
//   Crystal,
//   Soil,
//   Fungus,
//   Wood,
//   Sand,
//   Machinery,
//   Engineer,
//   Other,
//   Scientist,
//   Laser,
//   Farmer,
//   Mining,
//   SoilG,
//   WoodG
// }
var Base = (function (_super) {
    __extends(Base, _super);
    function Base(game, id, name, description, 
        // public types: Type[] = [],
        unlocked, quantity, avabileBaseWorld, avabileThisWorld) {
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        // public types: Type[] = [],
        if (unlocked === void 0) { unlocked = false; }
        if (quantity === void 0) { quantity = Decimal(0); }
        if (avabileBaseWorld === void 0) { avabileBaseWorld = true; }
        if (avabileThisWorld === void 0) { avabileThisWorld = true; }
        var _this = _super.call(this, unlocked) || this;
        _this.game = game;
        _this.id = id;
        _this.name = name;
        _this.description = description;
        _this.quantity = quantity;
        _this.avabileBaseWorld = avabileBaseWorld;
        _this.avabileThisWorld = avabileThisWorld;
        _this.endIn = 0;
        _this.game.allBase.push(_this);
        return _this;
    }
    //     Save and Load
    Base.prototype.getData = function () {
        var data = {};
        if (this.quantity.greaterThan(0))
            data.q = this.quantity;
        if (this.unlocked)
            data.u = this.unlocked;
        data.id = this.id;
        data.atw = this.avabileThisWorld;
        return data;
    };
    Base.prototype.restore = function (data) {
        if (data.q)
            this.quantity = new Decimal(data.q);
        else
            this.quantity = Decimal(0);
        if (data.u)
            this.unlocked = data.u;
        else
            this.unlocked = false;
        if (data.atw)
            this.avabileThisWorld = data.atw;
    };
    Base.prototype.initialize = function () {
        this.unlocked = false;
        this.quantity = Decimal(0);
        this.avabileThisWorld = this.avabileBaseWorld;
    };
    Base.prototype.isEnding = function () {
        return this.endIn < Number.POSITIVE_INFINITY;
    };
    Base.prototype.isStopped = function () { return false; };
    Base.prototype.haveUp = function () { return false; };
    Base.prototype.getId = function () {
        return this.id;
    };
    return Base;
}(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* Unlocable */]));

//# sourceMappingURL=base.js.map

/***/ }),

/***/ "../../../../../src/app/model/units/togableProductions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TogableProduction; });
var TogableProduction = (function () {
    function TogableProduction(description, prods) {
        this.description = description;
        this.prods = prods;
        this.uiModel = true;
        this.uiModel = this.isActive();
    }
    TogableProduction.prototype.isActive = function () {
        return this.prods[0].active;
    };
    TogableProduction.prototype.turnOnOff = function () {
        var _this = this;
        this.prods.forEach(function (a) { return a.active = _this.uiModel; });
    };
    return TogableProduction;
}());

//# sourceMappingURL=togableProductions.js.map

/***/ }),

/***/ "../../../../../src/app/model/units/unit.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__("../../../../../src/app/model/units/base.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Unit; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(model, id, name, description, neverEnding) {
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        if (neverEnding === void 0) { neverEnding = false; }
        var _this = _super.call(this, model, id) || this;
        _this.model = model;
        _this.neverEnding = neverEnding;
        _this.toAdd = Decimal(0);
        _this.producedBy = Array();
        _this.produces = Array();
        _this.percentage = 100;
        _this.worldProdModifiers = Decimal(1);
        _this.worldEffModifiers = Decimal(1);
        _this.worldBuyModifiers = Decimal(1);
        _this.actions = Array();
        _this.bonusProduction = Array();
        _this.prestigeBonusProduction = Array();
        _this.prestigeBonusQuantityValue = Decimal(5);
        _this.alwaysOn = false;
        _this.showUp = false;
        _this.showTables = true;
        _this.showActions = true;
        _this.production = Decimal(0);
        _this.totalPerSec = Decimal(0);
        _this.totalProducers = Decimal(0);
        _this.togableProductions = null;
        _this.model.unitMap.set(_this.id, _this);
        _this.name = name;
        _this.description = description;
        return _this;
    }
    Unit.prototype.addProductor = function (prod) {
        prod.product = this;
        this.producedBy.push(prod);
        prod.unit.produces.push(prod);
    };
    Unit.prototype.loadProduction = function () {
        var sum = Decimal(1);
        for (var _i = 0, _a = this.prestigeBonusProduction; _i < _a.length; _i++) {
            var p = _a[_i];
            sum = sum.plus(p.quantity.times(0.3));
        } //  hardcoded +30% prestige bonus...
        this.production = (this.getBoost().plus(1)).times((this.upSpecial ? this.upSpecial.quantity : Decimal(0)).plus(1)).times(this.worldEffModifiers).times(sum);
        this.showActions = !!this.actions.find(function (a) { return a.unlocked; });
    };
    Unit.prototype.reloadUiPerSec = function () {
        var _this = this;
        this.totalProducers = Decimal(0);
        this.totalPerSec = Decimal(0);
        this.producedBy.filter(function (p) { return p.isActive() && p.unit.unlocked; }).forEach(function (p) {
            _this.totalPerSec = _this.totalPerSec.plus(p.getprodPerSec().times(p.unit.quantity));
            _this.totalProducers = _this.totalProducers.plus(p.unit.quantity);
        });
    };
    Unit.prototype.getBoost = function () {
        return this.model.research.up1.owned() && this.buyAction ?
            this.buyAction.quantity.times(0.005)
                .times(this.upAction ? this.upAction.quantity.plus(1) : Decimal(1))
                .times(Decimal(1).plus(this.upHire && this.model.research.upCombined.owned() ? this.upHire.quantity : Decimal(0)))
            : Decimal(0);
    };
    Unit.prototype.getProduction = function () {
        // this.loadProduction()
        return this.production;
    };
    //     Save and Load
    Unit.prototype.getData = function () {
        var data = _super.prototype.getData.call(this);
        data.a = this.actions.filter(function (a) { return a.unlocked; }).map(function (a) { return a.getData(); });
        data.w = this.worldProdModifiers;
        data.e = this.worldEffModifiers;
        data.b = this.worldBuyModifiers;
        data.r = this.percentage;
        data.p = this.producedBy.map(function (p) { return [p.unit.id, p.unlocked, p.active]; });
        return data;
    };
    Unit.prototype.restore = function (data) {
        var _this = this;
        _super.prototype.restore.call(this, data);
        if (data.w)
            this.worldProdModifiers = new Decimal(data.w);
        if (data.e)
            this.worldEffModifiers = new Decimal(data.e);
        if (data.b)
            this.worldBuyModifiers = new Decimal(data.b);
        if (data.a) {
            var _loop_1 = function (s) {
                this_1.actions.find(function (a) { return a.id === s.id; }).restore(s);
            };
            var this_1 = this;
            for (var _i = 0, _a = data.a; _i < _a.length; _i++) {
                var s = _a[_i];
                _loop_1(s);
            }
        }
        if (data.p)
            data.p.forEach(function (e) {
                var prod = _this.producedBy.find(function (p) { return p.unit.id === e[0]; });
                if (prod) {
                    if (typeof e[1] === 'boolean')
                        prod.unlocked = e[1];
                    if (typeof e[2] === 'boolean')
                        prod.active = e[2];
                }
            });
        if (this.togableProductions)
            this.togableProductions.forEach(function (tp) { return tp.uiModel = tp.isActive(); });
        // if (data.r)
        this.percentage = data.r;
    };
    Unit.prototype.isEnding = function () {
        if (this.neverEnding)
            return false;
        return _super.prototype.isEnding.call(this);
    };
    Unit.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.worldProdModifiers = Decimal(1);
        this.worldEffModifiers = Decimal(1);
        this.worldBuyModifiers = Decimal(1);
        if (this.prestigeBonusStart) {
            this.quantity = this.prestigeBonusQuantityValue.times(this.prestigeBonusStart.quantity);
            // if (this.quantity.greaterThan(0)) {
            //   this.unlocked = true
            // }
        }
        this.producedBy.forEach(function (p) { return p.unlocked = p.defaultUnlocked; });
    };
    Unit.prototype.isStopped = function () {
        return this.percentage < Number.EPSILON;
    };
    Unit.prototype.checkUp = function () {
        this.showUp =
            (this.upHire && this.upHire.checkBuy()) ||
                (this.upAction && this.upAction.checkBuy()) ||
                (this.upSpecial && this.upSpecial.checkBuy());
    };
    Unit.prototype.reloadtAct = function () {
        this.actions.forEach(function (a) {
            a.realPriceNow = a.getCosts();
        });
    };
    Unit.prototype.reloadAtcMaxBuy = function () {
        this.actions.forEach(function (a) { return a.setMaxBuy(); });
    };
    return Unit;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */]));

//# sourceMappingURL=unit.js.map

/***/ }),

/***/ "../../../../../src/app/model/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Unlocable; });
var Utils = (function () {
    function Utils() {
    }
    Utils.cuberoot = function (x) {
        var y = x.abs().pow(1 / 3);
        return x.greaterThan(0) ? y.times(-1) : y;
    };
    Utils.solveCubic = function (a, b, c, d) {
        //  Thanks to:
        // https://stackoverflow.com/questions/27176423/function-to-solve-cubic-equation-analytically
        // console.log(a.toString() + "x^3 " + b.toString() + "x^2 " + c.toString() + "x " + d.toString())
        if (a.abs().lessThan(Number.EPSILON)) {
            a = b;
            b = c;
            c = d;
            if (a.abs().lessThan(Number.EPSILON)) {
                a = b;
                b = c;
                if (a.abs().lessThan(Number.EPSILON))
                    return [];
                return [b.times(-1).div(a)];
            }
            var D = b.pow(2).minus(a.times(c).times(4));
            // console.log(D.toString())
            if (D.abs().lessThan(Number.EPSILON))
                return [b.times(-1).div(a.times(2))];
            else if (D.greaterThan(0))
                return [(D.sqrt().minus(b)).div(a.times(2)), ((D.sqrt().plus(b)).times(-1)).div(a.times(2))];
            return [];
        }
        // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
        var p = a.times(c).times(3).minus(b.pow(2)).div(3).div(a).div(a);
        var q = ((b.pow(3).times(2)).minus(a.times(b).times(c).times(9)).plus(a.times(a).times(d).times(27)))
            .div(a.pow(3).times(27));
        var roots;
        if (p.abs().lessThan(Number.EPSILON)) {
            roots = [this.cuberoot(q.times(-1))];
        }
        else if (q.abs().lessThan(Number.EPSILON)) {
            roots = [Decimal(0)].concat(p.lessThan(0) ? [(p.times(-1)).sqrt(), (p.times(-1)).sqrt().times(-1)] : []);
        }
        else {
            var D = q.pow(2).div(Decimal(4).plus(p.pow(3).div(27)));
            // console.log("D: " + D.toString())
            if (D.abs().lessThan(Number.EPSILON)) {
                roots = [q.times(-1.5).div(p), Decimal(3).times(q).times(p)];
            }
            else if (D.greaterThan(0)) {
                // var u = cuberoot(-q/2 - Math.sqrt(D));
                // roots = [u - p/(3*u)];
                var u = this.cuberoot(q.times(-1).div(Decimal(2).minus(D.sqrt())));
                roots = [u.minus(p.div(u.times(3)))];
            }
            else {
                var u = Decimal(2).times(Decimal.sqrt(p.times(-1).div(3)));
                // console.log(q.toString() + " " + p.toString() + " " + u.toString())
                // let acos = Decimal(3).times(q).div(p).div(u)
                var acos = q;
                acos = acos.div(p);
                acos = acos.div(u);
                acos = acos.times(3);
                // console.log(acos.toString())
                //  workaround for aprossimation
                if (acos.lessThan(-1))
                    return [];
                //  workaround for aprossimation 2
                acos = Decimal.min(Decimal.max(acos, 1), -1);
                var t = Decimal.acos(acos).div(3);
                // const t = Math.acos(3 * q / p / u) / 3;  // D < 0 implies p < 0 and acos argument in [-1..1]
                var k = Decimal(2).times(Math.PI).div(3);
                roots = [u.times(t.cos()), u.times((t.minus(k)).cos()), u.times(t.minus(k.times(2)).cos())];
                // console.log(roots[0].toString())
                // console.log(roots[1].toString())
                // console.log(roots[2].toString())
            }
        }
        // Convert back from depressed cubic
        for (var i = 0; i < roots.length; i++)
            roots[i] = roots[i].minus(b.div(a.times(3)));
        return roots;
    };
    return Utils;
}());

var Unlocable = (function () {
    function Unlocable(unlocked, avabileThisWorld) {
        if (unlocked === void 0) { unlocked = true; }
        if (avabileThisWorld === void 0) { avabileThisWorld = true; }
        this.unlocked = unlocked;
        this.avabileThisWorld = avabileThisWorld;
    }
    return Unlocable;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "../../../../../src/app/model/world.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return World; });

var World = (function () {
    function World(game, name, description, avaiableUnits, prodMod, toUnlock, unitMod, unitPrice, unlockedUnits, experience, toUnlockMax) {
        if (unitMod === void 0) { unitMod = []; }
        if (unitPrice === void 0) { unitPrice = []; }
        if (unlockedUnits === void 0) { unlockedUnits = []; }
        if (experience === void 0) { experience = Decimal(2.5); }
        if (toUnlockMax === void 0) { toUnlockMax = new Array(); }
        this.game = game;
        this.name = name;
        this.description = description;
        this.avaiableUnits = avaiableUnits;
        this.prodMod = prodMod;
        this.toUnlock = toUnlock;
        this.unitMod = unitMod;
        this.unitPrice = unitPrice;
        this.unlockedUnits = unlockedUnits;
        this.experience = experience;
        this.toUnlockMax = toUnlockMax;
        this.keep = false;
        this.id = "";
        this.level = 1;
    }
    World.getBaseWorld = function (game) {
        var baseWorld = new World(game, "Home", "Nothing special.", [], [], [
            new __WEBPACK_IMPORTED_MODULE_0__cost__["a" /* Cost */](game.baseWorld.food, Decimal(1E12)),
            new __WEBPACK_IMPORTED_MODULE_0__cost__["a" /* Cost */](game.baseWorld.nestAnt, Decimal(40))
        ]);
        baseWorld.experience = Decimal(10);
        return baseWorld;
    };
    World.getRandomWorld = function (game) {
        var worldRet = new World(game, "", "", [], [], []);
        worldRet.experience = Decimal(0);
        var worldType = World.worldTypes[Math.floor(Math.random() * (World.worldTypes.length))];
        var worldPrefix = World.worldPrefix[Math.floor(Math.random() * (World.worldPrefix.length))];
        var worldSuffix = World.worldSuffix[Math.floor(Math.random() * (World.worldSuffix.length))];
        var worlds = [worldType, worldPrefix, worldSuffix, this.getBaseWorld(game)];
        worldRet.name = worldPrefix.name + " " + worldType.name + " " + worldSuffix.name;
        worldRet.description = worldPrefix.description +
            (!!worldType.description ? '\n' + worldType.description : "") +
            (!!worldSuffix.description ? '\n' + worldSuffix.description : "");
        worlds.forEach(function (w) {
            w.prodMod.forEach(function (p) {
                var prod = worldRet.prodMod.find(function (p1) { return p1[0].id === p[0].id; });
                if (prod)
                    prod[1] = prod[1].times(p[1]);
                else
                    worldRet.prodMod.push([p[0], p[1]]);
            });
            w.unitMod.forEach(function (p) {
                var prod = worldRet.unitMod.find(function (p1) { return p1[0].id === p[0].id; });
                if (prod)
                    prod[1] = prod[1].times(p[1]);
                else
                    worldRet.unitMod.push([p[0], p[1]]);
            });
            w.unitPrice.forEach(function (p) {
                var prod = worldRet.unitPrice.find(function (p1) { return p1[0].id === p[0].id; });
                if (prod)
                    prod[1] = prod[1].times(p[1]);
                else
                    worldRet.unitPrice.push([p[0], p[1]]);
            });
            w.toUnlock.forEach(function (p) {
                var toUnlock = worldRet.toUnlock.find(function (c) { return c.unit.id === p.unit.id; });
                if (toUnlock)
                    toUnlock.basePrice = toUnlock.basePrice.plus(p.basePrice);
                else
                    worldRet.toUnlock.push(new __WEBPACK_IMPORTED_MODULE_0__cost__["a" /* Cost */](p.unit, p.basePrice));
            });
            w.toUnlockMax.forEach(function (p) {
                var toUnlockMax = worldRet.toUnlockMax.find(function (c) { return c.unit.id === p.unit.id; });
                if (toUnlockMax)
                    toUnlockMax.basePrice = toUnlockMax.basePrice.plus(p.basePrice);
                else
                    worldRet.toUnlockMax.push(new __WEBPACK_IMPORTED_MODULE_0__cost__["a" /* Cost */](p.unit, p.basePrice));
            });
            w.unlockedUnits.forEach(function (p) {
                var unlockedUnits = worldRet.unlockedUnits.find(function (p1) { return p1[0].id === p[0].id; });
                if (unlockedUnits)
                    unlockedUnits[1] = unlockedUnits[1].plus(p[1]);
                else
                    worldRet.unlockedUnits.push([p[0], p[1]]);
            });
            worldRet.experience = worldRet.experience.plus(w.experience);
            worldRet.avaiableUnits = worldRet.avaiableUnits.concat(w.avaiableUnits);
        });
        //  remove default stat
        worldRet.prodMod = worldRet.prodMod.filter(function (pm) { return pm[1].minus(1).abs().greaterThan(Number.EPSILON); });
        worldRet.unitMod = worldRet.unitMod.filter(function (pm) { return pm[1].minus(1).abs().greaterThan(Number.EPSILON); });
        worldRet.unitPrice = worldRet.unitPrice.filter(function (pm) { return pm[1].minus(1).abs().greaterThan(Number.EPSILON); });
        worldRet.avaiableUnits = Array.from(new Set(worldRet.avaiableUnits));
        worldRet.experience = worldRet.experience.minus(7.5);
        if (!worldRet.unlockedUnits.map(function (p) { return p[0]; }).includes(game.infestation.poisonousPlant)) {
            worldRet.avaiableUnits = worldRet.avaiableUnits
                .filter(function (u) { return !game.infestation.listInfestation.map(function (u2) { return u2; }).includes(u); });
        }
        //    Scale the world level
        var min = game.minUser;
        var max = game.maxUser;
        if (!min)
            min = 0;
        if (!max)
            max = game.maxMax;
        min = Math.min(game.minUser, game.maxMax);
        max = Math.min(game.maxUser, game.maxMax);
        worldRet.level = Decimal.random().times(Decimal(1 + max - min)).floor().plus(min).toNumber();
        // worldRet.level = 1000
        var linear = 1 / 4;
        var linearExp = 1 / 2;
        var toUnlockMultiplier = Decimal(worldRet.level + 1 / linear).times(linear);
        var expMultiplier = Decimal.pow(1.00138, worldRet.level).times(Decimal(worldRet.level + 1 / linearExp).times(linearExp));
        worldRet.toUnlock.forEach(function (t) { return t.basePrice = t.basePrice.times(toUnlockMultiplier).floor(); });
        worldRet.unlockedUnits.forEach(function (t) { return t[1] = Decimal.max(t[1].times(toUnlockMultiplier.times(2)).floor(), 0); });
        worldRet.experience = worldRet.experience.times(expMultiplier).plus(0.5).floor();
        game.unitLists.splice(0, game.unitLists.length);
        // game.isChanged = true
        worldRet.setDepartments();
        return worldRet;
    };
    World.prototype.goTo = function (skip) {
        if (skip === void 0) { skip = false; }
        if (!skip) {
            var earned = this.game.world.experience;
            this.game.prestige.experience.quantity = this.game.prestige.experience.quantity.plus(earned);
            this.game.maxLevel = this.game.maxLevel.plus(earned);
            this.game.prestigeDone = this.game.prestigeDone.plus(1);
        }
        this.game.setInitialStat();
        // const le = this.game.lifeEarning
        // const exp = this.game.prestige.experience.quantity.plus(this.game.getExperience())
        // if (!skip) {
        //   this.game.prestige.experience.quantity = exp
        //   this.game.maxLevel = this.game.maxLevel.plus(exp)
        //   this.game.prestigeDone = this.game.prestigeDone.plus(1)
        // }
        if (this.avaiableUnits)
            this.avaiableUnits.forEach(function (u) { return u.avabileThisWorld = true; });
        if (this.unlockedUnits) {
            this.unlockedUnits.forEach(function (u) {
                u[0].avabileThisWorld = true;
                u[0].quantity = u[1];
            });
            this.game.unlockUnits(this.unlockedUnits.map(function (u) { return u[0]; }))();
        }
        if (this.prodMod)
            this.prodMod.forEach(function (p) { return p[0].worldProdModifiers = p[1]; });
        if (this.unitMod)
            this.unitMod.forEach(function (p) { return p[0].worldEffModifiers = p[1]; });
        if (this.unitPrice)
            this.unitPrice.forEach(function (p) { return p[0].worldBuyModifiers = p[1]; });
        this.game.world = this;
        this.game.all.forEach(function (u) { return u.reloadtAct(); });
        //  research fix
        this.game.resList.forEach(function (r) { return r.quantity = Decimal(0); });
        this.game.worldTabAv = true;
        this.game.homeTabAv = true;
        this.game.expTabAv = true;
        this.game.reloadProduction();
        this.game.unitLists = new Array();
        // this.game.reloadList()
        this.game.generateRandomWorld(true);
        this.game.isChanged = true;
    };
    World.prototype.getData = function () {
        var data = {};
        data.n = this.name;
        if (this.avaiableUnits)
            data.a = this.avaiableUnits.map(function (b) { return b.id; });
        if (this.prodMod)
            data.p = this.prodMod.map(function (p) { return [p[0].id, p[1]]; });
        data.t = this.toUnlock.map(function (c) { return c.getData(); });
        data.m = this.toUnlockMax.map(function (c) { return c.getData(); });
        data.um = this.unitMod.map(function (up) { return [up[0].id, up[1]]; });
        data.up = this.unitPrice.map(function (up) { return [up[0].id, up[1]]; });
        data.uu = this.unlockedUnits.map(function (up) { return [up[0].id, up[1]]; });
        data.e = this.experience;
        data.l = this.level;
        data.keep = this.keep;
        return data;
    };
    World.prototype.restore = function (data, setDep) {
        var _this = this;
        if (setDep === void 0) { setDep = false; }
        this.name = data.n;
        this.avaiableUnits = [];
        if (typeof data.a !== "undefined" && data.a != null && data.a.length > 0)
            this.avaiableUnits = data.a.map(function (a) { return _this.game.allBase.find(function (u) { return u.id === a; }); });
        this.prodMod = [];
        if (typeof data.p !== "undefined" && data.p != null && data.p.length > 0)
            this.prodMod = data.p.map(function (p) { return [_this.game.all.find(function (u) { return u.id === p[0]; }), Decimal(p[1])]; });
        this.toUnlock = [];
        if (typeof data.t !== "undefined" && data.t != null && data.t.length > 0)
            this.toUnlock = data.t.map(function (c) { return _this.game.getCost(c); });
        this.toUnlockMax = [];
        if (typeof data.m !== "undefined" && data.m != null && data.m.length > 0)
            this.toUnlockMax = data.m.map(function (c) { return _this.game.getCost(c); });
        this.unitMod = [];
        if (typeof data.um !== "undefined" && data.um != null && data.um.length > 0)
            this.unitMod = data.um.map(function (p) { return [_this.game.all.find(function (u) { return u.id === p[0]; }), Decimal(p[1])]; });
        this.unitPrice = [];
        if (typeof data.up !== "undefined" && data.up != null && data.up.length > 0)
            this.unitPrice = data.up.map(function (p) { return [_this.game.all.find(function (u) { return u.id === p[0]; }), Decimal(p[1])]; });
        this.unlockedUnits = [];
        if (typeof data.uu !== "undefined" && data.uu != null && data.uu.length > 0)
            this.unlockedUnits = data.uu.map(function (p) { return [_this.game.allBase.find(function (u) { return u.id === p[0]; }), Decimal(p[1])]; });
        this.experience = new Decimal(10);
        if (data.e)
            this.experience = new Decimal(data.e);
        if (data.l)
            this.level = data.l;
        if (data.keep)
            this.keep = true;
        this.setDepartments(setDep);
    };
    World.prototype.setDepartments = function (assign) {
        if (assign === void 0) { assign = false; }
        var _loop_1 = function (i) {
            var engineer = this_1.game.engineers.listEnginer[i];
            var dep = this_1.game.engineers.listDep[i];
            if (!engineer.avabileBaseWorld &&
                !!this_1.avaiableUnits.find(function (u) { return u === engineer; })
                && !this_1.avaiableUnits.find(function (u) { return u === dep; })) {
                this_1.avaiableUnits.push(dep);
                if (assign)
                    dep.avabileThisWorld = true;
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.game.engineers.listEnginer.length; i++) {
            _loop_1(i);
        }
    };
    return World;
}());

World.worldPrefix = new Array();
World.worldTypes = new Array();
World.worldSuffix = new Array();
//# sourceMappingURL=world.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/baseWorld.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseWorld; });






var BaseWorld = (function () {
    function BaseWorld(game) {
        this.game = game;
        this.listMaterial = Array();
        this.level1 = Array();
        this.level2 = Array();
        this.listJobs = Array();
        this.baseFood = Decimal(800);
        this.price2 = Decimal(100);
        //  Prices
        this.specialProduction = Decimal(100);
        this.specialCost = Decimal(-40);
        this.specialFood = Decimal(1E7);
        this.specialRes2 = Decimal(1E4);
        this.prestigeFood = Decimal(1E10);
        this.prestigeOther1 = Decimal(1E6);
        this.prestigeOther2 = Decimal(1E5);
        this.prestigeUnit = Decimal(200);
        this.list = Array();
    }
    BaseWorld.prototype.declareStuff = function () {
        this.declareMaterials();
        this.declareGenerators();
        this.declareJobs();
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("材料", this.listMaterial));
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("工作", this.level1));
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("高级工作", this.level2));
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("蚂蚁", this.list));
    };
    BaseWorld.prototype.initStuff = function () {
        this.initGenerators();
        this.initJobs();
    };
    BaseWorld.prototype.declareMaterials = function () {
        this.food = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "food", "食物", "食物是用来生产几乎所有的单位。");
        this.food.unlocked = true;
        this.listMaterial.push(this.food);
        this.crystal = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "cri", "水晶", "水晶用来生产科学。");
        this.listMaterial.push(this.crystal);
        this.soil = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "soil", "土壤", "土壤用来做巢。");
        this.listMaterial.push(this.soil);
        this.science = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "sci", "科学", "科学是用来改善和解锁的东西。");
        this.listMaterial.push(this.science);
        this.fungus = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "fun", "真菌", "真菌是食物的来源。");
        this.listMaterial.push(this.fungus);
        this.wood = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "wood", "木头", "木材用来制作更好的巢和机械。");
        this.listMaterial.push(this.wood);
        this.sand = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "sand", "沙子", "沙子可以用来制造水晶。");
        this.listMaterial.push(this.sand);
        this.nectar = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "nectar", "花蜜", "花蜜用于制作蜂蜜。");
        this.listMaterial.push(this.nectar);
        this.honey = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "honey", "蜂蜜", "蜂蜜是蜜蜂的主要来源。");
        this.listMaterial.push(this.honey);
        this.ice = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "ice", "Ice", "Ice");
        this.listMaterial.push(this.ice);
        //    Fungus
        this.fungus.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["g" /* UpSpecial */](this.game, this.fungus));
    };
    BaseWorld.prototype.declareGenerators = function () {
        this.littleAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "G1", "蚂蚁", "蚂蚁是最低级的工人。 他们不断收集食物。");
        this.queenAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "G2", "蚁后", "蚁后生产蚂蚁。");
        this.nestAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "G3", "蚁巢", "蚁巢生产蚁后。");
    };
    BaseWorld.prototype.declareJobs = function () {
        this.geologist = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "geo", "地质学家", "地质学家生产水晶。");
        // this.geologist.types = [Type.Ant, Type.Mining]
        this.listJobs.push(this.geologist);
        this.carpenter = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "car", "木匠", "木匠产生土壤。");
        // this.carpenter.types = [Type.Ant, Type.SoilG]
        this.listJobs.push(this.carpenter);
        this.farmer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "far", "农民", "农民生产真菌。");
        // this.farmer.types = [Type.Ant, Type.Farmer]
        this.listJobs.push(this.farmer);
        this.lumberjack = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "lum", "伐木工", "伐木工人生产木材。");
        // this.lumberjack.types = [Type.Ant, Type.WoodG]
        this.listJobs.push(this.lumberjack);
        this.composterAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "com", "堆肥蚂蚁", "将木材变成土壤。");
        this.refineryAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "ref", "精炼蚂蚁", "将土壤变成沙子。");
        this.laserAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "las", "激光蚂蚁", "将沙子变成水晶。");
        this.hydroAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "hydroFarmer", "水培蚂蚁", "将水晶变成真菌。");
        this.planterAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "planterAnt", "播种机蚂蚁", "将真菌变成木头。");
        this.hunter = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "hunter", "猎人", "猎人生产食物。");
        this.advancedHunter = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "advhunter", "高级猎人", "高级猎人生产更多食物。");
        this.level1 = [this.geologist, this.farmer, this.carpenter, this.lumberjack, this.hunter, this.advancedHunter];
    };
    BaseWorld.prototype.initGenerators = function () {
        this.list.push(this.littleAnt, this.queenAnt, this.nestAnt);
        // this.list.forEach(ant => ant.types = [Type.Ant, Type.Generator])
        this.littleAnt.unlocked = true;
        this.littleAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.littleAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, Decimal(15), Decimal(this.game.buyExp))], [this.queenAnt]));
        this.queenAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.queenAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, Decimal(8E2), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(20), Decimal(this.game.buyExpUnit))
        ], [this.nestAnt, this.geologist]));
        this.nestAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.nestAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.prestigeFood, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.soil, this.prestigeOther1, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.wood, this.prestigeOther2, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.queenAnt, this.prestigeUnit, Decimal(this.game.buyExpUnit))
        ]));
        for (var i = 0; i < this.list.length - 1; i++)
            this.list[i].addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.list[i + 1]));
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.list[i], [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.science, Decimal(Decimal(100).times(Decimal.pow(10, Decimal(i)))), this.game.upgradeScienceExp)]));
            this.list[i].actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.list[i], [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.science, Decimal(Decimal(100).times(Decimal.pow(10, Decimal(i)))), this.game.upgradeScienceHireExp)]));
        }
        this.list = this.list.reverse();
    };
    BaseWorld.prototype.initJobs = function () {
        var _this = this;
        //    Prices && Production
        this.food.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.littleAnt, Decimal(1)));
        this.food.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.fungus, Decimal(2)));
        this.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.farmer));
        this.soil.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.farmer, Decimal(-1)));
        this.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.geologist, Decimal(0.2)));
        this.soil.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.carpenter));
        this.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.lumberjack));
        this.food.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.hunter, Decimal(50)));
        this.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.hunter, Decimal(-2)));
        this.food.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.advancedHunter, Decimal(250)));
        this.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.advancedHunter, Decimal(-10)));
        this.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.advancedHunter, Decimal(-5)));
        //    Geologist
        this.geologist.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.geologist, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.baseFood, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), this.game.buyExpUnit)
        ], [this.crystal, this.game.science.student]));
        //    Carpenter
        this.carpenter.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.carpenter, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.baseFood, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
        ], [this.science]));
        //    Lumberjack
        this.lumberjack.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.lumberjack, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.baseFood, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.soil, this.price2, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
        ], [this.wood]));
        //    Farmer
        this.farmer.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.farmer, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.baseFood, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.soil, this.price2, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
        ], [this.fungus]));
        //    Hunter
        this.hunter.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.hunter, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.baseFood.div(1.5), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.wood, this.price2.div(1.5), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
        ]));
        //    Hunter 2
        this.advancedHunter.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.advancedHunter, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.baseFood, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.wood, this.price2, Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.crystal, this.price2.div(1.5), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
        ]));
        this.level1.forEach(function (l) {
            l.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](_this.game, l, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.science, _this.game.scienceCost2, _this.game.upgradeScienceExp)]));
            l.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](_this.game, l, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.science, _this.game.scienceCost2, _this.game.upgradeScienceHireExp)]));
        });
        //
        //    Special
        //
        //  Composter
        // this.composterAnt.types = [Type.Ant]
        this.level2.push(this.composterAnt);
        this.composterAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.composterAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.specialFood, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.wood, this.specialRes2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), this.game.buyExpUnit)
        ]));
        this.soil.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.composterAnt, this.specialProduction));
        this.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.composterAnt, this.specialCost));
        //  Refinery
        // this.refineryAnt.types = [Type.Ant]
        this.level2.push(this.refineryAnt);
        this.refineryAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.refineryAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.specialFood, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.soil, this.specialRes2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), this.game.buyExpUnit)
        ]));
        this.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.refineryAnt, this.specialProduction));
        this.soil.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.refineryAnt, this.specialCost));
        //  Laser
        //   this.laserAnt.types = [Type.Ant]
        this.level2.push(this.laserAnt);
        this.laserAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.laserAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.specialFood, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.sand, this.specialRes2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), this.game.buyExpUnit)
        ]));
        this.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.laserAnt, this.specialProduction));
        this.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.laserAnt, this.specialCost));
        //  Hydro
        //  this.hydroAnt.types = [Type.Ant]
        this.level2.push(this.hydroAnt);
        this.hydroAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.hydroAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.specialFood, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.crystal, this.specialRes2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), this.game.buyExpUnit)
        ]));
        this.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.hydroAnt, this.specialProduction));
        this.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.hydroAnt, this.specialCost));
        //  Planter
        //    this.planterAnt.types = [Type.Ant]
        this.level2.push(this.planterAnt);
        this.planterAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.planterAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.food, this.specialFood, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.fungus, this.specialRes2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.littleAnt, Decimal(1), this.game.buyExpUnit)
        ]));
        this.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.planterAnt, this.specialProduction));
        this.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.planterAnt, this.specialCost));
        this.level2.forEach(function (l) {
            l.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](_this.game, l, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.science, _this.game.scienceCost3, _this.game.upgradeScienceExp)]));
            l.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](_this.game, l, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.science, _this.game.scienceCost3, _this.game.upgradeScienceHireExp)]));
        });
    };
    BaseWorld.prototype.addWorld = function () {
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldTypes.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Park", "", [], [], []), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Mine", "A mine", [this.game.machines.mine, this.game.engineers.mineEnginer], [
            [this.game.baseWorld.crystal, Decimal(1.2)],
            [this.game.baseWorld.wood, Decimal(0.8)],
            [this.game.baseWorld.fungus, Decimal(0.8)]
        ], []));
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldPrefix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "", "", [], [], []), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Hot", "", [], [[this.game.baseWorld.food, Decimal(2)]], [], [], [], [], Decimal(2)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Arid", "", [], [[this.game.baseWorld.fungus, Decimal(0.5)]], [], [], [], [], Decimal(3)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Wooded", "", [this.game.engineers.woodEnginer, this.game.machines.loggingMachine], [[this.game.baseWorld.wood, Decimal(2)]], [], [], [], [], Decimal(1.5)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Crystallized", "", [this.game.machines.mine, this.game.engineers.mineEnginer], [
            [this.game.baseWorld.crystal, Decimal(1.5)],
            [this.game.baseWorld.food, Decimal(0.4)],
            [this.game.baseWorld.fungus, Decimal(0.4)]
        ], []), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Dying", "", [], [
            [this.food, Decimal(0.5)],
            [this.fungus, Decimal(0.5)],
            [this.wood, Decimal(0.5)],
            [this.honey, Decimal(0.5)],
            [this.nectar, Decimal(0.5)]
        ], [], [], [], [], Decimal(4.5)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Rainy", "", [], [
            [this.wood, Decimal(1.5)],
            [this.fungus, Decimal(1.5)]
        ], [], [], [], [], Decimal(1.5)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Foggy", "", [], [
            [this.wood, Decimal(0.7)],
            [this.fungus, Decimal(0.7)]
        ], [], [], [], [], Decimal(3)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Technological", "", [], [
            [this.science, Decimal(1.5)]
        ], [], [], [], [], Decimal(1.5)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Starving", "", [], [
            [this.food, Decimal(0.3)]
        ], [], [], [], [], Decimal(3.5)));
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldSuffix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "", "", [], [], []), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "of Fungus", "", [], [[this.game.baseWorld.fungus, Decimal(2)]], [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.fungus, Decimal(1E7))], [], [], [], Decimal(3.5)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "of Ant", "", [], [], [], [[this.littleAnt, Decimal(2)]], [], [], Decimal(2)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "of Scientist", "", [], [], [], [[this.game.science.scientist, Decimal(2)]], [], [], Decimal(2)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "of Farming", "", [], [], [], [[this.farmer, Decimal(2)]], [], [], Decimal(2)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "of Crystall", "", [this.game.machines.mine, this.game.engineers.mineEnginer], [[this.crystal, Decimal(2)]], [], [], [], [], Decimal(2)));
    };
    return BaseWorld;
}());

//# sourceMappingURL=baseWorld.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/beach.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Beach; });






var Beach = (function () {
    function Beach(game) {
        this.game = game;
    }
    Beach.prototype.declareStuff = function () {
        var beachList = new Array();
        this.crab = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "crab", "Crab", "Crab yield sand.");
        this.crabFarmer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "crabF", "Farmer Crab", "Farmer Crab yield fungus.");
        this.crabQueen = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "CrabQ", "Crab Queen", "Crab Queen yield crab.");
        this.crabNest = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "CrabN", "Crab Nest", "Crab Nest yield crab queens.");
        this.shrimp = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "shrimp", "Shrimp", "Shrimp yield sand and crystal.");
        this.lobster = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "lobster", "Lobster", "Lobster yield sand, and crystal for food.");
        this.crabScientist = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "crabScientist", "Scientist Crab", "Scientist Crab will get science for sand.");
        beachList.push(this.crabNest);
        beachList.push(this.crabQueen);
        beachList.push(this.crab);
        beachList.push(this.crabFarmer);
        beachList.push(this.crabScientist);
        beachList.push(this.shrimp);
        beachList.push(this.lobster);
        //    lobster
        this.lobsterRes = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("lobsterRes", "Lobsters", "Unlock lobsters.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E5))], [this.lobster], this.game);
        //    shrimp
        this.shrimpRes = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("shrimpRes", "Shrimps", "Unlock shrimps.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(2E3))], [this.shrimp], this.game);
        //    Crab Jobs
        this.crabJobRes = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("crabJobRes", "Crab Jobs", "Unlock more jobs for your crab.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1.5E3))], [this.crabFarmer, this.crabScientist], this.game);
        //    Research
        this.seaRes = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("seaRes", "Sea Helpers", "Unlock Sea Helpers.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(30))], [this.crab, this.crabQueen, this.crabJobRes, this.shrimpRes, this.lobsterRes], this.game);
        this.seaRes.avabileBaseWorld = false;
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Beach", beachList));
    };
    Beach.prototype.initStuff = function () {
        //    Crab
        this.crab.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.crab, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E3), this.game.buyExp)]));
        this.crab.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.crab, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.crab.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.crab, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.crab));
        //    Crab Farmer
        this.crabFarmer.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.crabFarmer, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.sand, Decimal(100), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.crab, Decimal(1), this.game.buyExpUnit)
        ]));
        this.crabFarmer.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.crabFarmer, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.crabFarmer.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.crabFarmer, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]));
        this.game.baseWorld.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.crabFarmer));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.crabFarmer, Decimal(-1)));
        var specialProduction = Decimal(15);
        var specialCost = Decimal(-4);
        var specialFood = Decimal(1E7);
        var specialRes2 = Decimal(1E4);
        //    Crab Scientist
        this.crabScientist.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.crabScientist, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, specialFood.div(5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.sand, specialRes2.div(5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.crab, Decimal(1), this.game.buyExpUnit)
        ]));
        this.crabScientist.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.crabScientist, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3.times(1.5), this.game.upgradeScienceExp)]));
        this.crabScientist.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.crabScientist, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3.times(1.5), this.game.upgradeScienceHireExp)]));
        this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.crabScientist, specialProduction.times(0.75)));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.crabScientist, specialCost));
        //    Crab Queen ?!
        //    Not sure if really exists
        this.crabQueen.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.crabQueen, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.crab, Decimal(50), this.game.buyExpUnit)
        ], [this.crabNest]));
        this.crabQueen.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.crabQueen, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        this.crabQueen.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.crabQueen, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceHireExp)]));
        this.crab.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.crabQueen));
        //    Crab Nest
        this.crabNest.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.crabNest, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, this.game.baseWorld.prestigeFood.div(1.5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.sand, this.game.baseWorld.prestigeOther1.times(2), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.crabQueen, Decimal(250), this.game.buyExpUnit)
        ]));
        this.crabNest.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.crabNest, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]));
        this.crabNest.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.crabNest, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceHireExp)]));
        this.crabQueen.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.crabNest));
        //    Shrimp
        this.shrimp.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.shrimp, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(3E3), this.game.buyExp)]));
        this.shrimp.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.shrimp, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.shrimp.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.shrimp, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.shrimp));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.shrimp, Decimal(0.5)));
        //    lobster
        var lobsterScience = this.game.scienceCost3.times(1.5);
        this.lobster.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.lobster, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, this.game.machines.price1.times(5000), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.sand, this.game.machines.price1.times(1.5), this.game.buyExp)
        ]));
        this.lobster.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.lobster, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, lobsterScience, this.game.upgradeScienceExp)]));
        this.lobster.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.lobster, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, lobsterScience, this.game.upgradeScienceHireExp)]));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.lobster, this.game.machines.machineryProd.div(5)));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.lobster, this.game.machines.machineryProd.div(10)));
    };
    Beach.prototype.addWorld = function () {
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldTypes.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Beach", "A beach", [this.game.machines.sandDigger, this.game.engineers.sandEnginer], [], [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.beach.crabNest, Decimal(50))], [], [], [[this.game.beach.seaRes, Decimal(0)]], Decimal(3)));
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldPrefix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Coastal", "", [this.game.machines.sandDigger, this.game.engineers.sandEnginer], [[this.game.baseWorld.sand, Decimal(1.5)], [this.game.baseWorld.fungus, Decimal(0.7)]], [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.beach.crabNest, Decimal(50))], [[this.game.baseWorld.fungus, Decimal(0.7)]], [], [[this.game.beach.seaRes, Decimal(0)]], Decimal(3.5)));
    };
    return Beach;
}());

//# sourceMappingURL=beach.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/bee.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__units_togableProductions__ = __webpack_require__("../../../../../src/app/model/units/togableProductions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bee; });







var Bee = (function () {
    function Bee(game) {
        this.game = game;
        this.listBee = new Array();
    }
    Bee.prototype.declareStuff = function () {
        this.foragingBee = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "forBee", "Foraging Bee", "Foraging Bee yields nectar.");
        this.queenBee = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "qBee", "Queen Bee", "Yields Foraging Bee.");
        this.hiveBee = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "hBee", "Hive Bee", "Hives yields queens and instructs foraging bees to become workers.");
        this.workerBee = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "worBee", "Worker Bee", "Worker Bee converts nectar to honey.");
        this.scientistBee = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "scBee", "Scientist Bee", "Scientist bee study honey properties.");
        this.foodBee = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "foodBee", "Food Bee", "Converts honey to food.");
        this.universityBee = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "universityBee", "University of Bee", "Instruct new Scientist Bee");
        this.listBee.push(this.hiveBee);
        this.listBee.push(this.queenBee);
        this.listBee.push(this.foragingBee);
        this.listBee.push(this.workerBee);
        this.listBee.push(this.universityBee);
        this.listBee.push(this.scientistBee);
        this.listBee.push(this.foodBee);
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_5__typeList__["a" /* TypeList */]("Bee", this.listBee));
        this.engineersProd = new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.universityBee, Decimal(0.1), false);
    };
    Bee.prototype.initStuff = function () {
        var beeTeamUp = this.game.upgradeScienceExp.times(0.8);
        var beeHireUp = this.game.upgradeScienceHireExp.times(0.8);
        //    Foragging
        // this.foragingBee.types = [Type.Bee]
        this.foragingBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.foragingBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(100), this.game.buyExp)]));
        this.game.baseWorld.nectar.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.foragingBee));
        this.foragingBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.foragingBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost1, beeTeamUp)]));
        this.foragingBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.foragingBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost1, beeHireUp)]));
        // this.queenBee.types = [Type.Bee]
        // this.hiveBee.types = [Type.Bee]
        //    Worker
        // this.workerBee.types = [Type.Bee]
        this.workerBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["f" /* BuyAndUnlockAction */](this.game, this.workerBee, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.nectar, Decimal(100), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1000), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.foragingBee, Decimal(1), this.game.buyExpUnit)
        ], [this.queenBee]));
        this.game.baseWorld.nectar.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.workerBee, Decimal(-2)));
        this.game.baseWorld.honey.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.workerBee, Decimal(1.5)));
        this.workerBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.workerBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, beeTeamUp)]));
        this.workerBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.workerBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, beeHireUp)]));
        //  Queen
        this.queenBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["f" /* BuyAndUnlockAction */](this.game, this.queenBee, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.foragingBee, Decimal(50), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.honey, Decimal(1E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E6), this.game.buyExp),
        ], [this.hiveBee]));
        this.foragingBee.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.queenBee));
        //  Hive
        this.hiveBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.hiveBee, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.queenBee, Decimal(100), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.honey, this.game.baseWorld.prestigeOther1.times(1.5), this.game.buyExp.times(1.1)),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.food, this.game.baseWorld.prestigeFood.times(0.8), this.game.buyExp),
        ]));
        this.queenBee.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.hiveBee));
        this.foragingBee.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.hiveBee, Decimal(-5)));
        this.workerBee.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.hiveBee, Decimal(5)));
        this.queenBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.queenBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, beeTeamUp)]));
        this.queenBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.queenBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, Decimal(10))]));
        this.hiveBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.hiveBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, beeTeamUp)]));
        this.hiveBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.hiveBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, beeHireUp)]));
        //    Scientist
        // this.scientistBee.types = [Type.Bee]
        this.scientistBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.scientistBee, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.foragingBee, Decimal(1), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.honey, Decimal(6E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.crystal, Decimal(4E3), this.game.buyExp),
        ]));
        this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.scientistBee, Decimal(15)));
        this.game.baseWorld.honey.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.scientistBee, Decimal(-2)));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.scientistBee, Decimal(-1)));
        this.scientistBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.scientistBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, beeTeamUp)]));
        this.scientistBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.scientistBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, beeHireUp)]));
        //    Food
        // this.foodBee.types = [Type.Bee]
        this.foodBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.foodBee, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.foragingBee, Decimal(1), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.honey, Decimal(1E3), this.game.buyExp)
        ]));
        this.game.baseWorld.food.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.foodBee, Decimal(15)));
        this.game.baseWorld.honey.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.foodBee, Decimal(-5)));
        this.foodBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.foodBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E3), Decimal(10))]));
        this.foodBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.foodBee, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E3), Decimal(10))]));
        //    University
        this.universityBee.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.universityBee, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.foragingBee, Decimal(1E3), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.wood, this.game.machines.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.game.machines.price2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.honey, this.game.machines.price2, this.game.buyExp)
        ]));
        this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.universityBee, Decimal(600)));
        this.scientistBee.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.universityBee, Decimal(0.01)));
        this.game.engineers.beeEnginer.addProductor(this.engineersProd);
        this.universityBee.togableProductions = [new __WEBPACK_IMPORTED_MODULE_0__units_togableProductions__["a" /* TogableProduction */]("Generate engineers", [this.engineersProd])];
        //  Research
        this.universityResBee2 = new __WEBPACK_IMPORTED_MODULE_3__units_action__["a" /* Research */]("uniResBee2", "Department of Bee Engineering", "Bee university also yield bee engineers.", [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(7E7))], [this.engineersProd], this.game);
        //  Research
        this.universityResBee = new __WEBPACK_IMPORTED_MODULE_3__units_action__["a" /* Research */]("universityResBee", "University of Bee", "Get an university of bee.", [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(6E6))], [this.universityBee, this.universityResBee2], this.game);
        //  Research
        this.advancedBee = new __WEBPACK_IMPORTED_MODULE_3__units_action__["a" /* Research */]("advBee", "Advanced Bee", "More jobs for bees.", [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E3))], [this.scientistBee, this.foodBee, this.universityResBee], this.game);
        //    Bee
        this.beeResearch = new __WEBPACK_IMPORTED_MODULE_3__units_action__["a" /* Research */]("beeRes", "Bee", "Unlock Bee !", [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(0))], [this.game.baseWorld.nectar, this.foragingBee, this.workerBee, this.game.baseWorld.honey, this.advancedBee], this.game);
        this.beeResearch.avabileBaseWorld = false;
    };
    Bee.prototype.addWorld = function () {
        __WEBPACK_IMPORTED_MODULE_6__world__["a" /* World */].worldPrefix.push(new __WEBPACK_IMPORTED_MODULE_6__world__["a" /* World */](this.game, "Apian", "", [this.game.machines.honeyMaker, this.game.engineers.beeEnginer], [], [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.hiveBee, Decimal(20)),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.honey, this.game.baseWorld.prestigeFood)
        ], [], [], [[this.beeResearch, Decimal(0)]], Decimal(3)));
        __WEBPACK_IMPORTED_MODULE_6__world__["a" /* World */].worldSuffix.push(new __WEBPACK_IMPORTED_MODULE_6__world__["a" /* World */](this.game, "of Bee", "", [this.game.machines.honeyMaker, this.game.engineers.beeEnginer], [], [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.hiveBee, Decimal(25)),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.honey, this.game.baseWorld.prestigeFood)
        ], [[this.foragingBee, Decimal(2)]], [], [[this.beeResearch, Decimal(0)]], Decimal(3)));
    };
    return Bee;
}());

//# sourceMappingURL=bee.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/engineer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Engineers; });





var Engineers = (function () {
    function Engineers(game) {
        this.game = game;
        this.listEnginer = new Array();
        this.listDep = new Array();
    }
    Engineers.prototype.declareStuff = function () {
        this.listEnginer = new Array();
        this.composterEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engCo", "Composter E.", "Slowly build composter stations.");
        this.laserEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engLa", "Laser E.", "Slowly build laser stations.");
        this.hydroEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engHy", "Hydro E.", "Slowly build hydroponic farms.");
        this.plantingEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engSo", "Planting E.", "Slowly build planting machines.");
        this.refineryEnginery = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engRef", "Refine E.", "Slowly build refinery stations.");
        this.mineEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engMi", "Mining E.", "Slowly build mines.");
        this.sandEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, 'engSa', "Sand E.", 'Slowly build sand diggers.');
        this.woodEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engWo", "Wood E.", "Slowly build logging machines.");
        this.beeEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engBee", "Bee E.", "Slowly build honey makers.");
        this.iceEngineer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engIce", "Ice E.", "Slowly build water tanks.");
        this.iceCompEngineer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "engIceComp", "Compacting E.", "Slowly build ice compacters.");
        this.lensEnginer = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "lensEnginer", "Burning Lens E.", "Slowly build burning lens.");
        this.sandEnginer.avabileBaseWorld = false;
        this.mineEnginer.avabileBaseWorld = false;
        this.woodEnginer.avabileBaseWorld = false;
        this.beeEnginer.avabileBaseWorld = false;
        this.iceEngineer.avabileBaseWorld = false;
        this.iceCompEngineer.avabileBaseWorld = false;
        this.lensEnginer.avabileBaseWorld = false;
        this.listEnginer.push(this.composterEnginer);
        this.listEnginer.push(this.refineryEnginery);
        this.listEnginer.push(this.laserEnginer);
        this.listEnginer.push(this.hydroEnginer);
        this.listEnginer.push(this.plantingEnginer);
        this.listEnginer.push(this.sandEnginer);
        this.listEnginer.push(this.woodEnginer);
        this.listEnginer.push(this.mineEnginer);
        this.listEnginer.push(this.beeEnginer);
        this.listEnginer.push(this.iceCompEngineer);
        this.listEnginer.push(this.iceEngineer);
        this.listEnginer.push(this.lensEnginer);
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Engineers", this.listEnginer));
        this.composterDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaCo", "Composting Department", "Yeild engineers.");
        this.laserDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaLa", "Laser Department", "Yeild engineers.");
        this.hydroDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaHy", "Hydro Department", "Yeild engineers.");
        this.plantingDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaSo", "Planting Department", "Yeild engineers.");
        this.refineryDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaRef", "Refine Department", "Yeild engineers.");
        this.mineDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaMi", "Mining Department", "Yeild engineers.");
        this.sandDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, 'depaSa', "Sand Department", 'Yeild engineers.');
        this.woodDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaWo", "Wood Department", "Yeild engineers.");
        this.beeDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaBee", "Bee Department", "Yeild engineers.");
        this.iceDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaIce", "Ice Department", "Yeild engineers.");
        this.iceCompDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaIceComp", "Compacting Department", "Yeild engineers.");
        this.lensDep = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "depaEnginer", "Burning Lens Department", "Yeild engineers.");
        this.sandDep.avabileBaseWorld = false;
        this.mineDep.avabileBaseWorld = false;
        this.woodDep.avabileBaseWorld = false;
        this.beeDep.avabileBaseWorld = false;
        this.iceDep.avabileBaseWorld = false;
        this.iceCompDep.avabileBaseWorld = false;
        this.lensDep.avabileBaseWorld = false;
        this.listDep.push(this.composterDep);
        this.listDep.push(this.refineryDep);
        this.listDep.push(this.laserDep);
        this.listDep.push(this.hydroDep);
        this.listDep.push(this.plantingDep);
        this.listDep.push(this.sandDep);
        this.listDep.push(this.woodDep);
        this.listDep.push(this.mineDep);
        this.listDep.push(this.beeDep);
        this.listDep.push(this.iceCompDep);
        this.listDep.push(this.iceDep);
        this.listDep.push(this.lensDep);
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Departments", this.listDep));
    };
    Engineers.prototype.initStuff = function () {
        var _this = this;
        this.listEnginer.forEach(function (e) {
            e.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](_this.game, e, [
                new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.game.baseWorld.littleAnt, Decimal(1E4), _this.game.buyExpUnit),
                new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.game.baseWorld.science, _this.game.scienceCost3, _this.game.buyExp)
            ]));
            e.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](_this.game, e, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.game.baseWorld.science, _this.game.scienceCost4, _this.game.upgradeScienceExp)]));
            e.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](_this.game, e, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.game.baseWorld.science, _this.game.scienceCost4, _this.game.upgradeScienceHireExp)]));
        });
        var _loop_1 = function (i) {
            var engineer = this_1.listEnginer[i];
            var machine = this_1.game.machines.listMachinery[i];
            machine.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](engineer, Decimal(0.01)));
            this_1.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](engineer, Decimal(-200)));
            machine.buyAction.priceF.forEach(function (price) {
                price.unit.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](engineer, price.basePrice.div(-50)));
                engineer.buyAction.priceF.push(new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](price.unit, price.basePrice.times(5), _this.game.buyExpUnit));
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.listEnginer.length; i++) {
            _loop_1(i);
        }
        //  Bee engineer should actually be a Bee
        this.beeEnginer.buyAction.priceF = [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.bee.foragingBee, Decimal(1E4), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.buyExp)
        ];
        this.beeEnginer.upAction.priceF[0].basePrice = this.beeEnginer.upAction.priceF[0].basePrice.times(0.8);
        this.beeEnginer.upHire.priceF[0].basePrice = this.beeEnginer.upHire.priceF[0].basePrice.times(0.8);
        //  departments
        for (var i = 0; i < this.listEnginer.length; i++) {
            var engineer = this.listEnginer[i];
            var machine = this.game.machines.listMachinery[i];
            var dep = this.listDep[i];
            engineer.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](dep, Decimal(1)));
            this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](dep, Decimal(-2000)));
            dep.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, dep, [
                new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.science.university, Decimal(1), this.game.buyExpUnit),
                new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](engineer, Decimal(100), this.game.buyExp),
                new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](machine, Decimal(1E4), this.game.buyExp)
            ]));
        }
    };
    Engineers.prototype.addWorld = function () {
    };
    return Engineers;
}());

//# sourceMappingURL=engineer.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/forest.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Forest; });






var Forest = (function () {
    function Forest(game) {
        this.game = game;
        this.listForest = new Array();
    }
    Forest.prototype.declareStuff = function () {
        this.listForest = new Array();
        this.larva = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "larva", "Larva", "Larva is the juvenile form of many insect.");
        this.beetle = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "beetle", "Beetle", "Yield various resources.");
        this.ambrosiaBeetle = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "ambrosiaBeetle", "Ambrosia beetle", "Ambrosia beetle yield wood.");
        this.beetleNest = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "beetleNest", "Beetle Nest", "Beetle Nest yield larvae.");
        this.ladybird = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "ladybird", "Ladybird", "Ladybird yield science.");
        this.beetleColony = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "beetleColony", "Beetle Colony", "Beetle Colony yield nest.");
        this.powderpostBeetle = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "powder", "Powderpost Beetle", "Powderpost beetles are a group of woodboring beetles.");
        this.listForest.push(this.beetleColony);
        this.listForest.push(this.beetleNest);
        this.listForest.push(this.beetle);
        this.listForest.push(this.larva);
        this.listForest.push(this.powderpostBeetle);
        this.listForest.push(this.ambrosiaBeetle);
        this.listForest.push(this.ladybird);
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Beetle", this.listForest));
        this.beetleWoodProduction = new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.beetle, Decimal(0.8), false);
        this.beetleSoilProduction = new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.beetle, Decimal(0.4), false);
        this.beetleCrystalProduction = new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.beetle, Decimal(0.2), false);
        var beetleWood = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("beetleWood", "Woodcutting training", "Beetle also produces wood", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(100))], [this.beetleWoodProduction], this.game);
        var beetleSoil = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("beetleSoil", "Soil training", "Beetle also produces soil", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E3))], [this.beetleSoilProduction], this.game);
        var beetleCrystal = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("beetleCrystal", "Mining training", "Beetle also produces crystal", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E4))], [this.beetleCrystalProduction], this.game);
        var advancedBeetle = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("advBeetle", "Advanced Beetle Jobs", "More beetle jobs", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(3E3))], [this.ambrosiaBeetle, this.ladybird], this.game);
        this.beetleResearch = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("beetleRes", "Beetle", "Unlock Beetle", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(600))], [this.larva, advancedBeetle, beetleWood, beetleSoil, beetleCrystal], this.game);
        this.beetleResearch.avabileBaseWorld = false;
    };
    Forest.prototype.initStuff = function () {
        this.game.baseWorld.food.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.larva, Decimal(0.1)));
        this.game.baseWorld.food.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.beetle));
        this.game.baseWorld.crystal.addProductor(this.beetleCrystalProduction);
        this.game.baseWorld.soil.addProductor(this.beetleSoilProduction);
        this.game.baseWorld.wood.addProductor(this.beetleWoodProduction);
        this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.ladybird, Decimal(5)));
        this.game.baseWorld.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.ambrosiaBeetle, Decimal(-6)));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.ambrosiaBeetle, Decimal(15)));
        this.beetle.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.beetleNest, Decimal(0.01)));
        this.larva.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.beetleNest));
        this.beetleNest.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.beetleColony));
        this.game.baseWorld.food.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.powderpostBeetle));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.powderpostBeetle));
        //    Larva
        this.larva.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.larva, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(10), this.game.buyExp)], [this.beetle, this.powderpostBeetle]));
        this.larva.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.larva, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost1, this.game.upgradeScienceExp)]));
        this.larva.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.larva, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost1, this.game.upgradeScienceExp)]));
        //    Beetle
        this.beetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.beetle, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.larva, Decimal(1), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(2000), this.game.buyExp)
        ], [this.beetleNest]));
        this.beetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.beetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.beetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.beetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        //    Beetle Nest
        this.beetleNest.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["f" /* BuyAndUnlockAction */](this.game, this.beetleNest, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.beetle, Decimal(100), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(1E4), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, Decimal(1E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E3), this.game.buyExp)
        ], [this.beetleColony]));
        this.beetleNest.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.beetleNest, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        this.beetleNest.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.beetleNest, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        //    Beetle Colony
        this.beetleColony.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.beetleColony, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.beetleNest, Decimal(200), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E10), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(1E6), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, Decimal(1E5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.fungus, Decimal(5E4), this.game.buyExp),
        ]));
        this.beetleColony.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.beetleColony, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]));
        this.beetleColony.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.beetleColony, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]));
        //    Lady Beetle
        this.ladybird.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.ladybird, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.larva, Decimal(1), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, Decimal(1E4), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E6), this.game.buyExp)
        ]));
        this.ladybird.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.ladybird, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        this.ladybird.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.ladybird, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        //    Ambrosia Beetle
        this.ambrosiaBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.ambrosiaBeetle, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.larva, Decimal(1), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.fungus, Decimal(1E4), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(1E4), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E7), this.game.buyExp)
        ]));
        this.ambrosiaBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.ambrosiaBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.ambrosiaBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.ambrosiaBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        //    Powderpost
        this.powderpostBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.powderpostBeetle, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.larva, Decimal(1), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(1000), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(5000), this.game.buyExp)
        ]));
        this.powderpostBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.powderpostBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.powderpostBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.powderpostBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
    };
    Forest.prototype.addWorld = function () {
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldTypes.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Forest", "A forest", [
            this.game.engineers.woodEnginer, this.game.machines.loggingMachine,
            this.game.infestation.disinfestationBeetle, this.game.infestation.flametrowerBeetle
        ], [[this.game.baseWorld.wood, Decimal(2)]], [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.beetleColony, Decimal(50))], [], [], [[this.beetleResearch, Decimal(0)]], Decimal(3.5)));
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldSuffix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Of Beetle", "", [
            this.game.infestation.disinfestationBeetle, this.game.infestation.flametrowerBeetle
        ], [
            [this.larva, Decimal(2)]
        ], [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.beetleColony, Decimal(50))], [], [], [[this.beetleResearch, Decimal(0)]], Decimal(4)));
    };
    return Forest;
}());

//# sourceMappingURL=forest.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/frozen.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Frozen; });



// import { Type } from '../units/base';



var Frozen = (function () {
    function Frozen(game) {
        this.game = game;
        this.listFreezig = new Array();
    }
    Frozen.prototype.declareStuff = function () {
        this.listFreezig = new Array();
        this.iceAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "iceA", "Ice Provisioner", "Collect Ice.");
        this.iceDrillAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "iceDrill", "Ice Drilling", "Equip an ant with an ice drill to destroy ice.");
        this.iceMelter = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "iceMelter", "Ice Melter", "Equip an ant with a flamethrower to destroy ice.");
        this.listFreezig.push(this.iceAnt);
        this.listFreezig.push(this.iceDrillAnt);
        this.listFreezig.push(this.iceMelter);
        var iceResearch2 = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("iceRes2", "Flametrower", "Use fire to melt ice.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(800))], [this.iceMelter], this.game);
        this.iceResearch = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("iceRes", "Ice", "Ice", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(30))], [this.iceAnt, this.iceDrillAnt, iceResearch2], this.game);
        this.iceResearch.avabileBaseWorld = false;
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Freezing", this.listFreezig));
    };
    Frozen.prototype.initStuff = function () {
        //  Ice Provisioner
        this.game.baseWorld.ice.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.iceAnt));
        this.iceAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.iceAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1000), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
        ]));
        this.iceAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.iceAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.iceAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.iceAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        //  Ice Driller
        this.game.baseWorld.ice.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.iceDrillAnt, Decimal(-10)));
        this.iceDrillAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.iceDrillAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1000), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
        ]));
        this.iceDrillAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.iceDrillAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.iceDrillAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.iceDrillAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        // Ice Melter
        this.game.baseWorld.ice.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.iceMelter, Decimal(-100)));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.iceMelter, Decimal(-5)));
        this.iceMelter.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.iceMelter, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1E7), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(1E4), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
        ]));
        this.iceMelter.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.iceMelter, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        this.iceMelter.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.iceMelter, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
    };
    Frozen.prototype.addWorld = function () {
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldPrefix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Cold", "", [], [
            [this.game.baseWorld.food, Decimal(0.6)],
            [this.game.baseWorld.ice, Decimal(0.5)]
        ], [], [], [], [[this.iceResearch, Decimal(0)]], Decimal(3)), new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Freezing", "", [
            this.game.machines.iceCollector,
            this.game.machines.iceCompacter,
            this.game.engineers.iceCompEngineer,
            this.game.engineers.iceCompEngineer,
            this.game.machines.burningGlass,
            this.game.engineers.lensEnginer
        ], [
            [this.game.baseWorld.food, Decimal(0.3)]
        ], [], [], [], [[this.game.baseWorld.ice, Decimal(1E11)],
            [this.iceResearch, Decimal(0)]], Decimal(4.5), [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.ice, Decimal(100))]));
    };
    return Frozen;
}());

//# sourceMappingURL=frozen.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/inferstation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Infestation; });






var Infestation = (function () {
    function Infestation(game) {
        this.game = game;
        this.listInfestation = new Array();
    }
    Infestation.prototype.declareStuff = function () {
        this.listInfestation = new Array();
        this.poisonousPlant = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "poisPlant", "Poisonous Plant", "This plant may kill them all.");
        this.poisonousPlant2 = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "poisPlant2", "Old Poisonous Plant", "Process poisonus plants!.");
        this.disinfestationAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "defAnt", "Disinfestation Ant", "Destroy poisonus plants.");
        this.flametrowerAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "flameAnt", "Flamethrower Ant", "Burn poisonus plants.");
        this.weedkiller = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "weedkiller", "Weedkiller", "Destroy poisonus plants efficently.");
        this.chemistAnt = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "chemistAnt", "Chemist Ant", "Proces weedkiller.");
        this.disinfestationBeetle = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "disinfestationBeetle", "Disinfestation Beetle", "Beetle are also good at killing plants.");
        this.flametrowerBeetle = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "flametrowerBeetle", "Flamethrower Beetle", "A beetle with a flametrower.");
        this.chemistBee = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "chemistBee", "Chemist Bee", "A chemist bee.");
        this.poisonousPlant2.alwaysOn = true;
        this.listInfestation.push(this.poisonousPlant2);
        this.listInfestation.push(this.poisonousPlant);
        this.listInfestation.push(this.weedkiller);
        this.listInfestation.push(this.chemistAnt);
        this.listInfestation.push(this.disinfestationAnt);
        this.listInfestation.push(this.flametrowerAnt);
        this.listInfestation.push(this.disinfestationBeetle);
        this.listInfestation.push(this.flametrowerBeetle);
        this.listInfestation.push(this.chemistBee);
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Infestation", this.listInfestation));
        //    Weedkiller
        this.weedkillerRes = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("weedkillerRes", "Weedkiller", "Weedkiller will slowly kill poisonus plants.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E4))], [this.weedkiller, this.chemistAnt], this.game);
        //    Flame
        this.flametrowerRes = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("flametrowerRes", "Flamethrower", "Burn poisonus plants.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E3))], [this.flametrowerAnt, this.flametrowerBeetle], this.game);
        //    Disinfestation
        this.basicDisinfestationRes = new __WEBPACK_IMPORTED_MODULE_2__units_action__["a" /* Research */]("basicDisinfestationRes", "Disinfestation", "Unlock basic disinfestation units.", [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(100))], [
            this.disinfestationAnt, this.disinfestationBeetle,
            this.flametrowerRes, this.weedkillerRes
        ], this.game);
        this.basicDisinfestationRes.avabileBaseWorld = false;
    };
    Infestation.prototype.initStuff = function () {
        this.poisonousPlant.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.poisonousPlant2));
        this.poisonousPlant.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.disinfestationAnt, Decimal(-10)));
        this.poisonousPlant.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.disinfestationBeetle, Decimal(-12)));
        this.poisonousPlant.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.flametrowerBeetle, Decimal(-100)));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.flametrowerBeetle, Decimal(-5)));
        this.poisonousPlant.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.flametrowerAnt, Decimal(-120)));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.flametrowerAnt, Decimal(-5)));
        this.poisonousPlant.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.weedkiller, Decimal(-0.01)));
        this.game.baseWorld.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.weedkiller, Decimal(-0.01)));
        this.game.baseWorld.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.chemistAnt, Decimal(-10)));
        this.game.baseWorld.soil.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.chemistAnt, Decimal(-10)));
        this.weedkiller.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.chemistAnt, Decimal(0.1)));
        //  Disinfestation
        this.disinfestationAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.disinfestationAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1000), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, Decimal(100), this.game.buyExp)
        ]));
        this.disinfestationAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.disinfestationAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.disinfestationAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.disinfestationAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        //  Flametrower
        this.flametrowerAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.flametrowerAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(12E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(8E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, Decimal(4E3), this.game.buyExp)
        ]));
        this.flametrowerAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.flametrowerAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        this.flametrowerAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.flametrowerAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        //  Chemist
        this.chemistAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.chemistAnt, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(12E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.fungus, Decimal(1E5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, Decimal(6E4), this.game.buyExp)
        ]));
        this.chemistAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.chemistAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]));
        this.chemistAnt.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.chemistAnt, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]));
        //    Beetle
        this.disinfestationBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.disinfestationBeetle, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.forest.larva, Decimal(1), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(300), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(3000), this.game.buyExp)
        ]));
        this.disinfestationBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.disinfestationBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.disinfestationBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.disinfestationBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.disinfestationBeetle.avabileBaseWorld = false;
        //  Flametrower  Beetle
        this.flametrowerBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.flametrowerBeetle, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.forest.larva, Decimal(1), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, Decimal(15E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(5E3), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, Decimal(6E4), this.game.buyExp)
        ]));
        this.flametrowerBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["d" /* UpAction */](this.game, this.flametrowerBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.flametrowerBeetle.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["e" /* UpHire */](this.game, this.flametrowerBeetle, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.flametrowerBeetle.avabileBaseWorld = false;
    };
    Infestation.prototype.addWorld = function () {
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldPrefix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Infested", "", [], [], [], [], [], [
            [this.poisonousPlant, Decimal(1E7)],
            [this.poisonousPlant2, Decimal(1E3)],
            [this.basicDisinfestationRes, Decimal(0)]
        ], Decimal(5.5), [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.poisonousPlant, Decimal(5E3))]));
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldSuffix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "of Infestation", "", [this.basicDisinfestationRes], [], [], [], [], [
            [this.poisonousPlant, Decimal(1E7)],
            [this.poisonousPlant2, Decimal(1E3)],
            [this.basicDisinfestationRes, Decimal(0)]
        ], Decimal(5.5), [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.poisonousPlant, Decimal(5E3))]));
    };
    return Infestation;
}());

//# sourceMappingURL=inferstation.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/machine.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world__ = __webpack_require__("../../../../../src/app/model/world.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Machine; });






var Machine = (function () {
    function Machine(game) {
        this.game = game;
        this.listMachinery = new Array();
        this.machineryProd = Decimal(500);
        this.machineryCost = Decimal(-150);
        this.price1 = Decimal(1E5);
        this.price2 = Decimal(6E4);
        this.price3 = Decimal(3E4);
    }
    Machine.prototype.declareStuff = function () {
        this.composterStation = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "composterStation", "堆肥站", "将木头转化为土壤。");
        this.refineryStation = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "refineryStation", "精炼站", "将土壤变成沙子。");
        this.laserStation = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "laserStation", "激光站", "生产水晶。");
        this.hydroFarm = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "hydroFarm", "水培农场", "生产真菌。");
        this.plantingMachine = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "plantingMac", "种植机", "生产木头。");
        this.sandDigger = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "sandDigger", "沙挖掘机", "生产沙子。");
        this.loggingMachine = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "loggingMachine", "伐木机", "生产木头。");
        this.mine = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "mine", "矿井", "生产水晶。");
        this.honeyMaker = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "honeyMaker", "蜂蜜制造商", "自动制作蜂蜜。 只有蜜蜂知道它是如何工作的。");
        this.iceCompacter = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "iceC", "冰压缩机", "冰压缩机是将冰块压成晶体的机器。");
        this.iceCollector = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "iceK", "水箱", "一个水箱。");
        this.burningGlass = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "burningGlass", "燃烧镜头", "用于聚集太阳光线的大凸透镜。 这台机器比其他任何东西更快地融化冰块。");
        this.listMachinery = new Array();
        this.listMachinery.push(this.composterStation);
        this.listMachinery.push(this.refineryStation);
        this.listMachinery.push(this.laserStation);
        this.listMachinery.push(this.hydroFarm);
        this.listMachinery.push(this.plantingMachine);
        this.listMachinery.push(this.sandDigger);
        this.listMachinery.push(this.loggingMachine);
        this.listMachinery.push(this.mine);
        this.listMachinery.push(this.honeyMaker);
        this.listMachinery.push(this.iceCompacter);
        this.listMachinery.push(this.iceCollector);
        this.listMachinery.push(this.burningGlass);
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Machinery", this.listMachinery));
    };
    Machine.prototype.initStuff = function () {
        //    Composter
        // this.composterStation.types = [Type.Machinery]
        this.composterStation.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.composterStation, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.fungus, this.price2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.price3, this.game.buyExp)
        ]));
        this.game.baseWorld.soil.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.composterStation, this.machineryProd));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.composterStation, this.machineryCost));
        //    Refinery
        // this.refineryStation.types = [Type.Machinery]
        this.refineryStation.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.refineryStation, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.fungus, this.price3, this.game.buyExp)
        ]));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.refineryStation, this.machineryProd));
        this.game.baseWorld.soil.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.refineryStation, this.machineryCost));
        //    Laser
        // this.laserStation.types = [Type.Machinery]
        this.laserStation.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.laserStation, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.sand, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, this.price2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price3, this.game.buyExp)
        ]));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.laserStation, this.machineryProd));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.laserStation, this.machineryCost));
        //    Hydroponic Farm
        // this.hydroFarm.types = [Type.Machinery]
        this.hydroFarm.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.hydroFarm, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.sand, this.price2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, this.price3, this.game.buyExp)
        ]));
        this.game.baseWorld.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.hydroFarm, this.machineryProd));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.hydroFarm, this.machineryCost));
        //    Planting Machine
        // this.plantingMachine.types = [Type.Machinery]
        this.plantingMachine.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.plantingMachine, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.fungus, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.price2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.sand, this.price3, this.game.buyExp)
        ]));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.plantingMachine, this.machineryProd));
        this.game.baseWorld.fungus.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.plantingMachine, this.machineryCost));
        //    Not always avaiable
        var machineryProd2 = this.machineryProd.div(2);
        //    Sand digger
        this.sandDigger.avabileBaseWorld = false;
        // this.sandDigger.types = [Type.Machinery]
        this.sandDigger.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.sandDigger, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.price2, this.game.buyExp)
        ]));
        this.game.baseWorld.sand.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.sandDigger, machineryProd2));
        //    Wood
        this.loggingMachine.avabileBaseWorld = false;
        // this.loggingMachine.types = [Type.Machinery]
        this.loggingMachine.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.loggingMachine, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.price2, this.game.buyExp)
        ]));
        this.game.baseWorld.wood.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.loggingMachine, machineryProd2));
        //    Mine
        this.mine.avabileBaseWorld = false;
        // this.mine.types = [Type.Machinery]
        this.mine.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.mine, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, this.price2, this.game.buyExp)
        ]));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.mine, machineryProd2));
        //    Honey
        this.honeyMaker.avabileBaseWorld = false;
        // this.honeyMaker.types = [Type.Machinery]
        this.honeyMaker.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.honeyMaker, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.nectar, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.honey, this.price2, this.game.buyExp)
        ]));
        this.game.baseWorld.honey.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.honeyMaker, this.machineryProd));
        this.game.baseWorld.nectar.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.honeyMaker, this.machineryCost));
        //    Ice Compacter
        this.iceCompacter.avabileBaseWorld = false;
        // this.iceCompacter.types = [Type.Machinery]
        this.iceCompacter.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.iceCompacter, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price2, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, this.price3, this.game.buyExp)
        ]));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.iceCompacter, this.machineryProd));
        this.game.baseWorld.ice.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.iceCompacter, this.machineryCost));
        //    Ice Collector
        this.iceCollector.avabileBaseWorld = false;
        // this.iceCollector.types = [Type.Machinery]
        this.iceCollector.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.iceCollector, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.soil, this.price2, this.game.buyExp)
        ]));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.iceCollector, machineryProd2));
        //    Ice Burning Glass
        this.burningGlass.avabileBaseWorld = false;
        // this.burningGlass.types = [Type.Machinery]
        this.burningGlass.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.burningGlass, [
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.price1, this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.game.baseWorld.wood, this.price2, this.game.buyExp)
        ]));
        this.game.baseWorld.ice.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.burningGlass, machineryProd2.times(-10)));
    };
    Machine.prototype.addWorld = function () {
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldPrefix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "Mechanized", "", [], [], [], [], [], [
            [this.composterStation, Decimal(0.2)],
            [this.refineryStation, Decimal(0.2)],
            [this.laserStation, Decimal(0.2)],
            [this.hydroFarm, Decimal(0.2)],
            [this.plantingMachine, Decimal(0.2)]
        ], Decimal(1)));
        __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */].worldSuffix.push(new __WEBPACK_IMPORTED_MODULE_5__world__["a" /* World */](this.game, "of Machine", "", [], [], [], [], [], [
            [this.composterStation, Decimal(0.2)],
            [this.refineryStation, Decimal(0.2)],
            [this.laserStation, Decimal(0.2)],
            [this.hydroFarm, Decimal(0.2)],
            [this.plantingMachine, Decimal(0.2)]
        ], Decimal(1)));
    };
    return Machine;
}());

//# sourceMappingURL=machine.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/prestige.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Prestige; });





var Prestige = (function () {
    function Prestige(game) {
        this.game = game;
        this.expLists = new Array();
        this.expAnt = new Array();
        this.expFollower = new Array();
        this.expMachinery = new Array();
        this.expTech = new Array();
        this.allPrestigeUp = new Array();
        //  Efficiency
        this.effList = new Array();
        this.effListEng = new Array();
        //  Time
        this.timeList = new Array();
    }
    Prestige.prototype.declareStuff = function () {
    };
    Prestige.prototype.initStuff = function () {
        var _this = this;
        var expIncrement = Decimal(1.3);
        this.experience = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "exp", "Exp", "Experience. Experience upgrade do not reset when changing worlds.", true);
        this.expLists = new Array();
        this.expAnt = new Array();
        //#region Ants Power
        this.pAntPower = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pap", "Ant Power", "Ants yield 30% more food.", true);
        this.pAntGeo = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pAntGeo", "Geologist Power", "Geologists yield 30% more crystal.", true);
        this.pAntHunter1 = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "phunt1", "Hunter Power", "Hunters yield and consume 30% more resources.", true);
        this.pAntHunter2 = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "phunt2", "Advanced Hunter", "Advanced Hunters yield and consume 30% more resources.", true);
        this.pAntFungus = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "paf", "Farmer Power", "Farmers yield and consume 30% more resources", true);
        this.expAnt.push(this.pAntPower);
        this.expAnt.push(this.pAntGeo);
        this.expAnt.push(this.pAntHunter1);
        this.expAnt.push(this.pAntHunter2);
        this.expAnt.push(this.pAntFungus);
        this.expAnt.forEach(function (p) {
            _this.allPrestigeUp.push(p);
            p.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](_this.game, p, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.experience, Decimal(15), expIncrement)]));
            p.unlocked = true;
        });
        this.game.baseWorld.littleAnt.prestigeBonusProduction.push(this.pAntPower);
        this.game.baseWorld.geologist.prestigeBonusProduction.push(this.pAntGeo);
        this.game.baseWorld.hunter.prestigeBonusProduction.push(this.pAntHunter1);
        this.game.baseWorld.advancedHunter.prestigeBonusProduction.push(this.pAntHunter2);
        this.game.baseWorld.farmer.prestigeBonusProduction.push(this.pAntFungus);
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Ant", this.expAnt));
        //#endregion
        //#region Ants in next world
        this.pAntNext = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pan", "Ant follower", "Start new worlds with 5 more ants.", true);
        this.pGeologistNext = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pgn", "Geologist follower", "Start new worlds with 5 more geologists.", true);
        this.pScientistNext = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "psn", "Scientist follower", "Start new worlds with 5 more scientists.", true);
        this.pFarmerNext = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pfn", "Farmer follower", "Start new worlds with 5 more farmers.", true);
        this.pCarpenterNext = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pcarn", "Carpenter follower", "Start new worlds with 5 more carpenters.", true);
        this.pLumberjackNext = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "plumn", "Lumberjack follower", "Start new worlds with 5 more lumberjack.", true);
        this.expFollower = [this.pAntNext, this.pGeologistNext, this.pScientistNext,
            this.pFarmerNext, this.pCarpenterNext, this.pLumberjackNext];
        this.expFollower.forEach(function (n) {
            _this.allPrestigeUp.push(n);
            n.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](_this.game, n, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.experience, Decimal(10), expIncrement)]));
        });
        this.game.baseWorld.littleAnt.prestigeBonusStart = this.pAntNext;
        this.game.baseWorld.geologist.prestigeBonusStart = this.pGeologistNext;
        this.game.science.student.prestigeBonusStart = this.pScientistNext;
        this.game.baseWorld.farmer.prestigeBonusStart = this.pFarmerNext;
        this.game.baseWorld.carpenter.prestigeBonusStart = this.pCarpenterNext;
        this.game.baseWorld.lumberjack.prestigeBonusStart = this.pLumberjackNext;
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Ant Followers", this.expFollower));
        //#endregion
        //#region  Machinery
        this.expMachinery = new Array();
        this.pMachineryPower = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pMach", "Machinery Power", "Machinery yeild and consume 30% more resources.", true);
        this.pMachineryPower.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.pMachineryPower, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.experience, Decimal(20), expIncrement)]));
        this.expMachinery.push(this.pMachineryPower);
        this.game.machines.listMachinery.forEach(function (m) { return m.prestigeBonusProduction.push(_this.pMachineryPower); });
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Machinery", this.expMachinery));
        //#endregion
        //#region Technology
        this.expTech = new Array();
        this.pComposter = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pComposter", "Compost", "Composter units yield and consume 30% more resources.", true);
        this.pRefinery = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pRefinery", "Refinery", "Refinery units yield and consume 30% more resources.", true);
        this.pLaser = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pLaser", "Laser", "Laser units yield and consume 30% more resources.", true);
        this.pHydro = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pHydro", "Hydroponics", "Hydroponics units yield and consume 30% more resources.", true);
        this.pPlanter = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "pPlanter", "Planting", "Planting units yield and consume 30% more resources.", true);
        this.expTech.push(this.pComposter);
        this.expTech.push(this.pRefinery);
        this.expTech.push(this.pLaser);
        this.expTech.push(this.pHydro);
        this.expTech.push(this.pPlanter);
        this.expTech.forEach(function (p) {
            p.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](_this.game, p, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.experience, Decimal(30), expIncrement)]));
        });
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Technology", this.expTech));
        this.game.machines.composterStation.prestigeBonusProduction.push(this.pComposter);
        this.game.baseWorld.composterAnt.prestigeBonusProduction.push(this.pComposter);
        this.game.machines.refineryStation.prestigeBonusProduction.push(this.pRefinery);
        this.game.baseWorld.refineryAnt.prestigeBonusProduction.push(this.pRefinery);
        this.game.machines.laserStation.prestigeBonusProduction.push(this.pLaser);
        this.game.baseWorld.laserAnt.prestigeBonusProduction.push(this.pLaser);
        this.game.machines.hydroFarm.prestigeBonusProduction.push(this.pHydro);
        this.game.baseWorld.hydroAnt.prestigeBonusProduction.push(this.pHydro);
        this.game.machines.plantingMachine.prestigeBonusProduction.push(this.pPlanter);
        this.game.baseWorld.planterAnt.prestigeBonusProduction.push(this.pPlanter);
        //#endregion
        //#region Supply
        var supplyMaterials = [
            this.game.baseWorld.food,
            this.game.baseWorld.crystal,
            this.game.baseWorld.soil,
            this.game.baseWorld.wood,
            this.game.baseWorld.sand
        ];
        supplyMaterials.forEach(function (sm) { return sm.prestigeBonusQuantityValue = Decimal(100); });
        this.supplyList = supplyMaterials.map(function (sm) {
            return new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](_this.game, "supp_" + sm.id, sm.name + " supply.", "Start new worlds with 100 more " + sm.name + ".", true);
        });
        this.supplyList.forEach(function (n) {
            _this.allPrestigeUp.push(n);
            n.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](_this.game, n, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.experience, Decimal(12), expIncrement)]));
        });
        for (var i = 0; i < supplyMaterials.length; i++)
            supplyMaterials[i].prestigeBonusStart = this.supplyList[i];
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Supply", this.supplyList));
        //#endregion
        //#region Efficiency
        this.effList = new Array();
        var names = [
            "Composter", "Refinery", "Laser", "Hydroponics", "Planting"
        ];
        var effMatrix = [
            [
                [this.game.baseWorld.composterAnt, this.game.machines.composterStation]
            ],
            [
                [this.game.baseWorld.refineryAnt, this.game.machines.refineryStation]
            ],
            [
                [this.game.baseWorld.laserAnt, this.game.machines.laserStation]
            ],
            [
                [this.game.baseWorld.hydroAnt, this.game.machines.hydroFarm]
            ],
            [
                [this.game.baseWorld.planterAnt, this.game.machines.plantingMachine]
            ]
        ];
        var _loop_1 = function (i) {
            var eff = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this_1.game, "eff" + names[i], names[i], names[i] + " units consume 5% less resources. Max -50%.", true);
            var ba = new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this_1.game, eff, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this_1.experience, Decimal(50), expIncrement)]);
            ba.limit = Decimal(10);
            eff.actions.push(ba);
            effMatrix[i].forEach(function (u) { return u.forEach(function (u2) { return u2.produces
                .filter(function (p) { return p.efficiency.lessThanOrEqualTo(0); })
                .forEach(function (prod) {
                if (!prod.bonusList)
                    prod.bonusList = new Array();
                prod.bonusList.push([eff, Decimal(-0.05)]);
            }); }); });
            this_1.effList.push(eff);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Efficiency", this.effList));
        //#endregion
        //#region Efficiency 2
        this.effListEng = new Array();
        this.game.engineers.listEnginer.forEach(function (eng) {
            var eff = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](_this.game, "effEng" + eng.id, eng.name, eng.name + " consume 5% less resources. Max -50%.", true);
            var ba = new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](_this.game, eff, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](_this.experience, Decimal(50), expIncrement)]);
            ba.limit = Decimal(10);
            eff.actions.push(ba);
            eng.produces.filter(function (p) { return p.efficiency.lessThanOrEqualTo(0); })
                .forEach(function (prod) {
                if (!prod.bonusList)
                    prod.bonusList = new Array();
                prod.bonusList.push([eff, Decimal(-0.05)]);
            });
            _this.effListEng.push(eff);
        });
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Engineering", this.effListEng));
        //#endregion
        //#region Time
        this.time = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "ptime", "Time", "Time can be used to go to the future. One unit of time corresponds to one second.", true);
        this.timeMaker = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "ptimeMaker", "Time Generator", "Time Generator generate time at 1/10 of real life speed. It's not affected by pause and time warps.", true);
        this.timeMaker.percentage = 100;
        this.timeMaker.alwaysOn = true;
        this.timeBank = new __WEBPACK_IMPORTED_MODULE_1__units_unit__["a" /* Unit */](this.game, "ptimeBank", "Time Bank", "Time Bank increase the maxium time storage by 1 hour. Base storage is 4 hours.", true);
        this.timeMaker.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.timeMaker, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.experience, Decimal(25), expIncrement)]));
        this.timeBank.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["b" /* BuyAction */](this.game, this.timeBank, [new __WEBPACK_IMPORTED_MODULE_3__cost__["a" /* Cost */](this.experience, Decimal(100), expIncrement)]));
        this.game.actMin = new __WEBPACK_IMPORTED_MODULE_2__units_action__["c" /* TimeWarp */](this.game, Decimal(60), "Minutes");
        this.game.actHour = new __WEBPACK_IMPORTED_MODULE_2__units_action__["c" /* TimeWarp */](this.game, Decimal(3600), "Hours");
        this.time.actions.push(this.game.actMin);
        this.time.actions.push(this.game.actHour);
        this.time.actions.push(new __WEBPACK_IMPORTED_MODULE_2__units_action__["c" /* TimeWarp */](this.game, Decimal(3600 * 24), "Days"));
        this.time.addProductor(new __WEBPACK_IMPORTED_MODULE_0__production__["a" /* Production */](this.timeMaker, Decimal(0.1)));
        this.timeList = [this.time, this.timeMaker, this.timeBank];
        this.expLists.push(new __WEBPACK_IMPORTED_MODULE_4__typeList__["a" /* TypeList */]("Time Management", this.timeList));
        //#endregion
        this.expLists.map(function (l) { return l.list; }).forEach(function (al) { return al.forEach(function (l) {
            l.unlocked = true;
            l.showTables = false;
            l.neverEnding = true;
            l.actions.forEach(function (a) { return a.unlocked = true; });
        }); });
    };
    Prestige.prototype.addWorld = function () {
    };
    return Prestige;
}());

//# sourceMappingURL=prestige.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/researchs.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Researchs; });


var Researchs = (function () {
    function Researchs(game) {
        this.game = game;
    }
    Researchs.prototype.declareStuff = function () { };
    Researchs.prototype.initStuff = function () {
        var _this = this;
        //    Bi
        this.bi = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("biResea", "Business Intelligence", "See who produce or consume your resources.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(2E3))], [], this.game);
        // //   Devolution
        // this.devolution = new Research(
        //   "devoluti",
        //   "De-Evolution",
        //   "Revert the effect of evolution.",
        //   [new Cost(this.game.baseWorld.science, Decimal(1))],
        //   [],
        //   this.game,
        //   () => {
        //     this.game.world.toUnlock.forEach(t => t.basePrice = t.basePrice.div(5))
        //     this.game.world.experience = this.game.world.experience.div(3)
        //   }
        // )
        //    Evolution
        this.evolution = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("evolution", "Evolution", "Increase the resources need to travel to a new world (x5) and also increase the experience you will gain (x3).", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E10))], [], this.game, function () {
            _this.game.world.toUnlock.forEach(function (t) { return t.basePrice = t.basePrice.times(5); });
            _this.game.world.experience = _this.game.world.experience.times(3);
        });
        //    Missing
        // this.missing = new Research(
        //   "missing",
        //   "Missing", "Get 50% of missing world travel requirement.",
        //   [new Cost(this.game.baseWorld.science, Decimal(2E11))],
        //   [],
        //   this.game,
        //   () => {
        //     this.game.world.toUnlock.filter(t => t.basePrice.greaterThan(t.unit.quantity))
        //       .forEach(t => t.unit.quantity = t.unit.quantity.plus(
        //         t.basePrice.minus(t.unit.quantity).div(2)
        //       ))
        //   }
        // )
        //    Escape
        this.escape = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("escapism", "Escapism", "Reduce the resources need to travel to a new world by 50%.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(5E10))], [], this.game, function () {
            _this.game.world.toUnlock.forEach(function (t) { return t.basePrice = t.basePrice.div(2); });
            // this.game.world.toUnlockMax.forEach(t => t.basePrice = t.basePrice.times(4))
        });
        //    Adaptation
        this.adaptation = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("adaptation", "Adaptation", "Reduce the resources need to travel to a new world by 50%.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(5E8))], [this.escape], this.game, function () {
            _this.game.world.toUnlock.forEach(function (t) { return t.basePrice = t.basePrice.div(2); });
            //   this.game.world.toUnlockMax.forEach(t => t.basePrice = t.basePrice.times(4))
        });
        //  Time Warp
        this.timeWarp = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("timeWarp", "Time warp", "4 hour of update. Use it use it wisely.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1))], [], this.game, function () {
            _this.game.longUpdate(3600 * 4000, true);
        });
        //    Here and Now
        this.hereAndNow = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("hereAndNow", "此时此地", "获得10经验。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E9))], [this.timeWarp], this.game, function () {
            _this.game.prestige.experience.quantity = _this.game.prestige.experience.quantity.plus(10);
            _this.game.maxLevel = _this.game.maxLevel.plus(10);
            _this.game.expTabAv = true;
        });
        //    University 4
        this.depEduRes = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("depEduRes", "教育部门", "解锁教育部。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(3E10))], [this.game.science.depEdu], this.game);
        //    University 3
        this.advancedLesson = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("advancedLesson", "高级课程", "大学也生产科学家。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(3E6))], [this.game.science.scientistProduction, this.depEduRes], this.game);
        //    University 2
        this.publicLesson = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("publicLesson", "Public Lesson", "University also produces students.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E5))], [this.game.science.studentProduction, this.advancedLesson], this.game);
        //    University
        this.universityRes = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("University", "University", "Unlock university.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(6E4))], [this.game.science.university, this.publicLesson], this.game);
        //    Scientific Method
        this.scientificMethod = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("scientificMethod", "Scientific Method", "Science production +100%", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(4E3))], [this.universityRes], this.game);
        this.game.baseWorld.science.bonusProduction.push([this.scientificMethod, Decimal(1)]);
        // //    Stage
        // this.stageRes = new Research(
        //   "stageRes",
        //   "Stage", "Stage.",
        //   [new Cost(this.game.baseWorld.science, Decimal(3E6))],
        //   this.game.machines.stageList,
        //   this.game
        // )
        var deps = this.game.engineers.listDep;
        this.departmentRes = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("departementsRes", "Departments", "Departments yeild engineers.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E11))], deps, this.game);
        //    Engineer
        var eng = this.game.engineers.listEnginer;
        // //eng.push(this.stageRes)
        this.engineerRes = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("engineerRes", "Engineer", "Engineer will slowly build machinery.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(3E6))], eng.concat(this.departmentRes), this.game);
        //    Planter
        this.planterResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("planRes", "Planting", "Tree planting is the process of transplanting tree seedlings.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E4))], [this.game.baseWorld.planterAnt], this.game);
        //    Hydro
        this.hydroResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("hydroRes", "Hydroponics", "Hydroponics is the art of growing plants without soil.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E4))], [this.game.baseWorld.hydroAnt], this.game);
        //    Laser
        this.laserResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("lasRes", "激光", "沙子可以融合成水晶。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E4))], [this.game.baseWorld.laserAnt], this.game);
        //    Refinery
        this.refineryResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("refRes", "精炼厂", "土壤可以精制成沙子。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E4))], [this.game.baseWorld.refineryAnt], this.game);
        //    Compost
        this.composterResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("compRes", "Compost", "Wood can be degraded to fertile soil.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E4))], [this.game.baseWorld.composterAnt], this.game);
        //    Experiment
        this.experimentResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("experimentRes", "Experiment", "Unlock scientist Ant", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(800))], [this.game.science.scientist, this.scientificMethod], this.game);
        //    Prestige
        this.prestigeResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("prestigeRes", "Travel", "Allow you to move to new worlds", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E7))], [this.hereAndNow, this.adaptation, this.evolution], this.game, function () { _this.game.worldTabAv = true; });
        //    Machinery
        var listM = new Array();
        listM = listM.concat(this.game.machines.listMachinery, [this.engineerRes]);
        this.machineryRes = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("machiRes", "Machinery", "Unlock powerful machinery.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E6))], listM, this.game);
        //    Special
        this.specialResearch = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("speRes", "Technology", "Allow you to research new technologies.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(3E3))], [this.composterResearch, this.refineryResearch, this.laserResearch, this.hydroResearch,
            this.planterResearch, this.experimentResearch,
            this.machineryRes, this.prestigeResearch,
            this.bi], this.game);
        //    Up Combined
        this.upCombined = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("upComb", "Combined bonus", "This is the ultimate bonus: multiply unit's bonus per hire bonus.", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1E10))], [], this.game);
        //    Up Hire
        var allUpH = Array.from(this.game.unitMap.values()).filter(function (u) { return u.upHire; }).map(function (u) { return u.upHire; });
        allUpH.push(this.upCombined);
        var r4 = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("R4", "双胞胎", "允许您以相同的价格获得更多的单位。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(7E3))], allUpH, this.game);
        //    Up 2
        var allUp = Array.from(this.game.unitMap.values()).filter(function (u) { return u.upAction; }).map(function (u) { return u.upAction; });
        allUp.push(r4);
        var r2 = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("R2", "团队合作2", "升级您的单位生产加成。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(500))], allUp, this.game);
        //    Up basic
        this.up1 = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("RUp1", "团队合作", "根据您购买单位的次数提供生产加成。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(50))], [r2], this.game);
        //    Hunter 2
        var hunting2 = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("HuntR2", "高级狩猎", "蚂蚁装备更好的武器。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(4000))], [this.game.baseWorld.advancedHunter], this.game);
        //    Hunter
        var hunting = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("HuntR1", "狩猎", "用武器装备蚂蚁以获得食物。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(2000))], [this.game.baseWorld.hunter, hunting2, this.specialResearch], this.game);
        //    Wood
        var woodcutting = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("WR1", "伐木", "允许您收集木材以备将来使用。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1000))], [this.game.baseWorld.lumberjack, hunting], this.game);
        //    Fungus up
        var r3 = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("R3", "真菌实验", "允许你通过做实验来增加真菌的食物生产。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(1000))], [this.game.baseWorld.fungus.upSpecial], this.game);
        //    Farming
        var r1 = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("R1", "蚂蚁的真菌共生", "让你培养真菌。 真菌是食物的来源。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(100))], [this.game.baseWorld.farmer, r3, woodcutting], this.game);
        //    Soil
        this.rDirt = new __WEBPACK_IMPORTED_MODULE_0__units_action__["a" /* Research */]("RDirt", "土壤", "允许您收集土壤以备将来使用。", [new __WEBPACK_IMPORTED_MODULE_1__cost__["a" /* Cost */](this.game.baseWorld.science, Decimal(50))], [this.game.baseWorld.soil, this.game.baseWorld.carpenter, r1, this.up1], this.game);
    };
    Researchs.prototype.addWorld = function () {
    };
    return Researchs;
}());

//# sourceMappingURL=researchs.js.map

/***/ }),

/***/ "../../../../../src/app/model/worlds/science.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__units_togableProductions__ = __webpack_require__("../../../../../src/app/model/units/togableProductions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__production__ = __webpack_require__("../../../../../src/app/model/production.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_unit__ = __webpack_require__("../../../../../src/app/model/units/unit.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__units_action__ = __webpack_require__("../../../../../src/app/model/units/action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__typeList__ = __webpack_require__("../../../../../src/app/model/typeList.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Science; });






var Science = (function () {
    function Science(game) {
        this.game = game;
        this.listScience = Array();
    }
    Science.prototype.declareStuff = function () {
        this.student = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "scn", "学生", "学生生产科学。");
        // this.student.types = [Type.Ant, Type.Scientist]
        this.scientist = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "scie2", "科学家蚂蚁", "将水晶变成科学。");
        this.university = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "univ", "大学", "大学生产科学。");
        this.depEdu = new __WEBPACK_IMPORTED_MODULE_2__units_unit__["a" /* Unit */](this.game, "depEdu", "教育部门", "教育部门建立大学。");
        this.listScience = [this.student, this.scientist, this.university, this.depEdu];
        this.game.lists.push(new __WEBPACK_IMPORTED_MODULE_5__typeList__["a" /* TypeList */]("Science", this.listScience));
        this.studentProduction = new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.university, Decimal(0.2), false);
        this.scientistProduction = new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.university, Decimal(0.1), false);
        this.science1Production = new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.university, Decimal(450));
        this.science2Production = new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.university, Decimal(1000), false);
        this.uniProduction = new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.university, Decimal(0.1), false);
    };
    Science.prototype.initStuff = function () {
        this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.student));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.student, Decimal(-0.5)));
        this.university.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.depEdu, Decimal(0.1)));
        this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.depEdu, Decimal(-1E5)));
        var specialProduction = Decimal(15);
        var specialCost = Decimal(-4);
        var specialFood = Decimal(1E7);
        var specialRes2 = Decimal(1E4);
        //    Student
        this.student.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["f" /* BuyAndUnlockAction */](this.game, this.student, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.food, Decimal(1000), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.crystal, Decimal(100), Decimal(this.game.buyExp)),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
        ], [this.game.baseWorld.science]));
        this.student.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.student, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]));
        this.student.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.student, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]));
        //  Scientist
        // this.scientist.types = [Type.Ant]
        this.scientist.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.scientist, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.food, specialFood.div(5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.crystal, specialRes2.div(5), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.littleAnt, Decimal(1), this.game.buyExpUnit)
        ]));
        this.game.baseWorld.science.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.scientist, specialProduction.times(2)));
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.scientist, specialCost));
        this.scientist.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["d" /* UpAction */](this.game, this.scientist, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]));
        this.scientist.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["e" /* UpHire */](this.game, this.scientist, [new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceHireExp)]));
        //  University
        this.university.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.university, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.wood, this.game.machines.price1.times(2), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.game.machines.price2.times(2), this.game.buyExp)
        ]));
        this.game.baseWorld.science.addProductor(this.science1Production);
        this.game.baseWorld.crystal.addProductor(new __WEBPACK_IMPORTED_MODULE_1__production__["a" /* Production */](this.university, specialCost.times(10)));
        this.student.addProductor(this.studentProduction);
        this.scientist.addProductor(this.scientistProduction);
        this.university.togableProductions = [
            new __WEBPACK_IMPORTED_MODULE_0__units_togableProductions__["a" /* TogableProduction */]("产生学生", [this.studentProduction]),
            new __WEBPACK_IMPORTED_MODULE_0__units_togableProductions__["a" /* TogableProduction */]("产生科学家", [this.scientistProduction])
        ];
        //  Dep
        this.depEdu.actions.push(new __WEBPACK_IMPORTED_MODULE_3__units_action__["b" /* BuyAction */](this.game, this.depEdu, [
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.university, Decimal(100), this.game.buyExpUnit),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.wood, this.game.machines.price1.times(100), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.crystal, this.game.machines.price2.times(100), this.game.buyExp),
            new __WEBPACK_IMPORTED_MODULE_4__cost__["a" /* Cost */](this.game.baseWorld.science, this.game.machines.price1.times(100), this.game.buyExp),
        ]));
    };
    Science.prototype.addWorld = function () {
    };
    return Science;
}());

//# sourceMappingURL=science.js.map

/***/ }),

/***/ "../../../../../src/app/options/options.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <div class=\"content-area\">\n\n    <p>\n      游戏每3分钟自动保存。 您还可以手动保存，加载和导出保存游戏。 游戏存档存储在本地存储中，如果你没有备份存档，请不要清除浏览器缓存。\n    </p>\n    <strong>警告：清除按钮将会删除你的所有游戏记录！</strong>\n\n    <div class=\"form-group\">\n      <button class=\"btn btn-success\" (click)=\"save($event)\">保存</button>\n      <button class=\"btn btn-primary\" (click)=\"load($event)\">加载</button>\n      <button class=\"btn btn-danger\" (click)=\"clear($event)\">清除</button>\n    </div>\n    <div class=\"form-group\">\n      <h5>导出 / 导入存档</h5>\n      <label for=\"save\">保存</label>\n      <textarea ref-textarea class=\"form-control\" rows=\"1\" id=\"save\" [(ngModel)]=\"stringSave\"></textarea>\n      <button class=\"btn btn-success\" (click)=\"export($event)\">导出</button>\n      <button class=\"btn btn-primary\" (click)=\"import($event)\">导入</button>\n    </div>\n\n    <a href=\"https://zhaolinxu.github.io/IdleAnt/changelog.txt\" target=\"_blank\">更新日志</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/options/options.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/options/options.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_service__ = __webpack_require__("../../../../../src/app/game.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OptionsComponent = (function () {
    function OptionsComponent(gameService) {
        this.gameService = gameService;
        this.stringSave = "";
    }
    OptionsComponent.prototype.ngOnInit = function () {
    };
    OptionsComponent.prototype.save = function (event) { this.gameService.save(); };
    OptionsComponent.prototype.load = function (event) { this.gameService.load(); };
    OptionsComponent.prototype.clear = function (event) { this.gameService.clear(); };
    OptionsComponent.prototype.export = function (event) {
        this.stringSave = this.gameService.game.getSave();
    };
    OptionsComponent.prototype.import = function (event) {
        this.gameService.game.load(this.stringSave);
    };
    return OptionsComponent;
}());
OptionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-options',
        template: __webpack_require__("../../../../../src/app/options/options.component.html"),
        styles: [__webpack_require__("../../../../../src/app/options/options.component.scss")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */]) === "function" && _a || Object])
], OptionsComponent);

var _a;
//# sourceMappingURL=options.component.js.map

/***/ }),

/***/ "../../../../../src/app/prestige/prestige.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <div class=\"content-area\">\n    <h2>{{getTitle()}}</h2>\n\n    <div *ngIf=\"!travelAv()\">\n      <div *ngIf=\"!this.gameService.game.research.prestigeResearch.owned()\">\n        <clr-alert [clrAlertType]=\"'alert-warning'\">\n          <div class=\"alert-item\">\n            <span class=\"alert-text\">\n              You will not be able to travel without the Travel research !\n            </span>\n          </div>\n        </clr-alert>\n      </div>\n      <p> You need the travel research and: </p>\n      <table class=\"nowrap\" style=\"width:100%\">\n        <tbody>\n          <tr *ngFor=\"let cost of gameService.game.world.toUnlock\">\n            <td>\n              <span class=\"nowrap\">{{cost.basePrice | format}}&nbsp;{{cost.unit.name}}</span>\n            </td>\n            <td style=\"width:100%\">\n              <div class=\"progress labeled\" [ngClass]=\"{'success': cost.unit.quantity.greaterThanOrEqualTo(cost.basePrice), 'danger': !cost.unit.quantity.greaterThanOrEqualTo(cost.basePrice)}\">\n                <progress max=\"100\" [value]=\"cost.unit.quantity.times(100).div(cost.basePrice).toNumber()\" data-displayval=\"0%\">\n                </progress>\n                <span *ngIf=\"!cost.unit.quantity.greaterThan(cost.basePrice)\">\n                  {{cost.unit.quantity.times(100).div(cost.basePrice) | format}}%\n                </span>\n                <span *ngIf=\"cost.unit.quantity.greaterThan(cost.basePrice)\">\n                  100%\n                </span>\n              </div>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <div *ngIf=\"this.gameService.game.world.toUnlockMax.length >0\">\n\n        <p>You must have less than:</p>\n        <table class=\"nowrap\" style=\"width:100%\">\n          <tbody>\n            <tr *ngFor=\"let cost of gameService.game.world.toUnlockMax\">\n              <td>\n                <span class=\"nowrap\">{{cost.basePrice | format}}&nbsp;{{cost.unit.name}}</span>\n              </td>\n              <td style=\"width:100%\">\n                <div class=\"progress labeled\" [ngClass]=\"{'success': !cost.unit.quantity.greaterThanOrEqualTo(cost.basePrice), 'danger': cost.unit.quantity.greaterThanOrEqualTo(cost.basePrice)}\">\n                  <progress max=\"100\" [value]=\"cost.unit.quantity.times(100).div(cost.basePrice).toNumber()\" data-displayval=\"0%\">\n                  </progress>\n                  <span *ngIf=\"!cost.unit.quantity.greaterThan(cost.basePrice)\">\n                    {{cost.unit.quantity.times(100).div(cost.basePrice) | format}}%\n                  </span>\n                  <span *ngIf=\"cost.unit.quantity.greaterThan(cost.basePrice)\">\n                    100%\n                  </span>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <button class=\"btn btn-warning-outline\" (click)=\"skipWorld()\">Skip</button>\n      <p> By skipping you will be able to change world, but you will not get {{gameService.game.getExperience()\n        | format}} experience.</p>\n    </div>\n\n    <div *ngIf=\"travelAv()\">\n      <div *ngIf=\"!skip\">\n        <p> By going away you will earn {{gameService.game.getExperience() | format}} experience. High level\n          worlds will yeild more experience but require more resource. </p>\n      </div>\n      <div *ngIf=\"skip\">\n        <p> By skipping this world you will not earn any experience! If you change your mind go to another\n          tab.\n        </p>\n      </div>\n      <div>\n        Resources needed to travel:\n        <span *ngFor=\"let cost of gameService.game.world.toUnlock\">\n          <span class=\"nowrap\">{{cost.basePrice | format}}&nbsp;{{cost.unit.name}},</span>\n        </span>\n        <div *ngIf=\"this.gameService.game.world.toUnlockMax.length >0\">\n          and less than:\n          <span *ngFor=\"let cost of gameService.game.world.toUnlockMax\">\n            <span class=\"nowrap\">{{cost.basePrice | format}}&nbsp;{{cost.unit.name}},</span>\n          </span>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <button class=\"btn btn-secondary\" (click)=\"change()\">\n          <clr-icon shape=\"world\"></clr-icon>\n          Change worlds\n        </button>\n\n        <label>Min Level:</label>\n        <input type=\"number\" placeholder=\"0\" [(ngModel)]=\"gameService.game.minUser\" class=\"numIn\" min=\"1\" [max]=\"gameService.game.maxUser\">\n        <label>Max Level ({{gameService.game.maxMax}}):</label>\n        <input type=\"number\" [placeholder]=\"gameService.game.maxMax\" [(ngModel)]=\"gameService.game.maxUser\" class=\"numIn\"\n          [min]=\"gameService.game.minUser\" [max]=\"gameService.game.maxMax\">\n      </div>\n      <div class=\"card-columns card-columns-2\">\n        <div class=\"card\" *ngFor=\"let world of gameService.game.nextWorlds \">\n          <div class=\"card-header text-capitalize\"> {{world.name}} </div>\n          <div class=\"card-block\">\n            <div class=\"card-title\"> Level: {{world.level}}\n              <br/> {{world.experience}} experience </div>\n            <div class=\"card-text\">\n              {{world.description}}\n              <ul class=\"list\">\n                <li *ngFor=\"let p of world.avaiableUnits\"> {{p.name}}: {{p.description }} </li>\n                <li *ngFor=\"let p of world.unlockedUnits\">\n                  <span *ngIf=\"!p[1].greaterThan(0)\">\n                    {{p[0].name}}: {{p[0].description }}\n                  </span>\n                  <span *ngIf=\"p[1].greaterThan(0)\">\n                    Start with {{p[1] | format }} {{p[0].name}}\n                  </span>\n                </li>\n                <li *ngFor=\"let p of world.prodMod\">\n                  Production of {{p[0].name}} x {{p[1] }}\n                </li>\n                <li *ngFor=\"let p of world.unitMod\">\n                    {{p[0].name}} yield and consume x{{p[1]}} more resources\n                  <!-- {{p[0].name}} production x {{p[1] }} -->\n                 </li>\n                <li *ngFor=\"let p of world.unitPrice\"> {{p[0].name}} price x {{p[1] }} </li>\n              </ul>\n            </div>\n            <div class=\"card-footer\">\n              <button class=\"btn btn-primary\" (click)=\"goTo(world)\">Go to</button>\n\n              <div class=\"toggle-switch\">\n                <input type=\"checkbox\" [id]=\"world.id\" [(ngModel)]=\"world.keep\">\n                <label [for]=\"world.id\">Keep</label>\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/prestige/prestige.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".numIn {\n  width: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/prestige/prestige.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_service__ = __webpack_require__("../../../../../src/app/game.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrestigeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PrestigeComponent = (function () {
    function PrestigeComponent(gameService, router) {
        this.gameService = gameService;
        this.router = router;
        this.skip = false;
        gameService.game.setMaxLevel();
    }
    PrestigeComponent.prototype.ngOnInit = function () {
    };
    PrestigeComponent.prototype.skipWorld = function () { this.skip = true; };
    PrestigeComponent.prototype.getTitle = function () {
        if (this.skip)
            return "You are skipping this world!";
        else {
            if (!this.travelAv())
                return "You cannot go to a new world yet";
            else
                return "Here you can travel to a brave new world";
        }
    };
    PrestigeComponent.prototype.travelAv = function () {
        // return this.skip || (this.gameService.game.research.prestigeResearch.owned() &&
        //   this.gameService.game.world.prestige.getBuyMax().greaterThan(0) &&
        //   (this.gameService.game.world.toUnlockMax.length === 0 ||
        //     !!this.gameService.game.world.toUnlockMax.find(tum => tum.basePrice.greaterThan(tum.unit.quantity))))
        if (this.skip)
            return true;
        if (!this.gameService.game.research.prestigeResearch.owned())
            return false;
        var currentPrice;
        var size1 = this.gameService.game.world.toUnlock.length;
        for (var i = 0; i < size1; i++) {
            currentPrice = this.gameService.game.world.toUnlock[i];
            if (currentPrice.basePrice.greaterThan(currentPrice.unit.quantity)) {
                return false;
            }
        }
        var size2 = this.gameService.game.world.toUnlockMax.length;
        for (var i = 0; i < size2; i++) {
            currentPrice = this.gameService.game.world.toUnlockMax[i];
            if (currentPrice.basePrice.lessThan(currentPrice.unit.quantity))
                return false;
        }
        return true;
    };
    PrestigeComponent.prototype.goTo = function (world) {
        world.goTo(this.skip);
        this.router.navigateByUrl('/');
    };
    PrestigeComponent.prototype.change = function () {
        this.gameService.game.generateRandomWorld();
    };
    return PrestigeComponent;
}());
PrestigeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-prestige',
        template: __webpack_require__("../../../../../src/app/prestige/prestige.component.html"),
        styles: [__webpack_require__("../../../../../src/app/prestige/prestige.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */]) === "function" && _b || Object])
], PrestigeComponent);

var _a, _b;
//# sourceMappingURL=prestige.component.js.map

/***/ }),

/***/ "../../../../../src/app/price-pipe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_cost__ = __webpack_require__("../../../../../src/app/model/cost.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricePipePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PricePipePipe = (function () {
    function PricePipePipe() {
    }
    PricePipePipe.prototype.transform = function (cost, action) {
        var price = new Array();
        if (action.unit)
            price = cost.map(function (c) {
                return new __WEBPACK_IMPORTED_MODULE_1__model_cost__["a" /* Cost */](c.unit, c.basePrice.times(action.unit.worldBuyModifiers), c.growFactor);
            });
        else
            price = cost;
        return price.map(function (c) {
            var constRet = new __WEBPACK_IMPORTED_MODULE_1__model_cost__["a" /* Cost */]();
            constRet.unit = c.unit;
            if (!c.growFactor.equals(1))
                constRet.basePrice = c.basePrice.times((c.growFactor.pow(action.quantity)).times((c.growFactor.pow(1)).minus(1))).div(c.growFactor.minus(1)).ceil();
            else
                constRet.basePrice = c.basePrice.times(1).ceil();
            return constRet;
        });
    };
    return PricePipePipe;
}());
PricePipePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'pricePipe'
    })
], PricePipePipe);

//# sourceMappingURL=price-pipe.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/prod-togle-pipe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProdToglePipePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProdToglePipePipe = (function () {
    function ProdToglePipePipe() {
    }
    ProdToglePipePipe.prototype.transform = function (value, args) {
        return value.filter(function (tp) { return tp.prods[0].unlocked; });
    };
    return ProdToglePipePipe;
}());
ProdToglePipePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'prodToglePipe'
    })
], ProdToglePipePipe);

//# sourceMappingURL=prod-togle-pipe.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/res-pipe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResPipePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ResPipePipe = (function () {
    function ResPipePipe() {
    }
    ResPipePipe.prototype.transform = function (value, args) {
        if (!args)
            return value.filter(function (i) { return i.unlocked; });
        else
            return value.filter(function (i) { return i.owned(); });
    };
    return ResPipePipe;
}());
ResPipePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'resPipe', pure: false })
], ResPipePipe);

//# sourceMappingURL=res-pipe.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/unit/unit.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-capitalize no-mg-top\">{{gen.name}}</h1>\n\n<div *ngIf=\"gen.isEnding()\">\n  <clr-alert [clrAlertType]=\"'alert-warning'\">\n    <div class=\"alert-item\">\n      <span class=\"alert-text\">\n        结束时间： {{endTime()}} \n      </span>\n    </div>\n  </clr-alert>\n</div>\n\n<p>{{gen.description}}</p>\n<!-- <span>Owned: {{gen.quantity | format}}</span> -->\n\n\n<div *ngIf=\"gen.produces.length >0\">\n  <p *ngIf=\"gen.buyAction\">你可以购买 {{gen.buyAction.quantity | format}} 次\n    <span *ngIf=\"gameService.game.research.up1.owned()\"> 获得 +{{gen.getBoost().times(100) | format}}% 生产加成</span>\n  </p>\n  <div *ngIf=\"!gen.alwaysOn\">\n    <input type=\"range\" min=\"0\" max=\"100\" [(ngModel)]=\"gen.percentage\" (change)=\"onChange($event.target.value)\">\n    <span>让 {{gen.percentage}} % 进行工作</span>\n  </div>\n</div>\n\n<div *ngIf=\"gen.showTables\">\n\n  <div class=\"row\">\n    <div *ngIf=\"gen.produces.length >0\" class=\"col-xs-12 col-md-12 col-lg-6 col-xl-6\">\n      <h5>\n        <span class=\"text-capitalize\">{{gen.name}}</span>生产：</h5>\n      <table class=\"table table-compact\">\n        <thead>\n          <tr>\n            <th class=\"w-33\">生产</th>\n            <th class=\"w-33\">1个</th>\n            <th class=\"w-33\">全部</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let item of gen.produces | filterActive\" [ngClass]=\"{'bg-warning': item.efficiency.lessThan(0)}\">\n            <td class=\"w-33 text-capitalize\">\n              <a [routerLink]=\"['/main/unit/unit/'+item.product.id]\">{{item.product.name}}</a>\n            </td>\n            <td class=\"w-33\">{{item.getprodPerSec(false) | format}}</td>\n            <td class=\"w-33\">{{item.getprodPerSec().times(gen.quantity) | format}}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div class=\"col-xs-12 col-md-12 col-lg-6 col-xl-6\" *ngIf=\"gameService.game.research.bi.owned()\">\n      <div *ngIf=\"showProducers()\">\n        <h5>\n          <span class=\"text-capitalize\">{{gen.name}}</span>产量来自：</h5>\n        <table class=\"table  table-compact\">\n          <thead>\n            <tr>\n              <th class=\"w-33\">单位</th>\n              <th class=\"w-33\">数量</th>\n              <th class=\"w-33\">总共</th>\n            </tr>\n          </thead>\n          <tfoot>\n            <tr class=\"bg-info text-white\">\n              <td>总共</td>\n              <td>{{gen.totalProducers | format}}</td>\n              <td>{{gen.totalPerSec | format}}</td>\n            </tr>\n          </tfoot>\n          <tbody>\n            <tr *ngFor=\"let item of gen.producedBy | filterActive; trackBy:getUnitId\" [ngClass]=\"{'bg-warning': item.efficiency.lessThan(0)}\">\n              <td class=\"text-capitalize\">\n                <a [routerLink]=\"['/main/unit/unit/'+item.unit.id]\">{{item.unit.name}}</a>\n              </td>\n              <td>{{item.unit.quantity | format}}</td>\n              <td>{{item.getprodPerSec().times(item.unit.quantity) | format}}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"row\" *ngIf=\"gen.togableProductions\">\n  <div class=\"col-xs-12 col-md-12 col-lg-12 col-xl-12\">\n    <section class=\"form-block\">\n      <div class=\"form-group\">\n        <ul class=\"list-unstyled\">\n          <li *ngFor=\"let tp of gen.togableProductions | prodToglePipe\">\n            <div class=\"toggle-switch\">\n              <input type=\"checkbox\" [(ngModel)]=\"tp.uiModel\" [id]=\"tp.description\" (ngModelChange)=\"tp.turnOnOff()\"\n                (change)=\"onChange($event.target.value)\">\n              <label [for]=\"tp.description\">{{tp.description}}</label>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </section>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"card-columns card-columns-2\">\n    <app-action [action]=\"act\" *ngFor=\"let act of gen.actions| filterMax; trackBy:getUnitId\"></app-action>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/unit/unit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "table {\n  margin-top: 12px; }\n\n.w-33 {\n  width: 33%; }\n\n.no-mg-top {\n  margin-top: 0px !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/unit/unit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_service__ = __webpack_require__("../../../../../src/app/game.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnitComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FilterUnlocked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FilterActive; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UnitComponent = (function () {
    function UnitComponent(gameService, route, activatedRoute, router) {
        this.gameService = gameService;
        this.route = route;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.mioId = "0";
        this.gen = this.gameService.game.baseWorld.littleAnt;
    }
    UnitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
            _this.mioId = params['id'];
            if (_this.mioId === undefined) {
                _this.mioId = "food";
            }
            _this.gen = _this.gameService.game.unitMap.get(_this.mioId);
            _this.gameService.game.activeUnit = _this.gen;
        });
    };
    UnitComponent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
        this.gameService.game.activeUnit = null;
    };
    UnitComponent.prototype.showProducers = function () {
        return this.gen.producedBy.filter(function (t) { return t.unlocked && t.unit.unlocked; }).length > 0;
    };
    UnitComponent.prototype.endTime = function () {
        __WEBPACK_IMPORTED_MODULE_4_moment__["locale"]('en');
        return __WEBPACK_IMPORTED_MODULE_4_moment__["duration"](this.gen.endIn).humanize();
    };
    UnitComponent.prototype.getUnitId = function (index, base) {
        return base.id;
    };
    UnitComponent.prototype.onChange = function (value) {
        this.gameService.game.isChanged = true;
    };
    return UnitComponent;
}());
UnitComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-unit',
        template: __webpack_require__("../../../../../src/app/unit/unit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/unit/unit.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _d || Object])
], UnitComponent);

var FilterUnlocked = (function () {
    function FilterUnlocked() {
    }
    FilterUnlocked.prototype.transform = function (items, filter) {
        return items.filter(function (item) { return item.unit.unlocked; });
    };
    return FilterUnlocked;
}());
FilterUnlocked = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'filterUnlocked', pure: false })
], FilterUnlocked);

var FilterActive = (function () {
    function FilterActive() {
    }
    FilterActive.prototype.transform = function (items, filter) {
        return items.filter(function (item) { return item.unlocked && item.unit.unlocked; });
    };
    return FilterActive;
}());
FilterActive = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'filterActive', pure: false })
], FilterActive);

var _a, _b, _c, _d;
//# sourceMappingURL=unit.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map