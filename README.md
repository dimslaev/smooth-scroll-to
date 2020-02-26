### Description

Custom smooth scrolling in pure JS (no jQuery).

### Usage

**1. Choose duration and easing**
Use the [visualizer](https://dimslaev.github.io/smooth-scroll-visualizer) to find the right scroll duration and easing for your needs.

**2. Copy the easing function**
Check out `easings.js`.

**3. Include the script**
In your html:

```html
<script src="smoothScrollTo.min.js"></script>
```

**4. Attach the click handler**

```html
<a href="#target-section" onclick="scrollToPage('#target-section')"
  >Scroll to target section</a
>

<section id="target-section">
  Target Section
</section>

<script>
  var options = {
    duration: 600,
    easing: function(t) {
      return Math.pow(t, 5);
    },
    callback: function() {
      console.log("scroll end");
    },
  };

  var scrollToPage = function(selector) {
    smoothScrollTo(selector, options);
    return false;
  };
</script>
```
