# Uptime Widget

A web component that presents an uptime graph for the status of the Ably realtime network over the last 90 days.

### Load the web component definition

*Directly load the component from a CDN*

```html
<script type="module">
  // Alternative CDN (https://www.skypack.dev/view/uptime-widget)
  import "https://cdn.skypack.dev/uptime-widget";
</script>
```

*Alternatively install using NPM*

```bash
npm install -S uptime-widget
```

And use it in your javascript ...

```javascript
// the WebComponent definition auto executes
import "uptime-widget";
```

### Place the custom HTML tag in the DOM

```html
<uptime-widget
  serverURL="https://status.ably.com/embed/uptime.json"
  href="https://status.ably.com"
  text="visit status site"
/>
```

- **serverURL** the JSON endpoint that serves the 90 day data, and legend metadata
- **href** and **text** - are optional, and create the *call-to-action* link

### CSS styling the CTA link

Web Componets can not be styled. The internal styling belongs to the component, however the author can expose a `part` to the external host, which can be styled using the `::part()` psuedo selector.

```css
uptime-widget::part(cta) {
	color: red;
}
```

The `background-color` and `color` of this widget are inherited values from the host.

