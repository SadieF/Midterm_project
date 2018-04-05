exports.up = function(knex, Promise) {
  return knex.schema.createTable('polls', function(table) {
    table.increments();
    table.timestamps();
    table.bigInteger('admin_id').references('id').inTable('admin');
    table.string('adminURL_random_key');
    table.string('shareURL_random_key');
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('polls');
};
