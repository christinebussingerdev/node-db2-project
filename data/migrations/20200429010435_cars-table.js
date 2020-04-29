
exports.up = function(knex) {
  return (
    knex.schema.createTable('cars', (porps) => {
      porps.increments()
      porps.integer('vin').notNullable()
      porps.string('make').notNullable()
      porps.string('model').notNullable()
      porps.integer('mileage').notNullable()
    })
  )
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('cars')
};
