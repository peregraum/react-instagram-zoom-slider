'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactSpring = require('react-spring');
var reactUseGesture = require('react-use-gesture');
var styled = require('styled-components');
var styled__default = _interopDefault(styled);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var defaultProps = {
  initialSlide: 0,
  maxScale: 4,
  minScale: 1,
  slideIndicatorTimeout: 5000,
  activeDotColor: '#4e99e9',
  dotColor: '#dadbdc'
};

function getLengthOfLine(point1, point2) {
  var middlePoint = {
    clientX: point2.clientX,
    clientY: point1.clientY
  };
  var legX = Math.abs(middlePoint.clientX - point1.clientX);
  var legY = Math.abs(middlePoint.clientY - point2.clientY);
  return Math.sqrt(Math.pow(legX, 2) + Math.pow(legY, 2));
}
function getMiddleOfLine(point1, point2) {
  return {
    clientX: Math.min(point2.clientX, point1.clientX) + Math.abs(point2.clientX - point1.clientX) / 2,
    clientY: Math.min(point2.clientY, point1.clientY) + Math.abs(point2.clientY - point1.clientY) / 2
  };
}
function getMiddleTouchOnElement(touches, boundingRect) {
  var middleTouch = getMiddleOfLine(touches[0], touches[1]);
  return {
    clientX: middleTouch.clientX - boundingRect.left,
    clientY: middleTouch.clientY - boundingRect.top
  };
}
function isTouchesInsideRect(touches, rect) {
  return Array.prototype.every.call(touches, function (touch) {
    return touch.clientX <= rect.right && touch.clientX >= rect.left && touch.clientY <= rect.bottom && touch.clientY >= rect.top;
  });
}
function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

