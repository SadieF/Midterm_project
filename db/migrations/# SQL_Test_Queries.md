# SQL Queries


## When a poll is created - Insert admin details, poll details, options details
<!-- Inserts admin email, firstname, lastname -->
- INSERT INTO admin (email, firstname, lastname) VALUES ($1, $2, $3);

<!-- Inserts adminURL, shareURL, and poll name into polls  -->
- INSERT INTO polls (adminURL_random_key, shareURL_random_key, name) VALUES ($1, $2, $3);

* Foreach loop:
<!-- Inserts options -->
<!-- Must use double quotes when referencing order in SQL becuase it tries to order -->
- INSERT INTO options (polls_id, option, option_desc,"order") VALUES ($1, $2, $3);


<!-- Shows admin page with poll, name, options, score -->
<!-- Will need to test with req.params -->
  -SELECT polls.name, options.option, options.option_desc, options.order, votes.score
    FROM polls
    JOIN options
    ON options.polls_id=polls_id
    JOIN votes
    ON votes.option_id=options.id
  WHERE adminurl_random_key=req.params.id


<!-- Shows voter Poll and options -->
  - SELECT polls.name, options.option, options.option_desc, options.order
      FROM polls
      JOIN options
      ON options.polls_id=polls_id
      JOIN votes
      ON votes.option_id=options.id
    WHERE shareurl_random_key=req.params.id

<!-- Inserts votes -->
- INSERT INTO votes (option_id, score) VALUES ($1);
