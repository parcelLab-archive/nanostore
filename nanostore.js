'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Emitter = require('tiny-emitter');

function Store() {
  var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var bus = new Emitter();
  var state = _extends({}, initial);

  this.on = bus.on.bind(bus);
  this.emit = bus.emit.bind(bus);

  this.set = function (stateMod) {
    state = _extends({}, state, stateMod);
    this.emit('state:changed');
  };

  this.get = function () {
    return state;
  };

  this.subscribe = function (fn) {
    var _this = this;

    this.on('state:changed', function () {
      fn(_this.get());
    });
  };
}

module.exports = Store;

