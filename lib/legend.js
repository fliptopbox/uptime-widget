function legendKeys(metadata) {
  const div = document.createElement("div");
  const HTML = Object.entries(metadata)
    .map(
      ([id, text]) => `
        <span class="legend-key">
            <i class="state-${id}"></i>
            <strong>${text}</strong>
        </span>`
    )
    .join("");

  div.className = "legend-items";
  div.innerHTML = HTML;

  return div;
}

function legendCTA(href, text) {
  if (!href && !text) return null;

  const span = document.createElement("span");
  span.className = "legend-cta";
  span.innerHTML = `<a href="${href}">${text}</a>`;

  return span;
}

export default function legend(metadata, href, text) {
  const footer = document.createElement("footer");
  const keys = legendKeys(metadata);
  const cta = legendCTA(href, text);

  keys && footer.append(keys);
  cta && footer.append(cta);

  return footer;
}
