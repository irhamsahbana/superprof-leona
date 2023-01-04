const fs = require('fs');
const { nanoid } = require('nanoid');
const _ = require('lodash');

const treatments = require('../data/treatments.json');
const response = require('../utils/response');

class TreatmentController {
  static index(req, res) {
    response(res, 200, 'OK', treatments);
  }

  static createCategory(req, res) {
    const { name } = req.body;

    const category = {
      id: nanoid(),
      name: name,
      list: [],
    };

    treatments.push(category);

    fs.writeFileSync('./server/data/treatments.json', JSON.stringify(treatments, null, 2));

    response(res, 201, 'Created', category);
  }

  static create(req, res) {
    const { category_id, name, price } = req.body;

    const category = _.find(treatments, { id: category_id });

    if (!category) return response(res, 404, 'Category treatment Not Found', null);

    const treatment = {
      id: nanoid(),
      name: name,
      price: price,
    };

    category.list.push(treatment);

    fs.writeFileSync('./server/data/treatments.json', JSON.stringify(treatments, null, 2));

    response(res, 201, 'Created', treatment);
  }

  static deleteCategory(req, res) {
    const { id } = req.params;

    const category = _.find(treatments, { id: id });
    if (!category) return response(res, 404, 'Category treatment Not Found', null);

    _.remove(treatments, { id: id });

    fs.writeFileSync('./server/data/treatments.json', JSON.stringify(treatments, null, 2));

    response(res, 200, 'OK', category);
  }

  static delete(req, res) {
    const { id } = req.params;

    const list = treatments.map((el) => {
      const x = el.list.map((e) => {
        e.category_id = el.id;
        return e;
      });

      return x;
    });

    const listTreatment = _.union(...list);

    const treatment = _.find(listTreatment, { id: id });
    if (!treatment) return response(res, 404, 'Treatment Not Found');

    const category = _.find(treatments, { id: treatment.category_id });
    _.remove(category.list, { id: id });

    fs.writeFileSync('./server/data/treatments.json', JSON.stringify(treatments, null, 2));

    response(res, 200, 'OK', treatment);
  }
}

module.exports = TreatmentController;