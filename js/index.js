let debugMode = window.location.search.includes("debug");

main();

function main() {
  getData().then(render);
}

function getData() {
  return Schema.compose();
}

function render(res) {
  var vehicle = _.chain(res)
    .map(R.construct(VehicleModel))
    .sortBy("diameterSum")
    .last()
    .cloneDeep()
    .value();

  console.log("[render] result", res);
  console.log("[render] vehicle", vehicle);

  VueTable.vehicle = vehicle;
}

var VueTable = new Vue({
  el: "#vehicle-table",
  data: {
    vehicle: {},
  },
  computed: {
    pilots() {
      return _.map(this.vehicle.pilots, "name");
    },
  },
});
