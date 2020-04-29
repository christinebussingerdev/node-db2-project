const db = require('../data/db')


module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};


function find() {
  return db('cars');
}

function findById(id) {
  return db('cars').where({ id: Number(id) }).first();
}

function insert(cars) {
  return db('cars')
    .insert(cars)
    .then(ids => ({ id: ids[0] }));
}

function update(id, cars) {
  return db('cars')
    .where('id', Number(id))
    .update(cars);
}

function remove(id) {
  return db('cars')
    .where('id', Number(id))
    .del();
}