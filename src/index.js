class SmoothScroll {
  constructor(options) {
    const {
      axis,
      callback,
      direction,
      distance,
      duration,
      easing,
      target,
    } = options;

    this.EASINGS = {
      linear: function (t) {
        return t;
      },
      easeIn: function (t) {
        return Math.pow(t, 5);
      },
      easeOut: function (t) {
        return Math.pow(--t, 5) + 1;
      },
      easeInQuad: function (t) {
        return t * t;
      },
      easeOutQuad: function (t) {
        return t * (2 - t);
      },
      easeInOutQuad: function (t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
    };

    this.DEFAULT_DURATION = 400;
    this.DEFAULT_DISTANCE = 0;
    this.DIRECTION_ASC = "asc";
    this.DIRECTION_DESC = "desc";
    this.DEFAUTL_DIRECTION = this.DIRECTION_ASC;
    this.AXIS_X = "x";
    this.AXIS_Y = "y";

    this.axis = typeof axis !== "undefined" ? axis : this.AXIS_Y;
    this.callback = typeof callback !== "undefined" ? callback : function () {};
    this.direction =
      typeof direction !== "undefined" ? direction : this.DEFAUTL_DIRECTION;
    this.distance =
      typeof distance !== "undefined" ? distance : this.DEFAULT_DISTANCE;
    this.duration =
      typeof duration !== "undefined" ? duration : this.DEFAULT_DURATION;
    this.easing = typeof easing !== "undefined" ? easing : this.EASINGS.easeOut;
    this.target = typeof target !== "undefined" ? target : window;
  }

  init() {
    this.validateOptions();

    this.startTime = performance.now();
    this.endTime = this.startTime + this.duration;

    this.startCoordinate = this.getStartCoordinate();
    this.endCoordinate = this.getEndCoordinate();

    this.hasBeenInterrupted = false;

    this.boundScrollStop = this.onScrollStop.bind(this);

    this.onScrollStart();
  }

  validateOptions() {
    if (this.axis !== this.AXIS_X && this.axis !== this.AXIS_Y) {
      throw new Error("SmoothScroll: axis must be either x or y.");
    }

    if (typeof this.callback !== "function") {
      throw new Error("SmoothScroll: callback must be a function.");
    }

    if (
      typeof this.direction !== "string" ||
      (this.direction !== this.DIRECTION_ASC &&
        this.direction !== this.DIRECTION_DESC)
    ) {
      throw new Error(
        "SmoothScroll: direction must be a string - either `asc` or `desc`."
      );
    }

    if (typeof this.distance !== "number") {
      throw new Error("SmoothScroll: distance must be a number.");
    }

    if (typeof this.duration !== "number") {
      throw new Error("SmoothScroll: duration must be a number.");
    }

    if (typeof this.target === "object" && this.target !== null) {
    } else {
      throw new Error("SmoothScroll: target must be an object (DOM element).");
    }

    if (this.distance === 0) {
      console.warn("SmoothScroll: no distance to scroll.");
    }
  }

  getStartCoordinate() {
    let startCoordinate = 0;

    if (this.target === window) {
      if (this.axis === this.AXIS_Y) {
        startCoordinate = pageYOffset;
      } else {
        startCoordinate = pageXOffset;
      }
    } else {
      if (this.axis === this.AXIS_Y) {
        startCoordinate = this.target.scrollTop;
      } else {
        startCoordinate = this.target.scrollLeft;
      }
    }

    return startCoordinate;
  }

  getEndCoordinate() {
    if (this.direction === this.DIRECTION_ASC) {
      return this.getEndCoordinateAscending();
    } else {
      return this.getEndCoordinateDescending();
    }
  }

  getEndCoordinateAscending() {
    const endCoordinate = this.startCoordinate + this.distance;

    if (this.axis === this.AXIS_Y) {
      let maxScrollTop = 0;

      if (this.target === window) {
        maxScrollTop = document.body.offsetHeight - window.innerHeight;
      } else {
        maxScrollTop = this.target.scrollHeight - this.target.clientHeight;
      }

      return Math.min(endCoordinate, maxScrollTop);
    } else {
      let maxScrollLeft = 0;

      if (this.target === window) {
        maxScrollLeft = document.body.offsetWidth - window.innerWidth;
      } else {
        maxScrollLeft = this.target.scrollWidth - this.target.clientWidth;
      }
      return Math.min(endCoordinate, maxScrollLeft);
    }
  }

  getEndCoordinateDescending() {
    const endCoordinate = this.startCoordinate - this.distance;
    return Math.max(0, endCoordinate);
  }

  getProgressCoordinate(displacement) {
    if (this.direction === this.DIRECTION_ASC) {
      return this.startCoordinate + displacement;
    } else {
      return this.startCoordinate - displacement;
    }
  }

  checkProgressCoordinate(coordinate) {
    if (this.direction === this.DIRECTION_ASC) {
      return coordinate < this.endCoordinate;
    } else {
      return coordinate > this.endCoordinate;
    }
  }

  onScrollStop() {
    this.hasBeenInterrupted = true;
    this.target.removeEventListener("mousewheel", this.boundScrollStop);
  }

  onScrollStart() {
    requestAnimationFrame(this.tick.bind(this));
    this.target.addEventListener("mousewheel", this.boundScrollStop);
  }

  onScrollEnd() {
    this.callback();
    this.target.removeEventListener("mousewheel", this.boundScrollStop);
  }

  scroll(coordinate) {
    if (this.target === window) {
      if (this.axis === this.AXIS_Y) {
        window.scrollTo(0, coordinate);
      } else {
        window.scrollTo(coordinate, 0);
      }
    } else {
      if (this.axis === this.AXIS_Y) {
        this.target.scrollTop = coordinate;
      } else {
        this.target.scrollLeft = coordinate;
      }
    }
  }

  tick() {
    if (this.hasBeenInterrupted) return;

    const elapsed = performance.now() - this.startTime;
    const progress = Math.min(elapsed / this.endTime, 1);
    const displacement = this.easing(progress) * this.distance;
    const progressCoordinate = this.getProgressCoordinate(displacement);

    if (this.checkProgressCoordinate(progressCoordinate)) {
      this.scroll(progressCoordinate);
      requestAnimationFrame(this.tick.bind(this));
    } else {
      this.scroll(this.endCoordinate);
      requestAnimationFrame(this.onScrollEnd.bind(this));
    }
  }
}

window.SmoothScroll = SmoothScroll;
