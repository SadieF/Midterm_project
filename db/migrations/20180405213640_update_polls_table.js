exports.up = function(knex, Promise) {
  return knex.schema.table('polls', function(table) {
    table.renameColumn('adminURL_random_key', 'adminurl_random_key');
    table.renameColumn('shareURL_random_key', 'shareurl_random_key');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('polls', function(table) {
    table.renameColumn('adminurl_random_key', 'adminURL_random_key');
    table.renameColumn('shareurl_random_key', 'shareURL_random_key');
  })
};
