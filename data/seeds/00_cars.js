
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          "vin": 1234567,
          "make": 'bmw',
          "model": "m5",
          "mileage": 12000
        },
      ]);
    });
};
