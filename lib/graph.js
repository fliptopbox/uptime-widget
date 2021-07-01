function item(row, i) {
  const { label, color } = row;
  const state = row.class;
  return `<li
            class="state-${state} color-${color}"
            data-index="${i}"
            data-label="${label}"></li>`;
}

export default function (collection, count = null) {
  const n = 30;
  const mn = count || 90;

  const ul = document.createElement("ul");
  const array = collection.slice(0, mn);
  const li = array.map(item).join("");

  // apply the date range count
  console.log(count, mn, array);

  ul.innerHTML = li;
  ul.className = "status-items";
  ul.setAttribute("part", "graph");

  return ul;
}
