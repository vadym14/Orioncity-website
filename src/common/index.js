/* eslint-disable import/no-anonymous-default-export */
export const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

export const colorsData = [
  "#f17522",
  "#9c9c9c",
  "#f7c028",
  "#15a5e7",
  "#F67280",
  "#6C5B7B",
  "#355C7D",
  "#FECEAB",
  "#E84A5F",
  "#A8E6CE",
  "#FF8C94",
  "#CC527A",
  "#363636",
  "#A7226E",
  "#EC2049",
  "#2F9599",
  "#F7DB4F",
];

export default {
  numberWithCommas,
  colorsData,
};
