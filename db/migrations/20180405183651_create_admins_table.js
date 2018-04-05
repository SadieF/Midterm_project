exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', function(table) {
    table.increments();
    table.string('email');
    table.string('firstname');
    table.string('lastname');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('admin');
};
