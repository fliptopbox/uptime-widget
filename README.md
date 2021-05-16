# Uptime Widget
A web component that presents an uptime graph for the status of the Ably realtime over the last 90 days.



### Load the web component definition

```javascript
// Alternative CDN (https://www.skypack.dev/view/uptime-widget)
// This can be loaded in the <head>
<script type="module" src="./lib/index.js"></script>
```



### Place the component in the DOM

```html
    <uptime-widget
      serverURL="https://status.ably.com/embed/uptime.json"
      href="https://status.ably.com"
      text="visit status site"
    />
```



- **serverURL** the JSON endpoint that serves the 90 day data, and legend metadata
- **href** and **text**  - and optinal call to action that link to the status site homepage

