const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  getUsers,
  findBy,
  // findByUser,
  add,
  remove
};

function getUsers() {
    return db('users')
      .select('id', 'username')
}

function findBy(filter) {
    return db('users')
      .select('id', 'username', 'password')
      .where(filter)
      .first()
}

// function findByUser(username) {
//   return db('users')
//     .where('users.username', username)
//     .first()
// }

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findBy({id});
    });
}

function remove(userId) {
  return db('users')
    .where('users.id', userId)
    .del()
}