function useSlider(_ref) {
  var initialSlide = _ref.initialSlide,
      slides = _ref.slides;

  var _useSpring = reactSpring.useSpring(function () {
    return {
      x: typeof window !== 'undefined' ? -window.innerWidth * initialSlide : 0,
      scale: 1,
      config: {
        tension: 270,
        clamp: true
      }
    };
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      _useSpring2$ = _useSpring2[0],
      x = _useSpring2$.x,
      scale = _useSpring2$.scale,
      set = _useSpring2[1];

  var index = React.useRef(initialSlide); // Slide numbers (for display purposes only)

  var _useState = React.useState(initialSlide),
      _useState2 = _slicedToArray(_useState, 2),
      currentSlide = _useState2[0],
      updateSlide = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      zooming = _useState4[0],
      setZooming = _useState4[1];

  var onScale = React.useCallback(function (slideProps) {
    set({
      scale: slideProps.scale
    });

    if (slideProps.scale === 1) {
      setZooming(false);
    } else {
      setZooming(true);
    }
  }, [set]);
  var bind = reactUseGesture.useDrag(function (_ref2) {
    var down = _ref2.down,
        _ref2$movement = _slicedToArray(_ref2.movement, 1),
        xMovement = _ref2$movement[0],
        _ref2$direction = _slicedToArray(_ref2.direction, 1),
        xDir = _ref2$direction[0],
        distance = _ref2.distance,
        _ref2$swipe = _slicedToArray(_ref2.swipe, 1),
        swipeX = _ref2$swipe[0],
        cancel = _ref2.cancel,
        touches = _ref2.touches;

    // We don't want to interrupt the pinch-to-zoom gesture
    if (touches > 1) {
      cancel();
    } // We have swiped past halfway


    if (!down && distance > window.innerWidth / 2) {
      // Move to the next slide
      var slideDir = xDir > 0 ? -1 : 1;
      index.current = clamp(index.current + slideDir, 0, slides.length - 1);
      set({
        x: -index.current * window.innerWidth + (down ? xMovement : 0),
        immediate: false
      });
    } else if (swipeX !== 0) {
      // We have detected a swipe - update the new index
      index.current = clamp(index.current - swipeX, 0, slides.length - 1);
    } // Animate the transition


    set({
      x: -index.current * window.innerWidth + (down ? xMovement : 0),
      immediate: down
    }); // Update the slide number for display purposes

    updateSlide(index.current);
  }, {
    axis: 'x',
    bounds: {
      left: currentSlide === slides.length - 1 ? 0 : -Infinity,
      right: index.current === 0 ? 0 : Infinity,
      top: 0,
      bottom: 0
    },
    rubberband: true,
    enabled: slides.length > 1
  });
  return [zooming, scale, currentSlide, bind, x, onScale];
}

function useZoom(_ref) {
  var minScale = _ref.minScale,
      maxScale = _ref.maxScale,
      onScale = _ref.onScale;
  var element = React.useRef(null);
  var initialBoundingRect = React.useRef(null);
  var firstTouch = React.useRef(null);
  var initialPinchLength = React.useRef(null);

  var _useSpring = reactSpring.useSpring(function () {
    return {
      scale: 1,
      middleTouchOnElement: [0, 0],
      translateX: 0,
      translateY: 0,
      immediate: true,
      onFrame: function onFrame(_ref2) {
        var currentScale = _ref2.scale;

        if (typeof onScale === 'function') {
          onScale({
            scale: currentScale
          });
        }
      }
    };
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      _useSpring2$ = _useSpring2[0],
      scale = _useSpring2$.scale,
      middleTouchOnElement = _useSpring2$.middleTouchOnElement,
      translateX = _useSpring2$.translateX,
      translateY = _useSpring2$.translateY,
      set = _useSpring2[1];

  var handleTouchStart = React.useCallback(function (event) {
    if (event.touches.length !== 2) {
      return;
    }

    initialBoundingRect.current = element.current.getBoundingClientRect();

    if (!event.touches.length || !isTouchesInsideRect(event.touches, initialBoundingRect.current)) {
      return;
    }

    event.preventDefault();

    var _event$touches = _slicedToArray(event.touches, 2),
        touch1 = _event$touches[0],
        touch2 = _event$touches[1];

    var _getMiddleTouchOnElem = getMiddleTouchOnElement(event.touches, initialBoundingRect.current),
        clientX = _getMiddleTouchOnElem.clientX,
        clientY = _getMiddleTouchOnElem.clientY;

    firstTouch.current = [clientX, clientY];
    initialPinchLength.current = getLengthOfLine(touch1, touch2);
    set({
      middleTouchOnElement: [clientX, clientY],
      immediate: true
    });
  }, [set]);
  var handleTouchMove = React.useCallback(function (event) {
    if (firstTouch.current) {
      var currentMiddleTouchOnElement = getMiddleTouchOnElement(event.touches, initialBoundingRect.current);

      var _event$touches2 = _slicedToArray(event.touches, 2),
          touch1 = _event$touches2[0],
          touch2 = _event$touches2[1];

      var currentPinchLength = getLengthOfLine(touch1, touch2);
      set({
        scale: clamp(currentPinchLength / initialPinchLength.current, minScale, maxScale),
        translateX: currentMiddleTouchOnElement.clientX - firstTouch.current[0],
        translateY: currentMiddleTouchOnElement.clientY - firstTouch.current[1],
        immediate: true
      });
    }
  }, [set]);
  var handleTouchEnd = React.useCallback(function () {
    set({
      scale: 1,
      translateX: 0,
      translateY: 0,
      immediate: false
    });
    firstTouch.current = null;
    initialPinchLength.current = null;
    initialBoundingRect.current = null;
  }, [set]);
  React.useEffect(function () {
    element.current.ontouchstart = handleTouchStart;
    element.current.ontouchmove = handleTouchMove;
    element.current.ontouchend = handleTouchEnd;
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
  return [element, scale, translateX, translateY, middleTouchOnElement];
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  background: ", ";\n  border-radius: 50%;\n  transition: width 300ms ease-in-out, height 300ms ease-in-out, margin 300ms ease-in-out;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 20px 0;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    width: ", "px;\n    height: ", "px;\n    margin: 0 ", "px;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var TOTAL_SPACE = 10;
var SIZES = [6, 4, 2];

var getSize = function getSize() {
  return function (props) {
    var size = SIZES[props.distance] || 0;
    var margin = size !== 0 ? (TOTAL_SPACE - size) / 2 : 0;
    return styled.css(_templateObject(), size, size, margin);
  };
};

var Dots = styled__default.div(_templateObject2());
var Dot = styled__default.div(_templateObject3(), getSize(), function (props) {
  return props.active ? props.activeDotColor : props.dotColor;
});

function Dots$1(_ref) {
  var activeDotColor = _ref.activeDotColor,
      centerDots = _ref.centerDots,
      currentSlide = _ref.currentSlide,
      dotColor = _ref.dotColor,
      totalSlides = _ref.totalSlides;
  var centerOffset = React.useRef(0);
  var slideOffset = React.useRef(0);
  var currentCenterOffset = currentSlide - slideOffset.current;

  if (currentCenterOffset >= 0 && currentCenterOffset < centerDots) {
    centerOffset.current = currentCenterOffset;
  } else {
    slideOffset.current = currentSlide - centerOffset.current;
  }

  return React__default.createElement(Dots, null, _toConsumableArray(Array(totalSlides)).map(function (_, idx) {
    var centerPage = parseInt(centerDots / 2, 10) + slideOffset.current;
    var distance = Math.abs(idx - centerPage);
    var scaledDistance = clamp(distance - parseInt(centerDots / 2, 10), 0, 3);
    return React__default.createElement(Dot, {
      dotColor: dotColor,
      activeDotColor: activeDotColor,
      active: idx === currentSlide,
      distance: scaledDistance // eslint-disable-next-line react/no-array-index-key
      ,
      key: idx
    });
  }));
}
Dots$1.propTypes = {
  activeDotColor: PropTypes.string,
  centerDots: PropTypes.number,
  currentSlide: PropTypes.number.isRequired,
  dotColor: PropTypes.string,
  totalSlides: PropTypes.number.isRequired
};
Dots$1.defaultProps = {
  activeDotColor: '#4e99e9',
  centerDots: 3,
  dotColor: '#dadbdc'
};

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  width: 100vw;\n  height: auto;\n  display: block;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Slide = styled__default.div(_templateObject$1());

var AnimatedSlide = reactSpring.animated(Slide);
function Slide$1(_ref) {
  var children = _ref.children,
      onScale = _ref.onScale,
      minScale = _ref.minScale,
      maxScale = _ref.maxScale;

  var _useZoom = useZoom({
    minScale: minScale,
    maxScale: maxScale,
    onScale: onScale
  }),
      _useZoom2 = _slicedToArray(_useZoom, 5),
      element = _useZoom2[0],
      scale = _useZoom2[1],
      translateX = _useZoom2[2],
      translateY = _useZoom2[3],
      middleTouchOnElement = _useZoom2[4];

  return React__default.createElement(AnimatedSlide, {
    ref: element,
    style: {
      transform: reactSpring.interpolate([scale, translateX, translateY], function (sc, x, y) {
        return "translate3d(".concat(x, "px, ").concat(y, "px, 0) scale3d(").concat(sc, ", ").concat(sc, ", 1)");
      }),
      transformOrigin: middleTouchOnElement.interpolate(function (x, y) {
        return "".concat(x, "px ").concat(y, "px 0");
      })
    }
  }, children);
}
Slide$1.propTypes = {
  children: PropTypes.node.isRequired,
  onScale: PropTypes.func,
  minScale: PropTypes.number,
  maxScale: PropTypes.number
};
Slide$1.defaultProps = {
  onScale: undefined,
  maxScale: defaultProps.maxScale,
  minScale: defaultProps.minScale
};

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  background-color: rgba(0, 0, 0, 0.7);\n  color: white;\n  display: inline-block;\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  border-radius: 15px;\n  font-size: 14px;\n  padding: 6px;\n  letter-spacing: 1px;\n  user-select: none;\n  pointer-events: none;\n  line-height: 1;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var SlideIndicator = styled__default.div(_templateObject$2());

var AnimatedSlideIndicator = reactSpring.animated(SlideIndicator);
function SlideIndicator$1(_ref) {
  var currentSlide = _ref.currentSlide,
      inFront = _ref.inFront,
      slideIndicatorTimeout = _ref.slideIndicatorTimeout,
      totalSlides = _ref.totalSlides;

  var _useState = React.useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  React.useEffect(function () {
    if (slideIndicatorTimeout !== null) {
      var timer = setTimeout(function () {
        setVisible(false);
      }, slideIndicatorTimeout);
      return function () {
        return clearTimeout(timer);
      };
    }
  }, []);
  var transitions = reactSpring.useTransition(isVisible, null, {
    from: {
      opacity: 1
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });

  if (totalSlides < 2) {
    return null;
  }

  return React__default.createElement(React__default.Fragment, null, transitions.map(function (_ref2) {
    var item = _ref2.item,
        key = _ref2.key,
        props = _ref2.props;
    return item && React__default.createElement(AnimatedSlideIndicator, {
      key: key,
      inFront: inFront,
      style: _objectSpread2({}, props)
    }, currentSlide + 1, "/", totalSlides);
  }));
}
SlideIndicator$1.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  inFront: PropTypes.bool,
  slideIndicatorTimeout: PropTypes.number,
  totalSlides: PropTypes.number.isRequired
};
SlideIndicator$1.defaultProps = {
  inFront: true,
  slideIndicatorTimeout: defaultProps.slideIndicatorTimeout
};

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  z-index: ", ";\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 20;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: grid;\n  grid-auto-flow: column;\n  width: 100%;\n  user-select: none;\n  touch-action: pan-y;\n  -webkit-user-drag: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  z-index: ", ";\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var Slider = styled__default.div(_templateObject$3(), function (props) {
  return props.isZooming ? 20 : 0;
});
var Overlay = styled__default.div(_templateObject2$1());
var SlideOverlay = styled__default.div(_templateObject3$1(), function (props) {
  return props.inFront ? 10 : 0;
});

var AnimatedOverlay = reactSpring.animated(Overlay);
var AnimatedSlider = reactSpring.animated(Slider);
function Slider$1(_ref) {
  var initialSlide = _ref.initialSlide,
      slides = _ref.slides,
      slideOverlay = _ref.slideOverlay,
      slideIndicatorTimeout = _ref.slideIndicatorTimeout,
      activeDotColor = _ref.activeDotColor,
      dotColor = _ref.dotColor;

  var _useSlider = useSlider({
    initialSlide: initialSlide,
    slides: slides
  }),
      _useSlider2 = _slicedToArray(_useSlider, 6),
      zooming = _useSlider2[0],
      scale = _useSlider2[1],
      currentSlide = _useSlider2[2],
      bind = _useSlider2[3],
      x = _useSlider2[4],
      onScale = _useSlider2[5];

  return React__default.createElement("div", null, zooming && React__default.createElement(AnimatedOverlay, {
    style: {
      backgroundColor: scale.interpolate({
        range: [1, 2, 10],
        output: [0, 0.7, 0.7]
      }).interpolate(function (opacity) {
        return "rgba(0, 0, 0, ".concat(opacity, ")");
      })
    }
  }), React__default.createElement(SlideOverlay, {
    inFront: !zooming
  }, slideOverlay, React__default.createElement(SlideIndicator$1, {
    slideIndicatorTimeout: slideIndicatorTimeout,
    currentSlide: currentSlide,
    totalSlides: slides.length
  })), React__default.createElement(AnimatedSlider, _extends({
    isZooming: zooming // eslint-disable-next-line react/jsx-props-no-spreading

  }, bind(), {
    style: {
      transform: x.interpolate(function (slideX) {
        return "translateX(".concat(slideX, "px");
      })
    }
  }), slides.map(function (slide, idx) {
    return (// eslint-disable-next-line react/no-array-index-key
      React__default.createElement(Slide$1, {
        onScale: onScale,
        key: idx
      }, slide)
    );
  })), slides.length > 1 && React__default.createElement(Dots$1, {
    totalSlides: slides.length,
    currentSlide: currentSlide,
    centerDots: slides.length < 6 ? slides.length : undefined,
    dotColor: dotColor,
    activeDotColor: activeDotColor
  }));
}
Slider$1.propTypes = {
  /** Index of the slide to be rendered by default */
  initialSlide: PropTypes.number,

  /** List of slides to render */
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,

  /** Maximum zoom level */
  maxScale: PropTypes.number,

  /** Minimum zoom level */
  minScale: PropTypes.number,

  /** Content to overlay on the slider */
  slideOverlay: PropTypes.node,

  /** Time in ms until the slide indicator fades out. Set to `null` to disable this behavior. */
  slideIndicatorTimeout: PropTypes.number,

  /** Pagination dot color for the active slide */
  activeDotColor: PropTypes.string,

  /** Pagination dot color for all other slides */
  dotColor: PropTypes.string
};
Slider$1.defaultProps = {
  initialSlide: defaultProps.initialSlide,
  maxScale: defaultProps.maxScale,
  minScale: defaultProps.minScale,
  slideOverlay: null,
  slideIndicatorTimeout: defaultProps.slideIndicatorTimeout,
  activeDotColor: defaultProps.activeDotColor,
  dotColor: defaultProps.dotColor
};

exports.Dots = Dots$1;
exports.Slide = Slide$1;
exports.SlideIndicator = SlideIndicator$1;
exports.StyledOverlay = Overlay;
exports.StyledSlideOverlay = SlideOverlay;
exports.StyledSlider = Slider;
exports.default = Slider$1;
exports.useSlider = useSlider;
exports.useZoom = useZoom;
//# sourceMappingURL=index.js.map
