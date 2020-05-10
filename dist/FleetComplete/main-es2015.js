(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api-communicator.service.ts":
/*!*********************************************!*\
  !*** ./src/app/api-communicator.service.ts ***!
  \*********************************************/
/*! exports provided: ApiCommunicatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiCommunicatorService", function() { return ApiCommunicatorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-config.service */ "./src/app/app-config.service.ts");




class ApiCommunicatorService {
    constructor(http, appConfigService) {
        this.http = http;
        this.apiUrl = '';
        this.requestOptions = { observe: 'body', responseType: 'json' };
        this.apiUrl = appConfigService.apiBaseUrl;
    }
    getLastData(key) {
        return this.http.get(this.apiUrl + 'getLastData?json&key=' + encodeURIComponent(key));
    }
    getRawData(apiKey, object, date) {
        date = new Date(date);
        let currentTimeZoneDateStr = (date) => {
            var timeOffsetInMS = date.getTimezoneOffset() * 60000;
            date.setTime(date.getTime() - timeOffsetInMS);
            return date.toISOString().substring(0, 10);
        };
        const fromDate = currentTimeZoneDateStr(date);
        const toDate = currentTimeZoneDateStr(new Date(date.setDate(date.getDate() + 1)));
        const paramsObj = {
            key: apiKey,
            begTimestamp: fromDate,
            endTimestamp: toDate,
            objectId: object
        };
        // Not very efficient way of putting together string, but the object is small enough.
        const requestParams = Object.keys(paramsObj).map((akey) => {
            return encodeURIComponent(akey) + '=' + encodeURIComponent(paramsObj[akey]);
        }).join('&');
        const url = this.apiUrl + 'getRawData?json&' + requestParams;
        return this.http.get(url);
    }
}
ApiCommunicatorService.ɵfac = function ApiCommunicatorService_Factory(t) { return new (t || ApiCommunicatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_app_config_service__WEBPACK_IMPORTED_MODULE_2__["AppConfigService"])); };
ApiCommunicatorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ApiCommunicatorService, factory: ApiCommunicatorService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApiCommunicatorService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _app_config_service__WEBPACK_IMPORTED_MODULE_2__["AppConfigService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app-config.service.ts":
/*!***************************************!*\
  !*** ./src/app/app-config.service.ts ***!
  \***************************************/
/*! exports provided: AppConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigService", function() { return AppConfigService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");



class AppConfigService {
    constructor(http) {
        this.http = http;
    }
    loadAppConfig() {
        let href = '';
        let base = document.querySelector("base");
        if (base !== null)
            href = base.href;
        return this.http.get(href + 'assets/config.json')
            .toPromise()
            .then(data => {
            this.appConfig = data;
        });
    }
    // This is an example property ... you can make it however you want.
    get apiBaseUrl() {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.apiBaseUrl;
    }
}
AppConfigService.ɵfac = function AppConfigService_Factory(t) { return new (t || AppConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
AppConfigService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AppConfigService, factory: AppConfigService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppConfigService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _api_communicator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-communicator.service */ "./src/app/api-communicator.service.ts");
/* harmony import */ var _map_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map-data.service */ "./src/app/map-data.service.ts");




