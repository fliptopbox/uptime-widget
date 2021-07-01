export default function parseData(data) {
  const { chart_data, chart_legend } = data;
  if (!chart_data || !chart_legend) throw new Error("Malformed payload");

  const collection = chart_data.map(formatDates).map(formatLabel);

  return { collection, metadata: chart_legend[0], today: collection[0] };
}

function formatLabel(row) {
  const { label, parts } = row;
  const date = parts.slice(0, 3).join(" ");
  const text = label.replace(/^\d+\s\w+\sUTC$/i, "");
  return { ...row, label: `${date}${text && ": " + text}`.trim() };
}

function formatDates(row, i) {
  const now = new Date().valueOf();
  const dayHours = 1000 * 60 * 60 * 24;
  const yesterday = now + -i * dayHours;
  const date = new Date(yesterday);
  const array = date.toString().split(" ");
  const [weekday, month, day, year, time] = array;
  const parts = [weekday, month, day, year, time];

  return { ...row, date, parts };
}
