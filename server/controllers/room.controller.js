const fs = require('fs');
const { nanoid } = require('nanoid');
const _ = require('lodash');

const response = require('../utils/response');

const rooms = require('../data/rooms.json');

class RoomController {
  static index(req, res) {
    return response(res, 200, 'OK', rooms);
  }

  static create(req, res) {
    const { name } = req.body;

    const room = {
      id: nanoid(),
      name: name,
    };

    rooms.push(room);

    fs.writeFileSync('./server/data/rooms.json', JSON.stringify(rooms, null, 2));

    return response(res, 201, 'Created', room);
  }

  static delete(req, res) {
    const { id } = req.params;

    const room = _.find(rooms, { id });

    if (!room) {
      return response(res, 404, 'Not Found');
    }

    _.remove(rooms, { id });

    fs.writeFileSync('./server/data/rooms.json', JSON.stringify(rooms, null, 2));

    return response(res, 200, 'OK', room);
  }

  static update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const room = _.find(rooms, { id });

    if (!room) {
      return response(res, 404, 'Not Found');
    }

    room.name = name;

    fs.writeFileSync('./server/data/rooms.json', JSON.stringify(rooms, null, 2));

    return response(res, 200, 'OK', room);
  }
}

module.exports = RoomController;