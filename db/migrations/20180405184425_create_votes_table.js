exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', function(table) {
    table.increments();
    table.bigInteger('option_id').references('id').inTable('options');
    table.integer('score');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('votes');
};
