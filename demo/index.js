window.onload = function() {
  "use strict";
  var fieldDuration = document.querySelector("#duration");
  var fieldEasing = document.querySelector("#easing");
  var SVGs = document.querySelectorAll("[data-svg]");
  var durationsSelectHTML = "";
  var easingsSelectHTML = "";
  var DURATIONS = [600, 900, 1200, 1500, 2000];
  var EASINGS = [
    "linear",
    "easeIn",
    "easeOut",
    "easeInQuad",
    "easeOutQuad",
    "easeInOutQuad",
    "easeInCubic",
    "easeOutCubic",
    "easeInOutCubic",
    "easeInQuart",
    "easeOutQuart",
    "easeInOutQuart",
    "easeInQuint",
    "easeOutQuint",
    "easeInOutQuint",
  ];

  for (var i = 0; i < EASINGS.length; i++) {
    var selected = i === 2 ? " selected" : "";
    easingsSelectHTML +=
      '<option value="' +
      EASINGS[i] +
      '"' +
      selected +
      ">" +
      EASINGS[i] +
      "</option>";
  }
  fieldEasing.innerHTML = easingsSelectHTML;

  for (var i = 0; i < DURATIONS.length; i++) {
    var selected = i === 2 ? " selected" : "";
    durationsSelectHTML +=
      '<option value="' +
      DURATIONS[i] +
      '"' +
      selected +
      ">" +
      DURATIONS[i] +
      "</option>";
  }
  fieldDuration.innerHTML = durationsSelectHTML;

  for (var i = 0; i < SVGs.length; i++) {
    var type = SVGs[i].dataset.svg;
    var svg = '<svg viewBox="0 0 512 512">';
    if (type === "up")
      svg +=
        '<path d="M5.84299 379.614C13.646 387.433 26.308 387.445 34.128 379.643L241.858 172.344C249.657 164.546 262.344 164.547 270.157 172.359L477.872 379.643C485.691 387.446 498.353 387.433 506.157 379.614C513.959 371.795 513.946 359.132 506.128 351.33L298.427 144.06C286.726 132.361 271.361 126.513 255.994 126.513C240.636 126.513 225.275 132.359 213.589 144.046L5.87201 351.33C-1.94599 359.132 -1.95901 371.795 5.84299 379.614Z" fill="black"/>';
    if (type === "down")
      svg +=
        '<path d="M506.157,132.386c-7.803-7.819-20.465-7.831-28.285-0.029l-207.73,207.299c-7.799,7.798-20.486,7.797-28.299-0.015L34.128,132.357c-7.819-7.803-20.481-7.79-28.285,0.029c-7.802,7.819-7.789,20.482,0.029,28.284l207.701,207.27c11.701,11.699,27.066,17.547,42.433,17.547c15.358,0,30.719-5.846,42.405-17.533L506.128,160.67C513.946,152.868,513.959,140.205,506.157,132.386z"/>';

    svg += "</svg>";

    SVGs[i].innerHTML = svg;
  }

  function scrollToPage(selector) {
    var options = {
      duration: fieldDuration.value,
      easing: fieldEasing.value,
      callback: function() {
        console.log("scroll end");
      },
    };

    smoothScrollTo(selector, options);

    return false;
  }

  window.scrollToPage = scrollToPage;
};