var I18N_0;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    /**
     * @meaning api key input
     */ 
    const MSG_EXTERNAL_7564295230690335689$$SRC_APP_APP_COMPONENT_TS_1 = goog.getMsg("Enter API key");
    I18N_0 = MSG_EXTERNAL_7564295230690335689$$SRC_APP_APP_COMPONENT_TS_1;
}
else {
    I18N_0 = $localize `:api key input|␟4ddbe9393ac28f49291cdc22b6f01549fbcfc9ae␟7564295230690335689:Enter API key`;
}
var I18N_2;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    /**
     * @desc  Make API key request
     * @meaning api key go
     */ 
    const MSG_EXTERNAL_8834591005766404696$$SRC_APP_APP_COMPONENT_TS_3 = goog.getMsg("Go");
    I18N_2 = MSG_EXTERNAL_8834591005766404696$$SRC_APP_APP_COMPONENT_TS_3;
}
else {
    I18N_2 = $localize `:api key go| Make API key request␟505d1fcfc817efbcb44ee5eea2ae530f757ca597␟8834591005766404696:Go`;
}
var I18N_4;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    /**
     * @desc  Toolbar welcome message
     * @meaning header message
     */ 
    const MSG_EXTERNAL_443211642529308504$$SRC_APP_APP_COMPONENT_TS_5 = goog.getMsg("Fleet Complete API tester");
    I18N_4 = MSG_EXTERNAL_443211642529308504$$SRC_APP_APP_COMPONENT_TS_5;
}
else {
    I18N_4 = $localize `:header message| Toolbar welcome message␟7a50ecb8cb6900fad47bf5a30d6e905fdf556faa␟443211642529308504:Fleet Complete API tester`;
}
var I18N_6;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_8953033926734869941$$SRC_APP_APP_COMPONENT_TS_7 = goog.getMsg("Name");
    I18N_6 = MSG_EXTERNAL_8953033926734869941$$SRC_APP_APP_COMPONENT_TS_7;
}
else {
    I18N_6 = $localize `:␟cff1428d10d59d14e45edec3c735a27b5482db59␟8953033926734869941:Name`;
}
var I18N_8;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_3128293408739574$$SRC_APP_APP_COMPONENT_TS_9 = goog.getMsg("Speed");
    I18N_8 = MSG_EXTERNAL_3128293408739574$$SRC_APP_APP_COMPONENT_TS_9;
}
else {
    I18N_8 = $localize `:␟c65e59841c2de7dba204ee5ecf7cc682e65f2488␟3128293408739574:Speed`;
}
var I18N_10;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_1225956843096417360$$SRC_APP_APP_COMPONENT_TS_11 = goog.getMsg("Last Update");
    I18N_10 = MSG_EXTERNAL_1225956843096417360$$SRC_APP_APP_COMPONENT_TS_11;
}
else {
    I18N_10 = $localize `:␟e95f8bae592e0cf2234f405c73e10eb89e37d93a␟1225956843096417360:Last Update`;
}
var I18N_12;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_3973931101896534797$$SRC_APP_APP_COMPONENT_TS_13 = goog.getMsg("Date");
    I18N_12 = MSG_EXTERNAL_3973931101896534797$$SRC_APP_APP_COMPONENT_TS_13;
}
else {
    I18N_12 = $localize `:␟2f933b826a570836cab04f683970a2d22068458c␟3973931101896534797:Date`;
}
var I18N_14;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    /**
     * @desc  Request detailed Vehicle info
     * @meaning vehicle key go
     */ 
    const MSG_EXTERNAL_1443581651736710687$$SRC_APP_APP_COMPONENT_TS_15 = goog.getMsg("Go");
    I18N_14 = MSG_EXTERNAL_1443581651736710687$$SRC_APP_APP_COMPONENT_TS_15;
}
else {
    I18N_14 = $localize `:vehicle key go| Request detailed Vehicle info␟51e983e4ad860be6f0d7a1f44e69799ac766747b␟1443581651736710687:Go`;
}
var I18N_16;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_2077332686404300845$$SRC_APP_APP_COMPONENT_TS_17 = goog.getMsg("Total Distance");
    I18N_16 = MSG_EXTERNAL_2077332686404300845$$SRC_APP_APP_COMPONENT_TS_17;
}
else {
    I18N_16 = $localize `:␟0579ac8d6885487dfd82876b4e775456f2fc8cf9␟2077332686404300845:Total Distance`;
}
var I18N_18;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_5339320158906330401$$SRC_APP_APP_COMPONENT_TS_19 = goog.getMsg("Number of Stops");
    I18N_18 = MSG_EXTERNAL_5339320158906330401$$SRC_APP_APP_COMPONENT_TS_19;
}
else {
    I18N_18 = $localize `:␟65d48581bbf0f7860d6c81fa78a343c6a1e47f19␟5339320158906330401:Number of Stops`;
}
var I18N_20;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_1788836410319994371$$SRC_APP_APP_COMPONENT_TS_21 = goog.getMsg("Calculated Distance");
    I18N_20 = MSG_EXTERNAL_1788836410319994371$$SRC_APP_APP_COMPONENT_TS_21;
}
else {
    I18N_20 = $localize `:␟7856ebd654047dd3d341200e6f8d85b27c98506d␟1788836410319994371:Calculated Distance`;
}
const _c22 = function (a0) { return { "active": a0 }; };
function AppComponent_tr_31_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_tr_31_Template_tr_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const vel_r9 = ctx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.chooseVehicle(vel_r9.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "timeAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vel_r9 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c22, ctx_r1.activeVehicle == vel_r9.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](vel_r9.value.objectName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](vel_r9.value.speed);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 4, vel_r9.value.timestamp));
} }
var I18N_23;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    const MSG_EXTERNAL_1846483994472652446$$SRC_APP_APP_COMPONENT_TS__24 = goog.getMsg("(No vehicles found)");
    I18N_23 = MSG_EXTERNAL_1846483994472652446$$SRC_APP_APP_COMPONENT_TS__24;
}
else {
    I18N_23 = $localize `:␟e8dc34b9848a2e914698037efeaf66c5c08c5ee3␟1846483994472652446:(No vehicles found)`;
}
function AppComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](2, I18N_23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_app_loading_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-loading", 34);
} }
var I18N_25;
if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
    /**
     * @desc kilometer
     */ 
    const MSG_EXTERNAL_6044256456943348938$$SRC_APP_APP_COMPONENT_TS__26 = goog.getMsg("km");
    I18N_25 = MSG_EXTERNAL_6044256456943348938$$SRC_APP_APP_COMPONENT_TS__26;
}
else {
    I18N_25 = $localize `:kilometer␟6105d08b21c8d7d8af97187fc1cf2b1dc4a153e3␟6044256456943348938:km`;
}
function AppComponent_span_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](1, I18N_25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_app_loading_62_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-loading");
} }
function AppComponent_span_63_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span");
} }
function AppComponent_span_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span");
} }
function AppComponent_span_65_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "km");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(apiService, mapDataService) {
        this.apiService = apiService;
        this.mapDataService = mapDataService;
        this.title = 'FleetComplete';
        this.apiKey = '';
        this.vehicleList = new Map();
        this.activeVehicle = null;
        this.activeFetch = false;
        this.activeFetchLoop = null;
        this.objectDateFilter = new Date();
        this.stopTimeThreshold = 120000;
        this.stopAllowedDistance = 0.008;
        this.objectDisplayInfo = {
            activeObjectStops: [],
            traveledDistance: null,
            calcDistance: "",
        };
        mapDataService.distanceCalculated$.subscribe((dist) => {
            this.objectDisplayInfo.calcDistance = dist;
        });
    }
    fetchListFromApi() {
        this.apiService.getLastData(this.apiKey).subscribe((res) => {
            if (this.activeFetch === true)
                return;
            const response = res.response;
            for (const item of response) {
                if (this.vehicleList.get(item.objectId)) {
                    this.vehicleList.set(item.objectId, item);
                }
            }
            this.mapDataService.positionVehicles(this.vehicleList);
        }, (error) => {
            console.error(error);
        });
    }
    fetchUnits(akey) {
        if (this.activeFetch === true) {
            return;
        }
        if (this.activeFetchLoop !== null)
            clearInterval(this.activeFetchLoop);
        this.apiKey = akey;
        this.mapDataService.clearVehicles();
        this.clearVehicleInfo();
        this.activeVehicle = null;
        this.vehicleList = new Map();
        if (this.apiKey !== '') {
            this.activeFetch = true;
            this.apiService.getLastData(this.apiKey).subscribe((res) => {
                this.activeFetch = false;
                const response = res.response;
                for (const item of response) {
                    item.timestampDate = new Date(item.timestamp);
                    this.vehicleList.set(item.objectId, item);
                }
                this.mapDataService.positionVehicles(this.vehicleList);
                let fetchList = this.fetchListFromApi;
                let context = this;
                this.activeFetchLoop = setInterval(function () {
                    fetchList.call(context);
                }, 30000);
            }, (error) => {
                this.activeFetch = false;
                this.apiKey == '';
                console.error(error);
            });
        }
    }
    chooseVehicle(v) {
        if (this.activeVehicle !== null && this.activeVehicle.objectId !== v.objectId) {
            this.clearVehicleInfo();
        }
        this.activeVehicle = v;
        this.mapDataService.activateVehicle(v);
    }
    objectDateChanged(date) {
        this.objectDateFilter = date;
    }
    clearVehicleInfo() {
        // tslint:disable-next-line:forin
        for (const k in this.objectDisplayInfo) {
            this.objectDisplayInfo[k] = '';
        }
        this.mapDataService.clearVehicleTracks();
    }
    calcDistance() {
        this.clearVehicleInfo();
        if (this.activeVehicle) {
            this.activeFetch = true;
            this.activeObjectList = [];
            this.apiService.getRawData(this.apiKey, this.activeVehicle.objectId, this.objectDateFilter).subscribe((res) => {
                this.activeFetch = false;
                this.objectDisplayInfo.calcDistance = null;
                this.activeObjectList = [];
                const stops = [];
                const response = res.response;
                if (response.length > 0) {
                    let previousTime = new Date(response[0].timestamp);
                    let previousDistance = -1;
                    let previousStopDistance = -1;
                    let num = 0;
                    let totalT = 0;
                    for (const item of response) {
                        if (item.timestamp === undefined)
                            continue;
                        item.timestampDate = new Date(item.timestamp);
                        if (item.Distance === undefined) {
                            if (item.DeltaDistance === undefined || item.DeltaDistance === null) {
                                continue;
                            }
                            totalT += item.DeltaDistance;
                            item.Distance = totalT;
                        }
                        else {
                            if (previousDistance === item.Distance) {
                                continue;
                            }
                        }
                        // if time difference between movements is over x minutes
                        if (item.timestampDate.valueOf() - previousTime.valueOf() > this.stopTimeThreshold && item.Distance - previousStopDistance > this.stopAllowedDistance) {
                            stops.push(num);
                            previousStopDistance = item.Distance;
                        }
                        num++;
                        this.activeObjectList.push(item);
                        previousDistance = item.Distance;
                        previousTime = item.timestampDate;
                    }
                    if (this.activeObjectList.length > 0) {
                        this.objectDisplayInfo.activeObjectStops = stops;
                        this.objectDisplayInfo.traveledDistance =
                            (this.activeObjectList[this.activeObjectList.length - 1].Distance - this.activeObjectList[0].Distance).toFixed(2);
                    }
                    else {
                        if (totalT > 0)
                            this.objectDisplayInfo.traveledDistance = totalT.toFixed(2);
                    }
                }
                this.mapDataService.addVehicleTracks(this.activeObjectList, stops);
            }, error => {
                this.activeFetch = false;
                console.error(error);
            });
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_api_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicatorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_map_data_service__WEBPACK_IMPORTED_MODULE_2__["MapDataService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 68, vars: 14, consts: [["role", "banner", 1, "toolbar"], [1, "fc-container"], [1, "api-key-cont"], ["for", "fc-api-key"], ["id", "fc-api-key", "type", "text"], ["typedKey", ""], [1, "fc-button", 3, "click"], [1, "spacer"], [1, "rocket-back"], ["id", "rocket-smoke", "alt", "Rocket Ship Smoke", "xmlns", "http://www.w3.org/2000/svg", "width", "516.119", "height", "1083.632", "viewBox", "0 100 426.119 943.632"], ["id", "Path_40", "data-name", "Path 40", "d", "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z", "transform", "translate(-147.025 -140.939)", "fill", "#f5f5f5"], ["id", "rocket-smoke2", "alt", "Rocket Ship Smoke", "xmlns", "http://www.w3.org/2000/svg", "width", "516.119", "height", "1083.632", "viewBox", "0 100 426.119 943.632"], ["id", "Path_40", "data-name", "Path 40", "d", "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z", "transform", "translate(-147.025 -140.939)", "fill", "#f0f3f6"], ["role", "main", 1, "content", "fc-container"], [1, "main-panel"], [1, "list-view"], [1, "vhl-list"], [1, "tx-left"], [1, "tx-right"], [3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["class", "msg-not", "style", "margin-top: 10vh", 4, "ngIf"], ["style", "margin-top: 10vh", 4, "ngIf"], [1, "trip-calc"], [1, "date-filter-row"], [3, "dateChanged"], [1, "fc-button", 3, "disabled", "click"], [1, "trip-info"], [4, "ngIf"], [2, "display", "inline-block", 3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["id", "map", 1, "map-view"], [3, "ngClass", "click"], [1, "msg-not", 2, "margin-top", "10vh"], [2, "margin-top", "10vh"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](4, I18N_0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6); return ctx.fetchUnits(_r0.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](8, I18N_2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](11, I18N_4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "svg", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "path", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "svg", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "path", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "th", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](25, I18N_6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "th", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](27, I18N_8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "th", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](29, I18N_10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, AppComponent_tr_31_Template, 8, 8, "tr", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](32, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, AppComponent_div_33_Template, 3, 0, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, AppComponent_app_loading_34_Template, 1, 0, "app-loading", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](38, I18N_12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "app-date-picker-past", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dateChanged", function AppComponent_Template_app_date_picker_past_dateChanged_39_listener($event) { return ctx.objectDateChanged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_40_listener() { return ctx.calcDistance(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](41, I18N_14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](47, I18N_16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "td", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, AppComponent_span_50_Template, 2, 0, "span", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](53, I18N_18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "td", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](58, I18N_20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "td", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](62, AppComponent_app_loading_62_Template, 1, 0, "app-loading", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](63, AppComponent_span_63_Template, 1, 0, "span", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](64, AppComponent_span_64_Template, 1, 0, "span", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](65, AppComponent_span_65_Template, 2, 0, "span", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "app-google-map-ext");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](32, 12, ctx.vehicleList));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.vehicleList.size === 0 && ctx.activeFetch === false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.activeFetch === true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.activeVehicle === null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.objectDisplayInfo.traveledDistance, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.objectDisplayInfo.traveledDistance !== null && ctx.objectDisplayInfo.traveledDistance !== "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.objectDisplayInfo.activeObjectStops.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.objectDisplayInfo.calcDistance, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.objectDisplayInfo.calcDistance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "-");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */", "[_nghost-%COMP%] {\n    font-family: -apple-system, Gotham, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .tx-left[_ngcontent-%COMP%]{\n    text-align: left;\n  }\n  .tx-right[_ngcontent-%COMP%]{\n    text-align: right;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .msg-not[_ngcontent-%COMP%]{\n    color: #686868;\n    font-size: 12px;\n    font-style: italic;\n    text-align: center;\n  }\n\n  .fc-container[_ngcontent-%COMP%]{\n    max-width: 1480px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    background-color: #FFFFFF;\n    color: #080808;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   .fc-container[_ngcontent-%COMP%]{\n    display: flex;\n    align-items: center;\n    height: 100%;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   .api-key-cont[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{\n    margin-right: 6px;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    flex-direction: column;\n    align-items: center;\n    //background-color: #095991;\n    //color: #FFFFFF;\n  }\n\n  div.rocket-back[_ngcontent-%COMP%]{\n    position: fixed;\n    top: 0;\n    left: 10%;\n    height: 96vh;\n    overflow: hidden;\n    z-index: -8;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: 120vh;\n    position: relative;\n    top: 0;\n    left: 10%;\n    z-index: -10;\n    transform: rotate(10deg);\n  }\n  svg#rocket-smoke2[_ngcontent-%COMP%] {\n    height: 120vh;\n    position: absolute;\n    top: 0;\n    left: 12%;\n    z-index: -20;\n    transform: rotate(10deg);\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  button.fc-button[_ngcontent-%COMP%] {\n    background: #3672A5;\n    border: 1px solid #0C5690;\n    color: #ffffff;\n    font-weight: 500;\n    padding: 6px 6px;\n    min-width: 62px;\n    border-radius: 3px;\n    outline:none;\n  }\n  button.fc-button[_ngcontent-%COMP%]:hover{\n    cursor: pointer;\n  }\n  button.fc-button[_ngcontent-%COMP%]:focus {\n    border: 1px dashed #0ca9fa;\n    outline:none;\n    text-decoration: none;\n  }\n\n  button.fc-button[_ngcontent-%COMP%]:disabled{\n    opacity: 0.7;\n  }\n  button.fc-button[_ngcontent-%COMP%]:disabled:hover{\n    cursor: not-allowed;\n  }\n\n  .main-panel[_ngcontent-%COMP%]{\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    width: 100%;\n  }\n\n  .main-panel[_ngcontent-%COMP%] > .list-view[_ngcontent-%COMP%]{\n    max-width: 400px;\n    min-width: 240px;\n    width: 20vw;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n  }\n  .main-panel[_ngcontent-%COMP%] > .list-view[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{\n    background-color: rgba(128,128,128,0.1);\n  }\n\n  .main-panel[_ngcontent-%COMP%]   .vhl-list[_ngcontent-%COMP%]{\n    height: 240px;\n    height: 40vh;\n    min-height: 200px;\n    position: relative;\n    overflow-y: auto;\n    margin-bottom: 12px;\n  }\n  .main-panel[_ngcontent-%COMP%]   .list-view[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{\n    width: 100%;\n  }\n  .main-panel[_ngcontent-%COMP%]   .list-view[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .main-panel[_ngcontent-%COMP%]   .list-view[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\n    padding: 6px 4px;\n  }\n  .main-panel[_ngcontent-%COMP%]   .list-view[_ngcontent-%COMP%]{\n    position: relative;\n  }\n  .main-panel[_ngcontent-%COMP%]   .list-view[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:first-child{\n    position: sticky;\n    top: 0;\n    background-color: #f2f2f2;\n  }\n\n\n\n  .main-panel[_ngcontent-%COMP%]   .vhl-list[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{\n    cursor: pointer;\n  }\n  .main-panel[_ngcontent-%COMP%]   .list-view[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd){\n    background-color: rgba(0,0,0,0.2);\n  }\n  .main-panel[_ngcontent-%COMP%]   .vhl-list[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.active[_ngcontent-%COMP%]{\n    font-weight: 500;\n  }\n\n  .main-panel[_ngcontent-%COMP%]   .trip-calc[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    margin-top: 12px;\n  }\n  .main-panel[_ngcontent-%COMP%]   .trip-calc[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\n    padding: 8px 6px;\n  }\n  .main-panel[_ngcontent-%COMP%]   .trip-calc[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2){\n    min-width: 42px;\n  }\n\n  .main-panel[_ngcontent-%COMP%]   .trip-calc[_ngcontent-%COMP%]{\n    height: 240px;\n    height: 20vh;\n    min-height: 180px;\n    position: relative;\n    overflow: hidden;\n  }\n\n  #map[_ngcontent-%COMP%]{\n    width: 100%;\n    max-width: 1080px;\n  }\n\n  .main-panel[_ngcontent-%COMP%]   .date-filter-row[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{\n    margin-right: 6px;\n  }\n  .main-panel[_ngcontent-%COMP%]   .date-filter-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{\n    max-width: 120px;\n  }\n\n  @media screen and (max-width: 1420px) {\n    #map[_ngcontent-%COMP%]{\n      width: 100%;\n      max-width: 68vw;\n    }\n  }\n\n  @media screen and (max-width: 900px) {\n    #map[_ngcontent-%COMP%]{\n      width: 100%;\n      max-width: 98vw;\n    }\n    .main-panel[_ngcontent-%COMP%]{\n      align-items: center;\n      justify-content: center;\n    }\n    .main-panel[_ngcontent-%COMP%] > .list-view[_ngcontent-%COMP%]{\n      width: 98vw;\n    }\n  }\n\n\n  @media screen and (max-width: 767px) {\n\n    svg#rocket-smoke2[_ngcontent-%COMP%] {\n      right: 130px;\n    }\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke2[_ngcontent-%COMP%], svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css'],
            }]
    }], function () { return [{ type: _api_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicatorService"] }, { type: _map_data_service__WEBPACK_IMPORTED_MODULE_2__["MapDataService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/datepicker.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _components_date_picker_past_date_picker_past_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/date-picker-past/date-picker-past.component */ "./src/app/components/date-picker-past/date-picker-past.component.ts");
/* harmony import */ var _maps_maps_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./maps/maps.module */ "./src/app/maps/maps.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _time_ago_extends_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./time-ago-extends.pipe */ "./src/app/time-ago-extends.pipe.ts");
/* harmony import */ var _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/loading/loading.component */ "./src/app/components/loading/loading.component.ts");
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app-config.service */ "./src/app/app-config.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/scrolling.js");
/* harmony import */ var _maps_open_street_map_open_street_map_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./maps/open-street-map/open-street-map.component */ "./src/app/maps/open-street-map/open-street-map.component.ts");
/* harmony import */ var _maps_google_map_ext_google_map_ext_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./maps/google-map-ext/google-map-ext.component */ "./src/app/maps/google-map-ext/google-map-ext.component.ts");




















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
            multi: true,
            deps: [_app_config_service__WEBPACK_IMPORTED_MODULE_12__["AppConfigService"]],
            useFactory: (appConfigService) => {
                return () => {
                    //Make sure to return a promise!
                    return appConfigService.loadAppConfig();
                };
            }
        }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _maps_maps_module__WEBPACK_IMPORTED_MODULE_8__["MapsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _components_date_picker_past_date_picker_past_component__WEBPACK_IMPORTED_MODULE_7__["DatePickerPastComponent"],
        _time_ago_extends_pipe__WEBPACK_IMPORTED_MODULE_10__["TimeAgoExtendsPipe"],
        _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_11__["LoadingComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
        _maps_maps_module__WEBPACK_IMPORTED_MODULE_8__["MapsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _components_date_picker_past_date_picker_past_component__WEBPACK_IMPORTED_MODULE_7__["DatePickerPastComponent"],
                    _time_ago_extends_pipe__WEBPACK_IMPORTED_MODULE_10__["TimeAgoExtendsPipe"],
                    _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_11__["LoadingComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                    _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"],
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                    _maps_maps_module__WEBPACK_IMPORTED_MODULE_8__["MapsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                ],
                providers: [
                    {
                        provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
                        multi: true,
                        deps: [_app_config_service__WEBPACK_IMPORTED_MODULE_12__["AppConfigService"]],
                        useFactory: (appConfigService) => {
                            return () => {
                                //Make sure to return a promise!
                                return appConfigService.loadAppConfig();
                            };
                        }
                    }
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();
_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetComponentScope"](_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgComponentOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgTemplateOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgSwitchDefault"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgPlural"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgPluralCase"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_14__["CdkScrollable"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatCalendar"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatCalendarBody"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepicker"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerContent"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerInput"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerToggle"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerToggleIcon"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatMonthView"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatYearView"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatMultiYearView"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__["MatCalendarHeader"], _maps_open_street_map_open_street_map_component__WEBPACK_IMPORTED_MODULE_15__["OpenStreetMapComponent"], _maps_google_map_ext_google_map_ext_component__WEBPACK_IMPORTED_MODULE_16__["GoogleMapExtComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["RangeValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["SelectMultipleControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["RadioControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["MinLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["PatternValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["CheckboxRequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["EmailValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControlDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroupName"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormArrayName"], _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
    _components_date_picker_past_date_picker_past_component__WEBPACK_IMPORTED_MODULE_7__["DatePickerPastComponent"],
    _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_11__["LoadingComponent"]], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["UpperCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["LowerCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["SlicePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["DecimalPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["PercentPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["TitleCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["CurrencyPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["I18nPluralPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["I18nSelectPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["KeyValuePipe"], _time_ago_extends_pipe__WEBPACK_IMPORTED_MODULE_10__["TimeAgoExtendsPipe"]]);


/***/ }),

/***/ "./src/app/components/date-picker-past/date-picker-past.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/date-picker-past/date-picker-past.component.ts ***!
  \***************************************************************************/
/*! exports provided: DatePickerPastComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatePickerPastComponent", function() { return DatePickerPastComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/datepicker.js");





class DatePickerPastComponent {
    constructor() {
        this.dateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.maxDate = new Date();
        this.selectedDate = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.maxDate);
        this.dateChanged.emit(this.selectedDate.value);
    }
    dateChange() {
        this.dateChanged.emit(this.selectedDate.value);
    }
    ngOnInit() {
    }
}
DatePickerPastComponent.ɵfac = function DatePickerPastComponent_Factory(t) { return new (t || DatePickerPastComponent)(); };
DatePickerPastComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DatePickerPastComponent, selectors: [["app-date-picker-past"]], outputs: { dateChanged: "dateChanged" }, decls: 4, vars: 4, consts: [[3, "matDatepicker", "max", "formControl", "dateChange"], [3, "for"], ["vehicleDatepicker", ""]], template: function DatePickerPastComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dateChange", function DatePickerPastComponent_Template_input_dateChange_0_listener() { return ctx.dateChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-datepicker-toggle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-datepicker", null, 2);
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matDatepicker", _r0)("max", ctx.maxDate)("formControl", ctx.selectedDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("for", _r0);
    } }, directives: [_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerToggle"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__["MatDatepicker"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGF0ZS1waWNrZXItcGFzdC9kYXRlLXBpY2tlci1wYXN0LmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DatePickerPastComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-date-picker-past',
                templateUrl: './date-picker-past.component.html',
                styleUrls: ['./date-picker-past.component.css']
            }]
    }], function () { return []; }, { dateChanged: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/components/loading/loading.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/loading/loading.component.ts ***!
  \*********************************************************/
/*! exports provided: LoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingComponent", function() { return LoadingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class LoadingComponent {
    constructor() { }
    ngOnInit() {
    }
}
LoadingComponent.ɵfac = function LoadingComponent_Factory(t) { return new (t || LoadingComponent)(); };
LoadingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoadingComponent, selectors: [["app-loading"]], decls: 7, vars: 0, consts: [[1, "loading"], [1, "d"], [1, "d", "d-2"], [1, "d", "d-3"]], template: function LoadingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC5jc3MifQ== */", "[_nghost-%COMP%] {\n    transition: opacity .4s;\n  }\n  .hide-in-proc[_nghost-%COMP%] {\n    transition: opacity .4s;\n    opacity: 0;\n  }\n  span.loading[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 16px;\n    color: #868686;\n    font-size: 2.5em;\n    text-shadow: 2px 2px 10px rgba(0,0,0,0.2);\n  }\n  body[_ngcontent-%COMP%] {\n    margin: 0;\n    padding: 0;\n  }\n\n  @keyframes dots {\n    50% {\n      transform: translateY(-.4rem);\n    }\n    100% {\n      transform: translateY(0);\n    }\n  }\n\n  .d[_ngcontent-%COMP%] {\n    animation: dots 1.5s ease-out infinite;\n  }\n  .d-2[_ngcontent-%COMP%] {\n    animation-delay: .5s;\n  }\n  .d-3[_ngcontent-%COMP%] {\n    animation-delay: 1s;\n  }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-loading',
                templateUrl: './loading.component.html',
                styleUrls: ['./loading.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/map-data.service.ts":
/*!*************************************!*\
  !*** ./src/app/map-data.service.ts ***!
  \*************************************/
/*! exports provided: MapDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapDataService", function() { return MapDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



/*
 Service that communicates with Maps API
*/
class MapDataService {
    constructor() {
        // Observable string sources
        this.vehiclePositionSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.vehiclesClearedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.activeVehicleSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.vehicleTrackSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.vehicleTrackClearSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.calculatedDistanceSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        // Observable string streams
        this.vehiclesPositioned$ = this.vehiclePositionSource.asObservable();
        this.vehiclesCleared$ = this.vehiclesClearedSource.asObservable();
        this.vehiclesActivated$ = this.activeVehicleSource.asObservable();
        this.vehicleTrack$ = this.vehicleTrackSource.asObservable();
        this.vehicleTracksCleared$ = this.vehicleTrackClearSource.asObservable();
        this.distanceCalculated$ = this.calculatedDistanceSource.asObservable();
    }
    // Service message commands
    positionVehicles(vehicles) {
        this.vehiclePositionSource.next(vehicles);
    }
    clearVehicles() {
        this.vehiclesClearedSource.next();
    }
    activateVehicle(vehicle) {
        this.activeVehicleSource.next(vehicle);
    }
    addVehicleTracks(positions, stops) {
        this.vehicleTrackSource.next([positions, stops]);
    }
    clearVehicleTracks() {
        this.vehicleTrackClearSource.next();
    }
    sendCalculatedDistance(dist) {
        this.calculatedDistanceSource.next(dist);
    }
}
MapDataService.ɵfac = function MapDataService_Factory(t) { return new (t || MapDataService)(); };
MapDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MapDataService, factory: MapDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MapDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/maps/google-map-ext/google-map-ext.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/maps/google-map-ext/google-map-ext.component.ts ***!
  \*****************************************************************/
/*! exports provided: GoogleMapExtComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleMapExtComponent", function() { return GoogleMapExtComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/google-maps */ "./node_modules/@angular/google-maps/__ivy_ngcc__/fesm2015/google-maps.js");
/* harmony import */ var _google_markerclustererplus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @google/markerclustererplus */ "./node_modules/@google/markerclustererplus/dist/markerclustererplus.esm.js");
/* harmony import */ var _map_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../map-data.service */ "./src/app/map-data.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");







const _c0 = ["map"];
function GoogleMapExtComponent_map_marker_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "map-marker", 4);
} if (rf & 2) {
    const marker_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("position", marker_r4.value.position)("label", marker_r4.value.label)("title", marker_r4.value.title)("options", marker_r4.value.options);
} }
function GoogleMapExtComponent_map_marker_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "map-marker", 4);
} if (rf & 2) {
    const marker_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("position", marker_r5.position)("label", marker_r5.label)("title", marker_r5.title)("options", marker_r5.options);
} }
function GoogleMapExtComponent_map_polyline_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "map-polyline", 5);
} if (rf & 2) {
    const poly_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("path", poly_r6.path);
} }
class GoogleMapExtComponent {
    constructor(mapData, differs) {
        this.mapData = mapData;
        this.differs = differs;
        this.markers = new Map();
        this.stopMarkers = [];
        this.markerCluster = null;
        this.polylines = [];
        this.distService = {
            matInstance: new google.maps.DistanceMatrixService(),
            routeInstance: new google.maps.DirectionsService(),
            distServiceCount: 0
        };
        this.zoom = 12;
        this.subscription = {
            addVehicles: null,
            clearVehicles: null,
            activateVehicle: null,
            addVehicleTrack: null,
            clearVehicleTrack: null,
            markerChanges: null,
        };
        this.center = {
            lat: 58.370568,
            lng: 26.715893,
        };
        this.markerDiffer = this.differs.find([]).create(null);
        this.subscription.addVehicles = mapData.vehiclesPositioned$.subscribe(vehs => {
            for (const v of vehs) {
                this.addMarker(v[1].objectName, [v[1].latitude, v[1].longitude]);
            }
        });
        this.subscription.clearVehicles = mapData.vehiclesCleared$.subscribe(() => {
            if (this.markerCluster !== null) {
                this.markerCluster.clearMarkers();
            }
            this.markers = new Map();
            this.stopMarkers = [];
        });
        this.subscription.addVehicles = mapData.vehicleTrack$.subscribe(tracks => {
            this.addPolyline(tracks[0], tracks[1]);
        });
        this.subscription.clearVehicleTrack = mapData.vehicleTracksCleared$.subscribe(() => {
            this.polylines = [];
            this.stopMarkers = [];
        });
        this.subscription.activateVehicle = mapData.vehiclesActivated$.subscribe((veh) => {
            this.center = {
                lat: veh.latitude,
                lng: veh.longitude,
            };
        });
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.markerCluster = new _google_markerclustererplus__WEBPACK_IMPORTED_MODULE_2__["default"](this.map._googleMap, [], { imagePath: 'assets/img/maps_cluster/m', imageExtension: 'png' });
        this.subscription.markerChanges = this.markerElements.changes.subscribe(tracks => {
            const changeDiff = this.markerDiffer.diff(tracks);
            if (changeDiff) {
                changeDiff.forEachAddedItem((change) => {
                    const marker = change.item._marker;
                    if (marker.getTitle() === '') {
                        return;
                    }
                    this.markerCluster.addMarker(marker);
                });
                changeDiff.forEachRemovedItem((change) => {
                    const marker = change.item._marker;
                    if (marker.getTitle() === '') {
                        return;
                    }
                    this.markerCluster.removeMarker(marker);
                });
            }
        });
    }
    ngOnDestroy() {
        // tslint:disable-next-line:forin
        for (const s in this.subscription) {
            if (this.subscription[s] === null) {
                continue;
            }
            this.subscription[s].unsubscribe();
        }
    }
    addMarker(label, position) {
        let exist = this.markers.get(label);
        if (exist) {
            exist.position = {
                lat: position[0],
                lng: position[1],
            };
            return;
        }
        this.markers.set(label, {
            position: {
                lat: position[0],
                lng: position[1],
            },
            label: {
                color: '#080808',
                text: label,
                fontWeight: '500'
            },
            title: label,
            options: { animation: google.maps.Animation.DROP }
        });
    }
    addPolyline(tracks, stops) {
        const coords = [];
        for (const pos of tracks) {
            coords.push({
                lat: pos.Latitude,
                lng: pos.Longitude,
            });
        }
        const waypoints = [];
        if (stops.length > 0) {
            waypoints.push(new google.maps.LatLng(coords[0]));
        }
        const bounds = new google.maps.LatLngBounds();
        for (const s of stops) {
            this.stopMarkers.push({
                position: coords[s],
                title: '',
                options: { icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 4
                    } }
            });
            bounds.extend(coords[s]);
            waypoints.push(new google.maps.LatLng(coords[s]));
        }
        if (stops.length > 0) {
            if (stops.length > 1) {
                this.map._googleMap.fitBounds(bounds);
            }
            else {
                this.center = coords[stops[0]];
            }
            const lw = waypoints[waypoints.length - 1];
            const lc = coords[coords.length - 1];
            if (lw.lat() !== lc.lat || lw.lng() !== lc.lng) {
                waypoints.push(new google.maps.LatLng(lc));
            }
        }
        this.polylines.push({
            path: coords
        });
        if (coords.length > 0) {
            this.requestOptimalRouteByRoute(waypoints);
        }
        else {
            this.mapData.sendCalculatedDistance("-");
        }
    }
    requestOptimalRouteByRoute(waypoints) {
        let wayPointChuncks = [];
        let distlen = 10;
        let c = 0;
        let chunk = {
            origin: null,
            destination: null,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: []
        };
        distlen += 2;
        for (let i = 0; i < waypoints.length; i++) {
            c++;
            switch (c) {
                case 1:
                    chunk.origin = waypoints[i];
                    break;
                case distlen:
                    chunk.destination = waypoints[i];
                    wayPointChuncks.push(chunk);
                    chunk = {
                        origin: null,
                        destination: null,
                        travelMode: google.maps.TravelMode.DRIVING,
                        waypoints: []
                    };
                    c = 0;
                    i--;
                    break;
                default:
                    // @ts-ignore
                    chunk.waypoints.push({ location: waypoints[i], stopover: true });
            }
        }
        if (chunk.waypoints.length > 0) {
            let end = chunk.waypoints.pop();
            chunk.destination = end.location;
            wayPointChuncks.push(chunk);
        }
        let reqD = {
            req: this.distService.routeInstance.route,
            statuses: google.maps.DirectionsStatus,
            calcDistance: function (response) {
                let distance = 0;
                for (const leg of response.routes[0].legs) {
                    if (leg.distance !== undefined) {
                        distance += leg.distance.value;
                    }
                    else {
                        return null;
                    }
                }
                return distance;
            }
        };
        this.processWayPointChunks(wayPointChuncks, reqD);
    }
    // Try the matrix request. sends less data, but slower since needs to request every distance separately.
    requestOptimalRouteByMatrix(waypoints) {
        const dest = waypoints.slice(1);
        waypoints.pop();
        let wayPointChuncks = [];
        let distlen = 1;
        let j = 0;
        let c = 0;
        let chunk = {
            origins: [],
            destinations: [],
            travelMode: google.maps.TravelMode.DRIVING
        };
        for (let i = 1; i < waypoints.length; i++, j++) {
            // @ts-ignore
            chunk.origins.push(waypoints[j]);
            // @ts-ignore
            chunk.destinations.push(waypoints[i]);
            c++;
            if (c >= distlen) {
                wayPointChuncks.push(chunk);
                chunk = {
                    origins: [],
                    destinations: [],
                    travelMode: google.maps.TravelMode.DRIVING
                };
                c = 0;
            }
        }
        if (chunk.origins.length > 0) {
            wayPointChuncks.push(chunk);
        }
        let reqD = {
            req: this.distService.matInstance.getDistanceMatrix,
            statuses: google.maps.DistanceMatrixStatus,
            calcDistance: function (response) {
                let distance = 0;
                for (const r of response.rows) {
                    let elems = r.elements;
                    for (const elem of elems) {
                        if (elem.status === 'OK') {
                            distance += elem.distance.value;
                        }
                        else {
                            return null;
                        }
                    }
                }
                return distance;
            }
        };
        this.processWayPointChunks(wayPointChuncks, reqD);
    }
    processWayPointChunks(wayPointChuncks, requestFunctionData) {
        this.distService.distServiceCount++;
        const currentDistServiceCount = this.distService.distServiceCount;
        const localService = this.distService;
        const localMapData = this.mapData;
        let totalDistance = 0;
        let getDistances = function (dist, count) {
            count++;
            requestFunctionData.req(dist, (response, status) => {
                if (currentDistServiceCount !== localService.distServiceCount) {
                    localMapData.sendCalculatedDistance("");
                    return;
                }
                if (status === requestFunctionData.statuses.OK) {
                    let distance = requestFunctionData.calcDistance(response);
                    if (distance === null) {
                        localMapData.sendCalculatedDistance("-");
                        return;
                    }
                    else {
                        totalDistance += distance;
                    }
                    if (wayPointChuncks.length > 0) {
                        setTimeout(() => { getDistances(wayPointChuncks.shift(), 0); }, 10);
                    }
                    else {
                        const km = totalDistance / 1000;
                        localMapData.sendCalculatedDistance(km.toFixed(2));
                    }
                }
                else if (status === requestFunctionData.statuses.OVER_QUERY_LIMIT && count < 4) {
                    console.error('Maps error: ', status, count);
                    setTimeout(() => { getDistances(dist, count); }, 200 * count);
                }
                else {
                    localMapData.sendCalculatedDistance("-");
                }
            });
        };
        if (wayPointChuncks.length > 0) {
            getDistances(wayPointChuncks.shift(), 0);
        }
        else {
            localMapData.sendCalculatedDistance("-");
        }
    }
}
GoogleMapExtComponent.ɵfac = function GoogleMapExtComponent_Factory(t) { return new (t || GoogleMapExtComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_map_data_service__WEBPACK_IMPORTED_MODULE_3__["MapDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"])); };
GoogleMapExtComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GoogleMapExtComponent, selectors: [["app-google-map-ext"]], viewQuery: function GoogleMapExtComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["MapMarker"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.map = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.markerElements = _t);
    } }, decls: 6, vars: 7, consts: [["height", "80vh", "width", "100%", 3, "zoom", "center"], ["map", ""], [3, "position", "label", "title", "options", 4, "ngFor", "ngForOf"], [3, "path", 4, "ngFor", "ngForOf"], [3, "position", "label", "title", "options"], [3, "path"]], template: function GoogleMapExtComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "google-map", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, GoogleMapExtComponent_map_marker_2_Template, 1, 4, "map-marker", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, GoogleMapExtComponent_map_marker_4_Template, 1, 4, "map-marker", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, GoogleMapExtComponent_map_polyline_5_Template, 1, 1, "map-polyline", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("zoom", ctx.zoom)("center", ctx.center);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 5, ctx.markers));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.stopMarkers);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.polylines);
    } }, directives: [_angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["GoogleMap"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["MapMarker"], _angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["MapPolyline"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["KeyValuePipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hcHMvZ29vZ2xlLW1hcC1leHQvZ29vZ2xlLW1hcC1leHQuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GoogleMapExtComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-google-map-ext',
                templateUrl: './google-map-ext.component.html',
                styleUrls: ['./google-map-ext.component.css']
            }]
    }], function () { return [{ type: _map_data_service__WEBPACK_IMPORTED_MODULE_3__["MapDataService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"] }]; }, { markerElements: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
            args: [_angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["MapMarker"]]
        }], map: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['map']
        }] }); })();


