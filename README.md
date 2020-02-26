### Description

Custom smooth scrolling in pure JS (no jQuery).

### Usage

**1. Choose duration and easing**
Use the [visualizer](https://dimslaev.github.io/smooth-scroll-to/demo) to find the right scroll duration and easing for your needs.

**2. Include smoothScrollTo**
In your html:

```html
<script src="smoothScrollTo.min.js"></script>
```

**3. Code Example**

```html
<a href="#target-section" onclick="scrollToSection('#target-section')"
  >Scroll to target section</a
>

<section id="target-section">
  Target Section
</section>

<script>
  var options = {
    duration: 600,
    easing: "easeInOutQuad",
    callback: function() {
      console.log("scroll end");
    },
  };

  var scrollToSection = function(selector) {
    smoothScrollTo(selector, options);
    return false;
  };
</script>
```
