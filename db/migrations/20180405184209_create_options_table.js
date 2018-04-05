exports.up = function(knex, Promise) {
  return knex.schema.createTable('options', function(table) {
    table.increments();
    table.bigInteger('polls_id').references('id').inTable('polls');
    table.string('option');
    table.string('option_desc');
    table.integer('order');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('options');
};
