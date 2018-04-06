exports.up = function(knex, Promise) {
  return knex.schema.table('options', function(table) {
    table.renameColumn('polls_id', 'poll_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('polls', function(table) {
    table.renameColumn('poll_id', 'polls_id');
  })
};
