const { nanoid } = require('nanoid');
const fs = require('fs');
const users = require('../data/users.json');
const response = require('../utils/response');

class UserController {
  static index(req, res) {
    const { role } = req.query;

    if (role) {
      const filteredUsers = users.filter((user) => user.role === role);
      response(res, 200, 'OK', filteredUsers);
      return
    }

    response(res, 200, 'OK', users);
  }

  static create(req, res) {
    let { name, role, email, password } = req.body;
    const id = nanoid();

    users.push({
      id,
      name,
      role,
      email,
      password,
    });

    console.log(users);

    fs.writeFileSync('./server/data/users.json', JSON.stringify(users, null, 2));

    response(res, 201, 'Created', {
      id,
      name,
      role,
      email,
    });
  }

  static delete(req, res) {
    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    response(res, 200, 'OK', user);

    if (user) {
      const index = users.indexOf(user);
      users.splice(index, 1);

      fs.writeFileSync('./server/data/users.json', JSON.stringify(users, null, 2));

      response(res, 200, 'OK', {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      });

    } else {
      response(res, 404, 'Not Found', {
        error: 'User not found',
      });
    }
  }

  static update(req, res) {
    const { id } = req.params;
    const { name, role, email } = req.body;

    const user = users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.role = role;
      user.email = email;

      fs.writeFileSync('./server/data/users.json', JSON.stringify(users, null, 2));

      response(res, 200, 'OK', {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      });
    } else {
      response(res, 404, 'Not Found', {
        error: 'User not found',
      });
    }
  }

  static login(req, res) {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      });
    } else {
      res.status(401).json({
        error: 'Invalid email or password',
      });
    }
  }
}

module.exports = UserController;