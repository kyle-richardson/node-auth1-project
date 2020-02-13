const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  getUsers,
  findBy,
  add
};

function getUsers() {
    return db('users');
}

function findBy(filter) {
    return db('users')
      .select('id', 'username', 'password')
      .where(filter)
}

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findBy({id});
      });
  }