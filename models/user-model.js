const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  getUsers,
  findBy,
  findByUser,
  add
};

function getUsers() {
    return db('users');
}

function findBy(filter) {
    return db('users')
      .select('id', 'username', 'password')
      .where(filter)
      .first()
      .then(user=> {
        console.log(user)
        return user
      })
}

function findByUser(username) {
  return db('users')
    .where('users.username', username)
    .first()
    .then(user=> {
      console.log(user)
      return user
    })
}

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findBy({id});
      });
  }