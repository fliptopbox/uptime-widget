function item(row, i) {
  const { label, color } = row;
  const state = row.class;
  return `<li
            class="state-${state} color-${color}"
            data-index="${i}"
            data-label="${label}"></li>`;
}

export default function (collection) {
  const ul = document.createElement("ul");
  const li = collection.map(item).join("");

  ul.innerHTML = li;
  ul.className = "status-items";
    return ul;
}
