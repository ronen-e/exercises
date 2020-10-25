class VehicleModel {
  constructor(model) {
		this._model = model;
    this.name = model.name;
		this.pilots = model.pilots;

    this.diameterSum = fp.chain(this.planets)
      .uniqBy('name')
      .map('diameter')
      .filter(_.isNumber)
      .sum()
      .value()
  }

  get planets(){
    return _.map(this.pilots, 'homeworld')
  }
}
