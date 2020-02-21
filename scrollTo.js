function smoothScrollTo(selector, duration, easing, callback) {
  "use strict";
  var elem = document.querySelector(selector);
  var frame = null;
  var stopped = false;
  var y1 = window.pageYOffset || 0;
  var y2 = elem.offsetTop || 0;
  var distance = Math.abs(y2 - y1);
  var direction = y2 > y1 ? "down" : "up";
  var t1 = performance.now();
  var t2 = duration || 400;

  var easingFn =
    easing ||
    function(t) {
      return t;
    };

  var startScroll = function() {
    frame = requestAnimationFrame(tick);
    window.addEventListener("mousewheel", stopSmoothScroll);
  };

  var stopSmoothScroll = function() {
    cancelAnimationFrame(frame);
    frame = null;
    stopped = true;
  };

  var onScrollEnd = function() {
    cancelAnimationFrame(frame);
    frame = null;
    window.removeEventListener("mousewheel", stopSmoothScroll);
    if (callback && typeof callback === "function") callback();
  };

  var tick = function() {
    var elapsed = performance.now() - t1;
    var progress = Math.min(elapsed / t2, 1);
    var progreessDistance = easingFn(progress) * distance;
    var y =
      direction === "down" ? y1 + progreessDistance : y1 - progreessDistance;

    window.scrollTo(0, y);

    if (
      (progress < 1 &&
        direction === "down" &&
        y + window.innerHeight < document.body.offsetHeight) ||
      (progress < 1 && direction === "up" && y > 0)
    ) {
      requestAnimationFrame(tick);
    } else {
      onScrollEnd();
    }
  };

  if (!elem) {
    console.warn(
      "SmoothScrollTo: DOM element " + selector + " does not exist.",
    );
    return;
  }

  if (typeof easingFn !== "function") {
    console.warn("SmoothScrollTo: check easing function.");
    return;
  }

  if (stopped) {
    stopped = false;
    return;
  }

  if (distance === 0) {
    return;
  }

  startScroll();
}
