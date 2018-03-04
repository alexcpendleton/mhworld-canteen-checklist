var dataIn = require("./data.json");
var fs = require("fs");

const zones = {
  "Coral Highlands": {},
  "Rotten Vale": {},
  "Ancient Forest": {},
  "Elder's Recess": {},
  "Wildspire Waste": {}
};
const output = {};
dataIn.forEach(element => {
  let item = Object.assign({}, element);
  inferAndApplyZone(item);
  output[item.name] = item;
});
function inferAndApplyZone(item) {
  item.zone = "";
  for (const key in zones) {
    if (item.notes && item.notes.includes(key)) {
      item.zone = key;
      item.notes = item.notes.replace(key + " - ", "");
    }
  }
}
console.log(JSON.stringify(output, null, " "));
