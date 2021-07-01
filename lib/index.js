/**/
import template from "./template.js";
import graph from "./graph.js";
import legend from "./legend.js";
import parseData from "./parseData.js";

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

    const days = Number(this.getAttribute("days")) || null;
    const href = this.getAttribute("href");
    const text = this.getAttribute("text");
    const URL = this.getAttribute("serverURL");

    this.state = { href, text, URL, days };

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

  parse = (data) => parseData(data);

  render = ({ collection, metadata }) => {
    const { href, text, days } = this.state;

    const header = graph(collection, days);
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
export default function () {
  console.log(namespace, new Date());
  return true;
}
