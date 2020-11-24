const SmoothScrollTo = require("./smooth-scroll-to.js");

const NOOP = () => {};

const defaultTargetMock = {
  clientWidth: 0,
  clientHeight: 0,
  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  addEventListener: NOOP,
  removeEventListener: NOOP
};

describe("SmoothScrollTo", () => {
  it("should calculate correctly `from` and `to` coordinates on the `y` axis", () => {
    const targetMock = { ...defaultTargetMock, scrollHeight: 200, clientHeight: 100 };
    const instance = new SmoothScrollTo({ target: targetMock, axis: "y", to: 100 });

    const expectedFrom = 0;
    const expectedTo = 100;

    instance.init();

    expect(instance.from).toEqual(expectedFrom);
    expect(instance.to).toEqual(expectedTo);
  });

  it("should calculate correctly `from` and `to` coordinates on the `x` axis", () => {
    const targetMock = { ...defaultTargetMock, scrollWidth: 200, clientWidth: 100 };
    const instance = new SmoothScrollTo({ target: targetMock, axis: "x", to: 100 });

    const expectedFrom = 0;
    const expectedTo = 100;

    instance.init();

    expect(instance.from).toEqual(expectedFrom);
    expect(instance.to).toEqual(expectedTo);
  });

  it("should return the max scroll value for `to` in case it falls outside the container on the `y` axis", () => {
    const targetMock = { ...defaultTargetMock, scrollHeight: 200, clientHeight: 100 };
    const instance = new SmoothScrollTo({ target: targetMock, axis: "y", to: 1000 });

    const expectedTo = 100;

    instance.init();

    expect(instance.to).toEqual(expectedTo);
  });

  it("should return the max scroll value for `to` in case it falls outside the container on the `x` axis", () => {
    const targetMock = { ...defaultTargetMock, scrollWidth: 200, clientWidth: 100 };
    const instance = new SmoothScrollTo({ target: targetMock, axis: "x", to: 1000 });

    const expectedTo = 100;

    instance.init();

    expect(instance.to).toEqual(expectedTo);
  });

  it("should calculate correctly the distance between `from` and `to` on the `y` axis", () => {
    const targetMock = { ...defaultTargetMock, scrollTop: 50, scrollHeight: 200, clientHeight: 100 };
    const instance = new SmoothScrollTo({ target: targetMock, axis: "y", to: 100 });

    const expectedFrom = 50;
    const expectedTo = 100;
    const expectedDistance = 50;

    instance.init();

    expect(instance.distance).toEqual(expectedDistance);
  });

  it("should calculate correctly the distance between `from` and `to` on the `x` axis", () => {
    const targetMock = { ...defaultTargetMock, scrollLeft: 50, scrollWidth: 200, clientWidth: 100 };
    const instance = new SmoothScrollTo({ target: targetMock, axis: "x", to: 100 });

    const expectedFrom = 50;
    const expectedTo = 100;
    const expectedDistance = 50;

    instance.init();

    expect(instance.distance).toEqual(expectedDistance);
  });

  it("should call a callback at the end of a scroll", () => {
    const callback = jest.fn();
    const targetMock = { ...defaultTargetMock, scrollTop: 0, scrollHeight: 200, clientHeight: 100 };
    const instance = new SmoothScrollTo({ target: targetMock, axis: "y", to: 100, duration: 0, callback });

    instance.init();

    requestAnimationFrame(() => {
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
