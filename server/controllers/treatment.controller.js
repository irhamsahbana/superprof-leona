const fs = require('fs');
const treatments = require('../data/treatments.json');
const response = require('../utils/response');

class TreatmentController {
  static index(req, res) {
    response(res, 200, 'OK', treatments);
  }
}

module.exports = TreatmentController;