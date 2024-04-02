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

## 3. Frame Skipping Resize

```js
function animate()
{
    requestAnimationFrame(animate);

    if (skipFrames <= 0 || needsRender)
    {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;

        renderer.render(scene, camera);

        skipFrames = 2;
        needsRender = false;
    }
    else 
    {
        skipFrames--;
    }
}
```

With the results being:

```bash
FPS: 40
```

## 4. Refined Progressive Scaling Resize

```js
function onWindowResize() 
{
    desiredWidth = window.innerWidth;
    desiredHeight = window.innerHeight;

    // Optional: Immediate resize for a responsive feel
    // Can comment these out if you want purely smooth resizing without immediate adjustment
    camera.aspect = desiredWidth / desiredHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(desiredWidth, desiredHeight);
}

function smoothResize() 
{
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) 
    {
        const newWidth = THREE.MathUtils.lerp(canvas.width, desiredWidth, 0.05);
        const newHeight = THREE.MathUtils.lerp(canvas.height, desiredHeight, 0.05);
        renderer.setSize(newWidth, newHeight, false);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    }
}
```

With the results being:

```bash
FPS: 40
```

## 5. Throttling Resize

```js
function throttle(callback, limit) 
{
    let waiting = false;
    return function () {
        if (!waiting) 
        {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(function () {
                waiting = false;
            }, limit);
        }
     }
}
```

With the results being:

```bash
FPS: 40
```
