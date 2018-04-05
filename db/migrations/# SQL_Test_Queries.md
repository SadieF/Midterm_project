# SQL Queries


## When a poll is created:

<!-- Inserts admin email, firstname, lastname -->
- INSERT INTO admin (email, firstname, lastname) VALUES ($1, $2, $3);

<!-- Inserts adminURL, shareURL, and poll name into polls  -->
- INSERT INTO polls (adminURL_random_key, shareURL_random_key, name) VALUES ($1, $2, $3);

// //Foreach loop:

<!-- Inserts options -->
<!-- Must use double quotes when referencing order in SQL becuase it tries to order -->
// INSERT INTO options (option, option_desc, order) VALUES ($1, $2, $3);

// //When we re-direct them to the admin page:
// SELECT polls.name, options.option, options.option_desc, options.order, votes.score
// FROM polls
// JOIN options
// ON options.polls_id=polls.id
// JOIN votes
// ON options.id=votes.option_id
// WHERE adminURL_randomKey=req.params.id
// return knex.schema.dropTable('admin');
// return knex.schema.dropTable('polls');
// return knex.schema.dropTable('options');
// return knex.schema.dropTable('votes');
