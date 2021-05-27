(function (popper_js, require$$3) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var data = createCommonjsModule(function (module, exports) {
	/*!
	  * CoreUI data.js v3.3.0 (https://coreui.io)
	  * Copyright 2020 creativeLabs Łukasz Holeczek
	  * Licensed under MIT (https://coreui.io)
	  */
	(function (global, factory) {
	   module.exports = factory() ;
	}(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): dom/data.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var mapData = function () {
	    var storeData = {};
	    var id = 1;
	    return {
	      set: function set(element, key, data) {
	        if (typeof element.key === 'undefined') {
	          element.key = {
	            key: key,
	            id: id
	          };
	          id++;
	        }

	        storeData[element.key.id] = data;
	      },
	      get: function get(element, key) {
	        if (!element || typeof element.key === 'undefined') {
	          return null;
	        }

	        var keyProperties = element.key;

	        if (keyProperties.key === key) {
	          return storeData[keyProperties.id];
	        }

	        return null;
	      },
	      delete: function _delete(element, key) {
	        if (typeof element.key === 'undefined') {
	          return;
	        }

	        var keyProperties = element.key;

	        if (keyProperties.key === key) {
	          delete storeData[keyProperties.id];
	          delete element.key;
	        }
	      }
	    };
	  }();

	  var Data = {
	    setData: function setData(instance, key, data) {
	      mapData.set(instance, key, data);
	    },
	    getData: function getData(instance, key) {
	      return mapData.get(instance, key);
	    },
	    removeData: function removeData(instance, key) {
	      mapData.delete(instance, key);
	    }
	  };

	  return Data;

	})));

	});

	var polyfill = createCommonjsModule(function (module, exports) {
	/*!
	  * CoreUI polyfill.js v3.3.0 (https://coreui.io)
	  * Copyright 2020 creativeLabs Łukasz Holeczek
	  * Licensed under MIT (https://coreui.io)
	  */
	(function (global, factory) {
	   factory(exports) ;
	}(commonjsGlobal, (function (exports) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  var MAX_UID = 1000000;
	  /**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */


	  var getUID = function getUID(prefix) {
	    do {
	      prefix += Math.floor(Math.random() * MAX_UID);
	    } while (document.getElementById(prefix));

	    return prefix;
	  };

	  /* istanbul ignore file */
	  exports.find = Element.prototype.querySelectorAll;
	  exports.findOne = Element.prototype.querySelector; // MSEdge resets defaultPrevented flag upon dispatchEvent call if at least one listener is attached

	  var defaultPreventedPreservedOnDispatch = function () {
	    var e = new CustomEvent('Bootstrap', {
	      cancelable: true
	    });
	    var element = document.createElement('div');
	    element.addEventListener('Bootstrap', function () {
	      return null;
	    });
	    e.preventDefault();
	    element.dispatchEvent(e);
	    return e.defaultPrevented;
	  }();

	  var scopeSelectorRegex = /:scope\b/;

	  var supportScopeQuery = function () {
	    var element = document.createElement('div');

	    try {
	      element.querySelectorAll(':scope *');
	    } catch (_) {
	      return false;
	    }

	    return true;
	  }();

	  if (!supportScopeQuery) {
	    exports.find = function find(selector) {
	      if (!scopeSelectorRegex.test(selector)) {
	        return this.querySelectorAll(selector);
	      }

	      var hasId = Boolean(this.id);

	      if (!hasId) {
	        this.id = getUID('scope');
	      }

	      var nodeList = null;

	      try {
	        selector = selector.replace(scopeSelectorRegex, "#" + this.id);
	        nodeList = this.querySelectorAll(selector);
	      } finally {
	        if (!hasId) {
	          this.removeAttribute('id');
	        }
	      }

	      return nodeList;
	    };

	    exports.findOne = function findOne(selector) {
	      if (!scopeSelectorRegex.test(selector)) {
	        return this.querySelector(selector);
	      }

	      var matches = exports.find.call(this, selector);

	      if (typeof matches[0] !== 'undefined') {
	        return matches[0];
	      }

	      return null;
	    };
	  }

	  exports.defaultPreventedPreservedOnDispatch = defaultPreventedPreservedOnDispatch;

	  Object.defineProperty(exports, '__esModule', { value: true });

	})));

	});

	var eventHandler = createCommonjsModule(function (module, exports) {
	/*!
	  * CoreUI event-handler.js v3.3.0 (https://coreui.io)
	  * Copyright 2020 creativeLabs Łukasz Holeczek
	  * Licensed under MIT (https://coreui.io)
	  */
	(function (global, factory) {
	   module.exports = factory(polyfill) ;
	}(commonjsGlobal, (function (polyfill_js) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  var getjQuery = function getjQuery() {
	    var _window = window,
	        jQuery = _window.jQuery;

	    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): dom/event-handler.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var $ = getjQuery();
	  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	  var stripNameRegex = /\..*/;
	  var stripUidRegex = /::\d+$/;
	  var eventRegistry = {}; // Events storage

	  var uidEvent = 1;
	  var customEvents = {
	    mouseenter: 'mouseover',
	    mouseleave: 'mouseout'
	  };
	  var nativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];
	  /**
	   * ------------------------------------------------------------------------
	   * Private methods
	   * ------------------------------------------------------------------------
	   */

	  function getUidEvent(element, uid) {
	    return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
	  }

	  function getEvent(element) {
	    var uid = getUidEvent(element);
	    element.uidEvent = uid;
	    eventRegistry[uid] = eventRegistry[uid] || {};
	    return eventRegistry[uid];
	  }

	  function bootstrapHandler(element, fn) {
	    return function handler(event) {
	      event.delegateTarget = element;

	      if (handler.oneOff) {
	        EventHandler.off(element, event.type, fn);
	      }

	      return fn.apply(element, [event]);
	    };
	  }

	  function bootstrapDelegationHandler(element, selector, fn) {
	    return function handler(event) {
	      var domElements = element.querySelectorAll(selector);

	      for (var target = event.target; target && target !== this; target = target.parentNode) {
	        for (var i = domElements.length; i--;) {
	          if (domElements[i] === target) {
	            event.delegateTarget = target;

	            if (handler.oneOff) {
	              EventHandler.off(element, event.type, fn);
	            }

	            return fn.apply(target, [event]);
	          }
	        }
	      } // To please ESLint


	      return null;
	    };
	  }

	  function findHandler(events, handler, delegationSelector) {
	    if (delegationSelector === void 0) {
	      delegationSelector = null;
	    }

	    var uidEventList = Object.keys(events);

	    for (var i = 0, len = uidEventList.length; i < len; i++) {
	      var event = events[uidEventList[i]];

	      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	        return event;
	      }
	    }

	    return null;
	  }

	  function normalizeParams(originalTypeEvent, handler, delegationFn) {
	    var delegation = typeof handler === 'string';
	    var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

	    var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
	    var custom = customEvents[typeEvent];

	    if (custom) {
	      typeEvent = custom;
	    }

	    var isNative = nativeEvents.indexOf(typeEvent) > -1;

	    if (!isNative) {
	      typeEvent = originalTypeEvent;
	    }

	    return [delegation, originalHandler, typeEvent];
	  }

	  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }

	    if (!handler) {
	      handler = delegationFn;
	      delegationFn = null;
	    }

	    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
	        delegation = _normalizeParams[0],
	        originalHandler = _normalizeParams[1],
	        typeEvent = _normalizeParams[2];

	    var events = getEvent(element);
	    var handlers = events[typeEvent] || (events[typeEvent] = {});
	    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

	    if (previousFn) {
	      previousFn.oneOff = previousFn.oneOff && oneOff;
	      return;
	    }

	    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
	    fn.delegationSelector = delegation ? handler : null;
	    fn.originalHandler = originalHandler;
	    fn.oneOff = oneOff;
	    fn.uidEvent = uid;
	    handlers[uid] = fn;
	    element.addEventListener(typeEvent, fn, delegation);
	  }

	  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	    var fn = findHandler(events[typeEvent], handler, delegationSelector);

	    if (!fn) {
	      return;
	    }

	    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	    delete events[typeEvent][fn.uidEvent];
	  }

	  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	    var storeElementEvent = events[typeEvent] || {};
	    Object.keys(storeElementEvent).forEach(function (handlerKey) {
	      if (handlerKey.indexOf(namespace) > -1) {
	        var event = storeElementEvent[handlerKey];
	        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	      }
	    });
	  }

	  var EventHandler = {
	    on: function on(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, false);
	    },
	    one: function one(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, true);
	    },
	    off: function off(element, originalTypeEvent, handler, delegationFn) {
	      if (typeof originalTypeEvent !== 'string' || !element) {
	        return;
	      }

	      var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
	          delegation = _normalizeParams2[0],
	          originalHandler = _normalizeParams2[1],
	          typeEvent = _normalizeParams2[2];

	      var inNamespace = typeEvent !== originalTypeEvent;
	      var events = getEvent(element);
	      var isNamespace = originalTypeEvent.charAt(0) === '.';

	      if (typeof originalHandler !== 'undefined') {
	        // Simplest case: handler is passed, remove that listener ONLY.
	        if (!events || !events[typeEvent]) {
	          return;
	        }

	        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	        return;
	      }

	      if (isNamespace) {
	        Object.keys(events).forEach(function (elementEvent) {
	          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	        });
	      }

	      var storeElementEvent = events[typeEvent] || {};
	      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
	        var handlerKey = keyHandlers.replace(stripUidRegex, '');

	        if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
	          var event = storeElementEvent[keyHandlers];
	          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	        }
	      });
	    },
	    trigger: function trigger(element, event, args) {
	      if (typeof event !== 'string' || !element) {
	        return null;
	      }

	      var typeEvent = event.replace(stripNameRegex, '');
	      var inNamespace = event !== typeEvent;
	      var isNative = nativeEvents.indexOf(typeEvent) > -1;
	      var jQueryEvent;
	      var bubbles = true;
	      var nativeDispatch = true;
	      var defaultPrevented = false;
	      var evt = null;

	      if (inNamespace && $) {
	        jQueryEvent = $.Event(event, args);
	        $(element).trigger(jQueryEvent);
	        bubbles = !jQueryEvent.isPropagationStopped();
	        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	        defaultPrevented = jQueryEvent.isDefaultPrevented();
	      }

	      if (isNative) {
	        evt = document.createEvent('HTMLEvents');
	        evt.initEvent(typeEvent, bubbles, true);
	      } else {
	        evt = new CustomEvent(event, {
	          bubbles: bubbles,
	          cancelable: true
	        });
	      } // merge custom information in our event


	      if (typeof args !== 'undefined') {
	        Object.keys(args).forEach(function (key) {
	          Object.defineProperty(evt, key, {
	            get: function get() {
	              return args[key];
	            }
	          });
	        });
	      }

	      if (defaultPrevented) {
	        evt.preventDefault();

	        if (!polyfill_js.defaultPreventedPreservedOnDispatch) {
	          Object.defineProperty(evt, 'defaultPrevented', {
	            get: function get() {
	              return true;
	            }
	          });
	        }
	      }

	      if (nativeDispatch) {
	        element.dispatchEvent(evt);
	      }

	      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
	        jQueryEvent.preventDefault();
	      }

	      return evt;
	    }
	  };

	  return EventHandler;

	})));

	});

	var manipulator = createCommonjsModule(function (module, exports) {
	/*!
	  * CoreUI manipulator.js v3.3.0 (https://coreui.io)
	  * Copyright 2020 creativeLabs Łukasz Holeczek
	  * Licensed under MIT (https://coreui.io)
	  */
	(function (global, factory) {
	   module.exports = factory() ;
	}(commonjsGlobal, (function () {
	  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): dom/manipulator.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  function normalizeData(val) {
	    if (val === 'true') {
	      return true;
	    }

	    if (val === 'false') {
	      return false;
	    }

	    if (val === Number(val).toString()) {
	      return Number(val);
	    }

	    if (val === '' || val === 'null') {
	      return null;
	    }

	    return val;
	  }

	  function normalizeDataKey(key) {
	    return key.replace(/[A-Z]/g, function (chr) {
	      return "-" + chr.toLowerCase();
	    });
	  }

	  var Manipulator = {
	    setDataAttribute: function setDataAttribute(element, key, value) {
	      element.setAttribute("data-" + normalizeDataKey(key), value);
	    },
	    removeDataAttribute: function removeDataAttribute(element, key) {
	      element.removeAttribute("data-" + normalizeDataKey(key));
	    },
	    getDataAttributes: function getDataAttributes(element) {
	      if (!element) {
	        return {};
	      }

	      var attributes = _objectSpread({}, element.dataset);

	      Object.keys(attributes).forEach(function (key) {
	        attributes[key] = normalizeData(attributes[key]);
	      });
	      return attributes;
	    },
	    getDataAttribute: function getDataAttribute(element, key) {
	      return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
	    },
	    offset: function offset(element) {
	      var rect = element.getBoundingClientRect();
	      return {
	        top: rect.top + document.body.scrollTop,
	        left: rect.left + document.body.scrollLeft
	      };
	    },
	    position: function position(element) {
	      return {
	        top: element.offsetTop,
	        left: element.offsetLeft
	      };
	    },
	    toggleClass: function toggleClass(element, className) {
	      if (!element) {
	        return;
	      }

	      if (element.classList.contains(className)) {
	        element.classList.remove(className);
	      } else {
	        element.classList.add(className);
	      }
	    }
	  };

	  return Manipulator;

	})));

	});

	var selectorEngine = createCommonjsModule(function (module, exports) {
	/*!
	  * CoreUI selector-engine.js v3.3.0 (https://coreui.io)
	  * Copyright 2020 creativeLabs Łukasz Holeczek
	  * Licensed under MIT (https://coreui.io)
	  */
	(function (global, factory) {
	   module.exports = factory(polyfill) ;
	}(commonjsGlobal, (function (polyfill_js) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): dom/selector-engine.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NODE_TEXT = 3;
	  var SelectorEngine = {
	    matches: function matches(element, selector) {
	      return element.matches(selector);
	    },
	    find: function find(selector, element) {
	      var _ref;

	      if (element === void 0) {
	        element = document.documentElement;
	      }

	      return (_ref = []).concat.apply(_ref, polyfill_js.find.call(element, selector));
	    },
	    findOne: function findOne(selector, element) {
	      if (element === void 0) {
	        element = document.documentElement;
	      }

	      return polyfill_js.findOne.call(element, selector);
	    },
	    children: function children(element, selector) {
	      var _ref2;

	      var children = (_ref2 = []).concat.apply(_ref2, element.children);

	      return children.filter(function (child) {
	        return child.matches(selector);
	      });
	    },
	    parents: function parents(element, selector) {
	      var parents = [];
	      var ancestor = element.parentNode;

	      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	        if (this.matches(ancestor, selector)) {
	          parents.push(ancestor);
	        }

	        ancestor = ancestor.parentNode;
	      }

	      return parents;
	    },
	    prev: function prev(element, selector) {
	      var previous = element.previousElementSibling;

	      while (previous) {
	        if (previous.matches(selector)) {
	          return [previous];
	        }

	        previous = previous.previousElementSibling;
	      }

	      return [];
	    },
	    next: function next(element, selector) {
	      var next = element.nextElementSibling;

	      while (next) {
	        if (this.matches(next, selector)) {
	          return [next];
	        }

	        next = next.nextElementSibling;
	      }

	      return [];
	    }
	  };

	  return SelectorEngine;

	})));

	});

	var tooltip = createCommonjsModule(function (module, exports) {
	/*!
	  * CoreUI tooltip.js v3.3.0 (https://coreui.io)
	  * Copyright 2020 creativeLabs Łukasz Holeczek
	  * Licensed under MIT (https://coreui.io)
	  */
	(function (global, factory) {
	   module.exports = factory(data, eventHandler, manipulator, require$$3__default['default'], selectorEngine) ;
	}(commonjsGlobal, (function (Data, EventHandler, Manipulator, core, SelectorEngine) {
	  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  var Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  var MAX_UID = 1000000;
	  var MILLISECONDS_MULTIPLIER = 1000;
	  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  var toType = function toType(obj) {
	    if (obj === null || obj === undefined) {
	      return "" + obj;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };
	  /**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */


	  var getUID = function getUID(prefix) {
	    do {
	      prefix += Math.floor(Math.random() * MAX_UID);
	    } while (document.getElementById(prefix));

	    return prefix;
	  };

	  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    var _window$getComputedSt = window.getComputedStyle(element),
	        transitionDuration = _window$getComputedSt.transitionDuration,
	        transitionDelay = _window$getComputedSt.transitionDelay;

	    var floatTransitionDuration = parseFloat(transitionDuration);
	    var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  var triggerTransitionEnd = function triggerTransitionEnd(element) {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  var isElement = function isElement(obj) {
	    return (obj[0] || obj).nodeType;
	  };

	  var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
	    var called = false;
	    var durationPadding = 5;
	    var emulatedDuration = duration + durationPadding;

	    function listener() {
	      called = true;
	      element.removeEventListener(TRANSITION_END, listener);
	    }

	    element.addEventListener(TRANSITION_END, listener);
	    setTimeout(function () {
	      if (!called) {
	        triggerTransitionEnd(element);
	      }
	    }, emulatedDuration);
	  };

	  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
	    Object.keys(configTypes).forEach(function (property) {
	      var expectedTypes = configTypes[property];
	      var value = config[property];
	      var valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
	      }
	    });
	  };

	  var findShadowRoot = function findShadowRoot(element) {
	    if (!document.documentElement.attachShadow) {
	      return null;
	    } // Can find the shadow root otherwise it'll return the document


	    if (typeof element.getRootNode === 'function') {
	      var root = element.getRootNode();
	      return root instanceof ShadowRoot ? root : null;
	    }

	    if (element instanceof ShadowRoot) {
	      return element;
	    } // when we don't find a shadow root


	    if (!element.parentNode) {
	      return null;
	    }

	    return findShadowRoot(element.parentNode);
	  };

	  var noop = function noop() {
	    return function () {};
	  };

	  var getjQuery = function getjQuery() {
	    var _window = window,
	        jQuery = _window.jQuery;

	    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.0.0-alpha1): util/sanitizer.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
	  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	  /**
	   * A pattern that recognizes a commonly useful subset of URLs that are safe.
	   *
	   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
	  /**
	   * A pattern that matches safe data URLs. Only matches image, video and audio types.
	   *
	   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
	    var attrName = attr.nodeName.toLowerCase();

	    if (allowedAttributeList.indexOf(attrName) !== -1) {
	      if (uriAttrs.indexOf(attrName) !== -1) {
	        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
	      }

	      return true;
	    }

	    var regExp = allowedAttributeList.filter(function (attrRegex) {
	      return attrRegex instanceof RegExp;
	    }); // Check if a regular expression validates the attribute.

	    for (var i = 0, len = regExp.length; i < len; i++) {
	      if (attrName.match(regExp[i])) {
	        return true;
	      }
	    }

	    return false;
	  };

	  var DefaultWhitelist = {
	    // Global attributes allowed on any supplied element below.
	    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	    a: ['target', 'href', 'title', 'rel'],
	    area: [],
	    b: [],
	    br: [],
	    col: [],
	    code: [],
	    div: [],
	    em: [],
	    hr: [],
	    h1: [],
	    h2: [],
	    h3: [],
	    h4: [],
	    h5: [],
	    h6: [],
	    i: [],
	    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	    li: [],
	    ol: [],
	    p: [],
	    pre: [],
	    s: [],
	    small: [],
	    span: [],
	    sub: [],
	    sup: [],
	    strong: [],
	    u: [],
	    ul: []
	  };
	  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
	    var _ref;

	    if (!unsafeHtml.length) {
	      return unsafeHtml;
	    }

	    if (sanitizeFn && typeof sanitizeFn === 'function') {
	      return sanitizeFn(unsafeHtml);
	    }

	    var domParser = new window.DOMParser();
	    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	    var whitelistKeys = Object.keys(whiteList);

	    var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));

	    var _loop = function _loop(i, len) {
	      var _ref2;

	      var el = elements[i];
	      var elName = el.nodeName.toLowerCase();

	      if (whitelistKeys.indexOf(elName) === -1) {
	        el.parentNode.removeChild(el);
	        return "continue";
	      }

	      var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);

	      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
	      attributeList.forEach(function (attr) {
	        if (!allowedAttribute(attr, whitelistedAttributes)) {
	          el.removeAttribute(attr.nodeName);
	        }
	      });
	    };

	    for (var i = 0, len = elements.length; i < len; i++) {
	      var _ret = _loop(i);

	      if (_ret === "continue") continue;
	    }

	    return createdDocument.body.innerHTML;
	  }

	  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'tooltip';
	  var VERSION = '3.2.2';
	  var DATA_KEY = 'coreui.tooltip';
	  var EVENT_KEY = "." + DATA_KEY;
	  var CLASS_PREFIX = 'bs-tooltip';
	  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
	  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
	  var DefaultType = {
	    animation: 'boolean',
	    template: 'string',
	    title: '(string|element|function)',
	    trigger: 'string',
	    delay: '(number|object)',
	    html: 'boolean',
	    selector: '(string|boolean)',
	    placement: '(string|function)',
	    offset: '(array|function)',
	    container: '(string|element|boolean)',
	    boundary: '(string|element)',
	    sanitize: 'boolean',
	    sanitizeFn: '(null|function)',
	    whiteList: 'object',
	    popperConfig: '(null|object)'
	  };
	  var AttachmentMap = {
	    AUTO: 'auto',
	    TOP: 'top',
	    RIGHT: 'right',
	    BOTTOM: 'bottom',
	    LEFT: 'left'
	  };
	  var Default = {
	    animation: true,
	    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    selector: false,
	    placement: 'top',
	    offset: [0, 0],
	    container: false,
	    boundary: 'scrollParent',
	    sanitize: true,
	    sanitizeFn: null,
	    whiteList: DefaultWhitelist,
	    popperConfig: null
	  };
	  var Event$1 = {
	    HIDE: "hide" + EVENT_KEY,
	    HIDDEN: "hidden" + EVENT_KEY,
	    SHOW: "show" + EVENT_KEY,
	    SHOWN: "shown" + EVENT_KEY,
	    INSERTED: "inserted" + EVENT_KEY,
	    CLICK: "click" + EVENT_KEY,
	    FOCUSIN: "focusin" + EVENT_KEY,
	    FOCUSOUT: "focusout" + EVENT_KEY,
	    MOUSEENTER: "mouseenter" + EVENT_KEY,
	    MOUSELEAVE: "mouseleave" + EVENT_KEY
	  };
	  var CLASS_NAME_FADE = 'fade';
	  var CLASS_NAME_MODAL = 'modal';
	  var CLASS_NAME_SHOW = 'show';
	  var HOVER_STATE_SHOW = 'show';
	  var HOVER_STATE_OUT = 'out';
	  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	  var TRIGGER_HOVER = 'hover';
	  var TRIGGER_FOCUS = 'focus';
	  var TRIGGER_CLICK = 'click';
	  var TRIGGER_MANUAL = 'manual';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Tooltip = /*#__PURE__*/function () {
	    function Tooltip(element, config) {
	      if (typeof core.createPopper === 'undefined') {
	        throw new TypeError('CoreUI\'s tooltips require Popper.js (https://popper.js.org)');
	      } // private


	      this._isEnabled = true;
	      this._timeout = 0;
	      this._hoverState = '';
	      this._activeTrigger = {};
	      this._popper = null; // Protected

	      this.element = element;
	      this.config = this._getConfig(config);
	      this.tip = null;

	      this._setListeners();

	      Data__default['default'].setData(element, this.constructor.DATA_KEY, this);
	    } // Getters


	    var _proto = Tooltip.prototype;

	    // Public
	    _proto.enable = function enable() {
	      this._isEnabled = true;
	    };

	    _proto.disable = function disable() {
	      this._isEnabled = false;
	    };

	    _proto.toggleEnabled = function toggleEnabled() {
	      this._isEnabled = !this._isEnabled;
	    };

	    _proto.toggle = function toggle(event) {
	      if (!this._isEnabled) {
	        return;
	      }

	      if (event) {
	        var dataKey = this.constructor.DATA_KEY;
	        var context = Data__default['default'].getData(event.delegateTarget, dataKey);

	        if (!context) {
	          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	          Data__default['default'].setData(event.delegateTarget, dataKey, context);
	        }

	        context._activeTrigger.click = !context._activeTrigger.click;

	        if (context._isWithActiveTrigger()) {
	          context._enter(null, context);
	        } else {
	          context._leave(null, context);
	        }
	      } else {
	        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
	          this._leave(null, this);

	          return;
	        }

	        this._enter(null, this);
	      }
	    };

	    _proto.dispose = function dispose() {
	      clearTimeout(this._timeout);
	      Data__default['default'].removeData(this.element, this.constructor.DATA_KEY);
	      EventHandler__default['default'].off(this.element, this.constructor.EVENT_KEY);
	      EventHandler__default['default'].off(this.element.closest("." + CLASS_NAME_MODAL), 'hide.coreui.modal', this._hideModalHandler);

	      if (this.tip) {
	        this.tip.parentNode.removeChild(this.tip);
	      }

	      this._isEnabled = null;
	      this._timeout = null;
	      this._hoverState = null;
	      this._activeTrigger = null;

	      if (this._popper) {
	        this._popper.destroy();
	      }

	      this._popper = null;
	      this.element = null;
	      this.config = null;
	      this.tip = null;
	    };

	    _proto.show = function show() {
	      var _this = this;

	      if (this.element.style.display === 'none') {
	        throw new Error('Please use show on visible elements');
	      }

	      if (this.isWithContent() && this._isEnabled) {
	        var showEvent = EventHandler__default['default'].trigger(this.element, this.constructor.Event.SHOW);
	        var shadowRoot = findShadowRoot(this.element);
	        var isInTheDom = shadowRoot === null ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);

	        if (showEvent.defaultPrevented || !isInTheDom) {
	          return;
	        }

	        var tip = this.getTipElement();
	        var tipId = getUID(this.constructor.NAME);
	        tip.setAttribute('id', tipId);
	        this.element.setAttribute('aria-describedby', tipId);
	        this.setContent();

	        if (this.config.animation) {
	          tip.classList.add(CLASS_NAME_FADE);
	        }

	        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

	        var attachment = this._getAttachment(placement); // this._addAttachmentClass(attachment)


	        var container = this._getContainer();

	        Data__default['default'].setData(tip, this.constructor.DATA_KEY, this);

	        if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
	          container.appendChild(tip);
	        }

	        EventHandler__default['default'].trigger(this.element, this.constructor.Event.INSERTED);
	        this._popper = core.createPopper(this.element, tip, this._getPopperConfig(attachment));
	        tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
	        // empty mouseover listeners to the body's immediate children;
	        // only needed because of broken event delegation on iOS
	        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

	        if ('ontouchstart' in document.documentElement) {
	          var _ref;

	          (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
	            EventHandler__default['default'].on(element, 'mouseover', noop());
	          });
	        }

	        var complete = function complete() {
	          if (_this.config.animation) {
	            _this._fixTransition();
	          }

	          var prevHoverState = _this._hoverState;
	          _this._hoverState = null;
	          EventHandler__default['default'].trigger(_this.element, _this.constructor.Event.SHOWN);

	          if (prevHoverState === HOVER_STATE_OUT) {
	            _this._leave(null, _this);
	          }
	        };

	        if (this.tip.classList.contains(CLASS_NAME_FADE)) {
	          var transitionDuration = getTransitionDurationFromElement(this.tip);
	          EventHandler__default['default'].one(this.tip, TRANSITION_END, complete);
	          emulateTransitionEnd(this.tip, transitionDuration);
	        } else {
	          complete();
	        }
	      }
	    };

	    _proto.hide = function hide() {
	      var _this2 = this;

	      var tip = this.getTipElement();

	      var complete = function complete() {
	        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
	          tip.parentNode.removeChild(tip);
	        }

	        _this2._cleanTipClass();

	        _this2.element.removeAttribute('aria-describedby');

	        EventHandler__default['default'].trigger(_this2.element, _this2.constructor.Event.HIDDEN);

	        _this2._popper.destroy();
	      };

	      var hideEvent = EventHandler__default['default'].trigger(this.element, this.constructor.Event.HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
	      // empty mouseover listeners we added for iOS support

	      if ('ontouchstart' in document.documentElement) {
	        var _ref2;

	        (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
	          return EventHandler__default['default'].off(element, 'mouseover', noop);
	        });
	      }

	      this._activeTrigger[TRIGGER_CLICK] = false;
	      this._activeTrigger[TRIGGER_FOCUS] = false;
	      this._activeTrigger[TRIGGER_HOVER] = false;

	      if (this.tip.classList.contains(CLASS_NAME_FADE)) {
	        var transitionDuration = getTransitionDurationFromElement(tip);
	        EventHandler__default['default'].one(tip, TRANSITION_END, complete);
	        emulateTransitionEnd(tip, transitionDuration);
	      } else {
	        complete();
	      }

	      this._hoverState = '';
	    };

	    _proto.update = function update() {
	      if (this._popper !== null) {
	        this._popper.update();
	      }
	    } // Protected
	    ;

	    _proto.isWithContent = function isWithContent() {
	      return Boolean(this.getTitle());
	    };

	    _proto.getTipElement = function getTipElement() {
	      if (this.tip) {
	        return this.tip;
	      }

	      var element = document.createElement('div');
	      element.innerHTML = this.config.template;
	      this.tip = element.children[0];
	      return this.tip;
	    };

	    _proto.setContent = function setContent() {
	      var tip = this.getTipElement();
	      this.setElementContent(SelectorEngine__default['default'].findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
	      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
	    };

	    _proto.setElementContent = function setElementContent(element, content) {
	      if (element === null) {
	        return;
	      }

	      if (typeof content === 'object' && isElement(content)) {
	        if (content.jquery) {
	          content = content[0];
	        } // content is a DOM node or a jQuery


	        if (this.config.html) {
	          if (content.parentNode !== element) {
	            element.innerHTML = '';
	            element.appendChild(content);
	          }
	        } else {
	          element.textContent = content.textContent;
	        }

	        return;
	      }

	      if (this.config.html) {
	        if (this.config.sanitize) {
	          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
	        }

	        element.innerHTML = content;
	      } else {
	        element.textContent = content;
	      }
	    };

	    _proto.getTitle = function getTitle() {
	      var title = this.element.getAttribute('data-original-title');

	      if (!title) {
	        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
	      }

	      return title;
	    } // Private
	    ;

	    _proto._getPopperConfig = function _getPopperConfig(attachment) {
	      var _this3 = this;

	      var defaultBsConfig = {
	        placement: attachment,
	        modifiers: [{
	          name: 'offset',
	          options: {
	            offset: this._getOffset()
	          }
	        }, {
	          name: 'arrow',
	          options: {
	            element: "." + this.constructor.NAME + "-arrow"
	          }
	        }, {
	          name: 'preventOverflow',
	          options: {
	            boundary: this.config.boundary
	          }
	        }],
	        onFirstUpdate: function onFirstUpdate(data) {
	          if (data.originalPlacement !== data.placement) {
	            // this._handlePopperPlacementChange(data)
	            // fix Popper position issue
	            //TODO: find where is the problem or find better solution
	            _this3._popper.update();
	          }
	        }
	      };
	      return _objectSpread(_objectSpread({}, defaultBsConfig), this.config.popperConfig);
	    } // _addAttachmentClass(attachment) {
	    //   this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`)
	    // }
	    // _getOffset() {
	    //   const offset = {}
	    //   if (typeof this.config.offset === 'function') {
	    //     offset.fn = data => {
	    //       data.offsets = {
	    //         ...data.offsets,
	    //         ...this.config.offset(data.offsets, this.element) || {}
	    //       }
	    //       return data
	    //     }
	    //   } else {
	    //     offset.offset = this.config.offset
	    //   }
	    //   return offset
	    // }
	    ;

	    _proto._getOffset = function _getOffset() {
	      var _this4 = this;

	      var offset = [];

	      if (typeof this.config.offset === 'function') {
	        offset = function offset(_ref3) {
	          var placement = _ref3.placement,
	              reference = _ref3.reference,
	              popper = _ref3.popper;
	          return _this4.config.offset({
	            placement: placement,
	            reference: reference,
	            popper: popper
	          });
	        };
	      } else {
	        offset = this.config.offset;
	      }

	      return offset;
	    };

	    _proto._getContainer = function _getContainer() {
	      if (this.config.container === false) {
	        return document.body;
	      }

	      if (isElement(this.config.container)) {
	        return this.config.container;
	      }

	      return SelectorEngine__default['default'].findOne(this.config.container);
	    };

	    _proto._getAttachment = function _getAttachment(placement) {
	      return AttachmentMap[placement.toUpperCase()];
	    };

	    _proto._setListeners = function _setListeners() {
	      var _this5 = this;

	      var triggers = this.config.trigger.split(' ');
	      triggers.forEach(function (trigger) {
	        if (trigger === 'click') {
	          EventHandler__default['default'].on(_this5.element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
	            return _this5.toggle(event);
	          });
	        } else if (trigger !== TRIGGER_MANUAL) {
	          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
	          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
	          EventHandler__default['default'].on(_this5.element, eventIn, _this5.config.selector, function (event) {
	            return _this5._enter(event);
	          });
	          EventHandler__default['default'].on(_this5.element, eventOut, _this5.config.selector, function (event) {
	            return _this5._leave(event);
	          });
	        }
	      });

	      this._hideModalHandler = function () {
	        if (_this5.element) {
	          _this5.hide();
	        }
	      };

	      EventHandler__default['default'].on(this.element.closest("." + CLASS_NAME_MODAL), 'hide.coreui.modal', this._hideModalHandler);

	      if (this.config.selector) {
	        this.config = _objectSpread(_objectSpread({}, this.config), {}, {
	          trigger: 'manual',
	          selector: ''
	        });
	      } else {
	        this._fixTitle();
	      }
	    };

	    _proto._fixTitle = function _fixTitle() {
	      var titleType = typeof this.element.getAttribute('data-original-title');

	      if (this.element.getAttribute('title') || titleType !== 'string') {
	        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
	        this.element.setAttribute('title', '');
	      }
	    };

	    _proto._enter = function _enter(event, context) {
	      var dataKey = this.constructor.DATA_KEY;
	      context = context || Data__default['default'].getData(event.delegateTarget, dataKey);

	      if (!context) {
	        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	        Data__default['default'].setData(event.delegateTarget, dataKey, context);
	      }

	      if (event) {
	        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	      }

	      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
	        context._hoverState = HOVER_STATE_SHOW;
	        return;
	      }

	      clearTimeout(context._timeout);
	      context._hoverState = HOVER_STATE_SHOW;

	      if (!context.config.delay || !context.config.delay.show) {
	        context.show();
	        return;
	      }

	      context._timeout = setTimeout(function () {
	        if (context._hoverState === HOVER_STATE_SHOW) {
	          context.show();
	        }
	      }, context.config.delay.show);
	    };

	    _proto._leave = function _leave(event, context) {
	      var dataKey = this.constructor.DATA_KEY;
	      context = context || Data__default['default'].getData(event.delegateTarget, dataKey);

	      if (!context) {
	        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	        Data__default['default'].setData(event.delegateTarget, dataKey, context);
	      }

	      if (event) {
	        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
	      }

	      if (context._isWithActiveTrigger()) {
	        return;
	      }

	      clearTimeout(context._timeout);
	      context._hoverState = HOVER_STATE_OUT;

	      if (!context.config.delay || !context.config.delay.hide) {
	        context.hide();
	        return;
	      }

	      context._timeout = setTimeout(function () {
	        if (context._hoverState === HOVER_STATE_OUT) {
	          context.hide();
	        }
	      }, context.config.delay.hide);
	    };

	    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
	      for (var trigger in this._activeTrigger) {
	        if (this._activeTrigger[trigger]) {
	          return true;
	        }
	      }

	      return false;
	    };

	    _proto._getConfig = function _getConfig(config) {
	      var dataAttributes = Manipulator__default['default'].getDataAttributes(this.element);
	      Object.keys(dataAttributes).forEach(function (dataAttr) {
	        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
	          delete dataAttributes[dataAttr];
	        }
	      });

	      if (config && typeof config.container === 'object' && config.container.jquery) {
	        config.container = config.container[0];
	      }

	      config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), dataAttributes), typeof config === 'object' && config ? config : {});

	      if (typeof config.delay === 'number') {
	        config.delay = {
	          show: config.delay,
	          hide: config.delay
	        };
	      }

	      if (typeof config.title === 'number') {
	        config.title = config.title.toString();
	      }

	      if (typeof config.content === 'number') {
	        config.content = config.content.toString();
	      }

	      typeCheckConfig(NAME, config, this.constructor.DefaultType);

	      if (config.sanitize) {
	        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
	      }

	      return config;
	    };

	    _proto._getDelegateConfig = function _getDelegateConfig() {
	      var config = {};

	      if (this.config) {
	        for (var key in this.config) {
	          if (this.constructor.Default[key] !== this.config[key]) {
	            config[key] = this.config[key];
	          }
	        }
	      }

	      return config;
	    };

	    _proto._cleanTipClass = function _cleanTipClass() {
	      var tip = this.getTipElement();
	      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

	      if (tabClass !== null && tabClass.length > 0) {
	        tabClass.map(function (token) {
	          return token.trim();
	        }).forEach(function (tClass) {
	          return tip.classList.remove(tClass);
	        });
	      }
	    } // _handlePopperPlacementChange(popperData) {
	    //   console.log(popperData)
	    //   const popperInstance = popperData.elements.popper
	    //   this.tip = document.getElementById(popperInstance.getAttribute('id'))
	    //   console.log(this.tip)
	    //   this._cleanTipClass()
	    //   this._addAttachmentClass(this._getAttachment(popperData.placement))
	    // }
	    ;

	    _proto._fixTransition = function _fixTransition() {
	      var tip = this.getTipElement();
	      var initConfigAnimation = this.config.animation;

	      if (tip.getAttribute('data-popper-placement') !== null) {
	        return;
	      }

	      tip.classList.remove(CLASS_NAME_FADE);
	      this.config.animation = false;
	      this.hide();
	      this.show();
	      this.config.animation = initConfigAnimation;
	    } // Static
	    ;

	    Tooltip.jQueryInterface = function jQueryInterface(config) {
	      return this.each(function () {
	        var data = Data__default['default'].getData(this, DATA_KEY);

	        var _config = typeof config === 'object' && config;

	        if (!data && /dispose|hide/.test(config)) {
	          return;
	        }

	        if (!data) {
	          data = new Tooltip(this, _config);
	        }

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError("No method named \"" + config + "\"");
	          }

	          data[config]();
	        }
	      });
	    };

	    Tooltip.getInstance = function getInstance(element) {
	      return Data__default['default'].getData(element, DATA_KEY);
	    };

	    _createClass(Tooltip, null, [{
	      key: "VERSION",
	      get: function get() {
	        return VERSION;
	      }
	    }, {
	      key: "Default",
	      get: function get() {
	        return Default;
	      }
	    }, {
	      key: "NAME",
	      get: function get() {
	        return NAME;
	      }
	    }, {
	      key: "DATA_KEY",
	      get: function get() {
	        return DATA_KEY;
	      }
	    }, {
	      key: "Event",
	      get: function get() {
	        return Event$1;
	      }
	    }, {
	      key: "EVENT_KEY",
	      get: function get() {
	        return EVENT_KEY;
	      }
	    }, {
	      key: "DefaultType",
	      get: function get() {
	        return DefaultType;
	      }
	    }]);

	    return Tooltip;
	  }();

	  var $ = getjQuery();
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .tooltip to jQuery only if jQuery is present
	   */

	  /* istanbul ignore if */

	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    $.fn[NAME] = Tooltip.jQueryInterface;
	    $.fn[NAME].Constructor = Tooltip;

	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Tooltip.jQueryInterface;
	    };
	  }

	  return Tooltip;

	})));

	});

	window.addEventListener('load', () => {
	  [...document.querySelectorAll('[data-toggle="tooltip"]')]
	    .map(tooltipNode => new tooltip(tooltipNode));
	});

}(null, require$$3));
