const SmoothScrollTo = require("./index.js");

describe("SmoothScrollTo", () => {
  it("should calculate from", () => {
    const windowMock = {
      innerHeight: 700,
      innerWidth: 700,
      pageYOffset: 0,
      pageXOffset: 0
    };

    const documentMock = {
      body: {
        offsetHeight: 1000,
        offsetWidth: 1000
      }
    };

    const targetMock = {
      scrollWidth: 0,
      scrollHeight: 0,
      clientWidth: 0,
      clientHeight: 0
    };

    const getFromCoordinate = (SmoothScrollTo.prototype.getFromCoordinate = jest.fn());
    const instance = new SmoothScrollTo({ to: 300 });
    const expected = 300;

    instance.init();

    console.log(instance);

    expect(getFromCoordinate).toHaveBeenCalledTimes(1);
    expect(instance.from).toEqual(expected);
  });
});