/***/ }),

/***/ "./src/app/maps/maps.module.ts":
/*!*************************************!*\
  !*** ./src/app/maps/maps.module.ts ***!
  \*************************************/
/*! exports provided: MapsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsModule", function() { return MapsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _open_street_map_open_street_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./open-street-map/open-street-map.component */ "./src/app/maps/open-street-map/open-street-map.component.ts");
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/google-maps */ "./node_modules/@angular/google-maps/__ivy_ngcc__/fesm2015/google-maps.js");
/* harmony import */ var _google_map_ext_google_map_ext_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./google-map-ext/google-map-ext.component */ "./src/app/maps/google-map-ext/google-map-ext.component.ts");






class MapsModule {
}
MapsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MapsModule });
MapsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MapsModule_Factory(t) { return new (t || MapsModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_google_maps__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MapsModule, { declarations: [_open_street_map_open_street_map_component__WEBPACK_IMPORTED_MODULE_2__["OpenStreetMapComponent"], _google_map_ext_google_map_ext_component__WEBPACK_IMPORTED_MODULE_4__["GoogleMapExtComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_google_maps__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsModule"]], exports: [_open_street_map_open_street_map_component__WEBPACK_IMPORTED_MODULE_2__["OpenStreetMapComponent"],
        _google_map_ext_google_map_ext_component__WEBPACK_IMPORTED_MODULE_4__["GoogleMapExtComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MapsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_open_street_map_open_street_map_component__WEBPACK_IMPORTED_MODULE_2__["OpenStreetMapComponent"], _google_map_ext_google_map_ext_component__WEBPACK_IMPORTED_MODULE_4__["GoogleMapExtComponent"]],
                exports: [
                    _open_street_map_open_street_map_component__WEBPACK_IMPORTED_MODULE_2__["OpenStreetMapComponent"],
                    _google_map_ext_google_map_ext_component__WEBPACK_IMPORTED_MODULE_4__["GoogleMapExtComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_google_maps__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/maps/open-street-map/open-street-map.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/maps/open-street-map/open-street-map.component.ts ***!
  \*******************************************************************/
/*! exports provided: OpenStreetMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenStreetMapComponent", function() { return OpenStreetMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol */ "./node_modules/ol/index.js");
/* harmony import */ var ol_layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer */ "./node_modules/ol/layer.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/control */ "./node_modules/ol/control.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/interaction */ "./node_modules/ol/interaction.js");
/* harmony import */ var _map_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../map-data.service */ "./src/app/map-data.service.ts");









class OpenStreetMapComponent {
    constructor(mapData) {
        this.mapData = mapData;
        this.subscription = {
            addVehicles: null,
            clearVehicles: null,
            activateVehicle: null,
            addVehicleTrack: null,
            clearVehicleTrack: null,
            markerChanges: null,
        };
        this.center = {
            lat: 58.370568,
            lng: 26.715893,
        };
        this.subscription.addVehicles = mapData.vehiclesPositioned$.subscribe(vehs => {
            for (const v of vehs) {
                this.addMarker(v[1].objectName, v[1].latitude, v[1].longitude);
            }
        });
        this.subscription.clearVehicles = mapData.vehiclesCleared$.subscribe(() => {
        });
        this.subscription.addVehicles = mapData.vehicleTrack$.subscribe(tracks => {
        });
        this.subscription.clearVehicleTrack = mapData.vehicleTracksCleared$.subscribe(() => {
        });
        this.subscription.activateVehicle = mapData.vehiclesActivated$.subscribe((veh) => {
            this.center = {
                lat: veh.latitude,
                lng: veh.longitude,
            };
        });
    }
    addMarker(label, lon, lat) {
    }
    ngOnInit() {
        this.map = new ol__WEBPACK_IMPORTED_MODULE_1__["Map"]({
            target: 'os-map',
            layers: [
                new ol_layer__WEBPACK_IMPORTED_MODULE_2__["Tile"]({
                    source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_5__["default"]()
                })
            ],
            view: new ol__WEBPACK_IMPORTED_MODULE_1__["View"]({
                center: [0, 0],
                zoom: 0
            }),
            controls: Object(ol_control__WEBPACK_IMPORTED_MODULE_4__["defaults"])(),
        });
        this.markers = new ol_layer__WEBPACK_IMPORTED_MODULE_2__["Vector"]({
            source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_3__["default"]({
                features: []
            }),
        });
        this.map.addLayer(this.markers);
    }
}
OpenStreetMapComponent.ɵfac = function OpenStreetMapComponent_Factory(t) { return new (t || OpenStreetMapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_map_data_service__WEBPACK_IMPORTED_MODULE_7__["MapDataService"])); };
OpenStreetMapComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OpenStreetMapComponent, selectors: [["app-open-street-map"]], decls: 2, vars: 0, consts: [["id", "os-map"], ["id", "os-controls"]], template: function OpenStreetMapComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
    } }, styles: [".ol-overlaycontainer-stopevent[_ngcontent-%COMP%]   .ol-zoom[_ngcontent-%COMP%]{\n  position: absolute;\n  left: 0;\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFwcy9vcGVuLXN0cmVldC1tYXAvb3Blbi1zdHJlZXQtbWFwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsT0FBTztFQUNQLHFCQUFxQjtBQUN2QiIsImZpbGUiOiJzcmMvYXBwL21hcHMvb3Blbi1zdHJlZXQtbWFwL29wZW4tc3RyZWV0LW1hcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm9sLW92ZXJsYXljb250YWluZXItc3RvcGV2ZW50IC5vbC16b29te1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbiJdfQ== */", "#os-map[_ngcontent-%COMP%]{\n    width: 100%;\n    height: 82vh;\n  }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OpenStreetMapComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-open-street-map',
                templateUrl: './open-street-map.component.html',
                styleUrls: ['./open-street-map.component.css'],
            }]
    }], function () { return [{ type: _map_data_service__WEBPACK_IMPORTED_MODULE_7__["MapDataService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/time-ago-extends.pipe.ts":
/*!******************************************!*\
  !*** ./src/app/time-ago-extends.pipe.ts ***!
  \******************************************/
/*! exports provided: TimeAgoExtendsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeAgoExtendsPipe", function() { return TimeAgoExtendsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var time_ago_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! time-ago-pipe */ "./node_modules/time-ago-pipe/__ivy_ngcc__/esm2015/time-ago-pipe.js");



// Make timeago pipe work in Angular 9
class TimeAgoExtendsPipe extends time_ago_pipe__WEBPACK_IMPORTED_MODULE_1__["TimeAgoPipe"] {
}
TimeAgoExtendsPipe.ɵfac = function TimeAgoExtendsPipe_Factory(t) { return ɵTimeAgoExtendsPipe_BaseFactory(t || TimeAgoExtendsPipe); };
TimeAgoExtendsPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "timeAgo", type: TimeAgoExtendsPipe, pure: false });
const ɵTimeAgoExtendsPipe_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](TimeAgoExtendsPipe);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TimeAgoExtendsPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'timeAgo',
                pure: false
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/mait/PhpstormProjects/FleetComplete/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map