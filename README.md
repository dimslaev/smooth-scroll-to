### Description

Pure js smooth scroll functionality using a class syntax.

### API

| OPTION   | TYPE     | DEFAULT VALUE | DESCRIPTION                                                                                          |
| -------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| axis     | String   | "y"           | Can scroll along the "x" or the "y" axis.                                                            |
| callback | Function | NOOP          | Called when scrolling has finished.                                                                  |
| duration | Number   | 400           | Duration of the scroll in miliseconds.                                                               |
| easing   | String   | "easeOut"     | Easing type - `linear` ,`easeOut`, `easeIn`, `easeInOut`.                                            |
| target   | Object   | window        | Can be window or any DOM element with `overflow: auto`.                                              |
| to       | Number   | 0             | X or Y coordinate to scroll to (relative to the target element, not to the current scroll position). |

### Code Examples

```javascript
window.addEventListener("load", () => {
  document.querySelector("#button").addEventListener("click", () => {
    const smoothScroll = new SmoothScrollTo({
      to: 1200,
      callback: () => {
        console.log("end");
      }
    });

    smoothScroll.init();
  });
});
```
