# HTML Resize Events

Different Html &amp; THREE JS Resize Events

## 1. Adaptive Detail Level (LOD) Resize

```js
function adjustLOD()
{
    const width = renderer.domElement.width;
    const thresholdMedium = 800;
    const thresholdLow = 500;

    if (width < thresholdLow && box.geometry !== boxGeometryLow)
    {
        box.geometry.dispose();
        box.geometry = boxGeometryLow;
    }
    else if (width < thresholdMedium && box.geometry !== boxGeometryMedium)
    {
        box.geometry.dispose();
        box.geometry = boxGeometryMedium;
    }
    else if (width >= thresholdMedium && box.geometry !== boxGeometryHigh)
    {
        box.geometry.dispose();
        box.geometry = boxGeometryHigh;
    }
}
```

With the results being:

```bash
FPS: 40
```

## 2. CSS Transition Scaling Resize

```css
canvas 
{
    transition: width 0.5s ease-out, height 0.5s ease-out;
    width: 100% !important;
    height: 100% !important;
}
```

With the results being:

```bash
FPS: 40
```
