"use strict";function config(e,r,t,o,a,l){l.defaults.headers.get||(l.defaults.headers.get={}),l.defaults.headers.get["Cache-Control"]="no-cache",l.defaults.headers.get.Pragma="no-cache",l.defaults.headers.get["If-Modified-Since"]="0",$.ajaxSetup({cache:!1}),angular.module("thapp").register={controller:e.register,directive:r.directive,filter:t.register,factory:o.factory,service:o.service},angular.module("thapp").asyncjs=function(e){return["$q","$route","$rootScope",function(r,t,o){var a=r.defer(),l=e;return $script(l,function(){o.$apply(function(){a.resolve()})}),a.promise}]};var i="partials",n="js",s="css";a.when("/login",{templateUrl:i+"/user/login.html",controller:"loginCtrl",css:[s+"/user.css"],resolve:{load:angular.module("thapp").asyncjs([n+"/ctrl/user/login.js"])}}).otherwise({redirectTo:"/login"}),l.defaults.useXDomain=!0,l.defaults.withCredentials=!0,delete l.defaults.headers.common["X-Requested-With"]}function appCtrlFoo(){}angular.module("thapp",["ngCookies","ngRoute","xxfilters","xxservices","xxdirectives","ngStorage","angularFileUpload","testModel"]).config(["$controllerProvider","$compileProvider","$filterProvider","$provide","$routeProvider","$httpProvider",config]),angular.module("thapp").run(["$rootScope","$http","$location","Context","$window","$timeout",function(e,r,t,o,a,l){e.$on("$routeChangeStart",function(e,r,t){})}]),angular.module("thapp").controller("appCtrl",appCtrlFoo);