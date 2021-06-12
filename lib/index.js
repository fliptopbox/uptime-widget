/**/
const template = document.createElement("template");

template.innerHTML = `
    <style>${stylesheet()}</style>
    <main>
        <header style="display:none"></header>
        <footer style="display:none"></footer>
    </main>`;

function stylesheet() {
    return `
:host {}

main { display:block; }

footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0 0 26px 0;
}

li {
    flex: auto;
    display: block;
    height: 40px;
    margin: 0 1px;
}

li:nth-child(30n) {
    margin-right: 3%;
}

li:last-child {
    margin-right: 0px;
}

.state-up {
    background: #1cd41c;
}
.state-trouble {
    background: orange;
}
.state-down {
    background: red;
}


.legend-items {
    display: flex;
}

.legend-key {
    display: flex;
    align-items: center;
    margin-right: 16px;
}

.legend-key i {
    width: 26px;
    height: 26px;
    display: block;
    margin-right: 8px;
    border-radius: 26px;

}
`;
}


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
  span.innerHTML = `<a href="${href}" part="cta">${text}</a>`;

  return span;
}

function legend(metadata, href, text) {
  const footer = document.createElement("footer");
  const keys = legendKeys(metadata);
  const cta = legendCTA(href, text);

  keys && footer.append(keys);
  cta && footer.append(cta);

  return footer;
}
function item(row, i) {
  const { label, color } = row;
  const state = row.class;
  return `<li
            class="state-${state} color-${color}"
            data-index="${i}"
            data-label="${label}"></li>`;
}

function graph(collection) {
  const ul = document.createElement("ul");
  const li = collection.map(item).join("");

  ul.innerHTML = li;
  ul.className = "status-items";
    return ul;
}

const namespace = "uptime-widget";

class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {};
  }

  connectedCallback() {
    const root = this.shadowRoot;
    root.appendChild(template.content.cloneNode(true));

    const href = this.getAttribute("href");
    const text = this.getAttribute("text");
    const URL = this.getAttribute("serverURL");

    this.state = { href, text, URL };

    this.main = root.querySelector("main");
    this.header = root.querySelector("header");
    this.footer = root.querySelector("footer");

    window.addEventListener("message", this.handleMessage.bind(this));
    this.initialize.call(this);
  }

  initialize = () => {
    const { URL } = this.state;
    const { parse, render, handleErrors } = this;

    fetch(URL)
      .then((r) => r.json())
      .then(parse)
      .then(render)
      .catch(handleErrors);
  };

  parse = (data) => {
    const { chart_data, chart_legend } = data;
    if (!chart_data || !chart_legend) throw new Error("Malformed payload");
    return { collection: chart_data, metadata: chart_legend[0] };
  };

  render = ({ collection, metadata }) => {
    const { href, text } = this.state;

    const header = graph(collection);
    const footer = legend(metadata, href, text);

    this.header.appendChild(header);
    this.footer.replaceWith(footer);

    this.header.style.display = "block";
    this.footer.style.display = "block";
  };

  handleErrors = (err) => {
    console.warn(-1, err);
  };

  handleMessage(e) {
    console.log(e);
  }
}

customElements.define(namespace, Component);
export default function() {
    console.log(namespace, new Date());
    return true;
}
