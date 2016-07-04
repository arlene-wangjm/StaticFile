//this is app js file
//
//import "../sass/foundation.scss";

import angular from "angular";
import route from "angular-route";
import animate from "angular-animate";
import sanitize from "angular-sanitize";

import globalVar from "./common/global";

angular.module('app', ['route', 'animate', 'sanitize']);