exports.seed = function(knex, Promise) {
  const deleteAllDataPrms = knex('votes').del()
    .then(() => {
      return knex('options').del();
    })
    .then(() => {
      return knex('polls').del();
    })
    .then(() => {
      return knex('admin').del();
    });

  const createAdmin = deleteAllDataPrms
    .then(() => {
      return knex('admin').returning('*')
        .insert({ email: 'john@john.john', firstname: 'John', lastname: 'Smith' });
    });
  const createPolls = createAdmin
    .then(([admin]) => {
      return knex('polls').returning('*')
        .insert([
          { admin_id: admin.id, adminurl_random_key: '2wuefkhj', shareurl_random_key: '0sdfljk', name: 'What should we have for dinner?' },
          { admin_id: admin.id, adminurl_random_key: 'sdfklj23', shareurl_random_key: 'vj78580', name: 'Where should we go on vacation?' }
        ]);
    });
  const createOptions = createPolls
    .then(([dinnerPoll, vacationPoll]) => {
      return knex('options').returning('*')
        .insert([
          { polls_id: dinnerPoll.id, option: 'Sushi', option_desc: 'Avocado rolls', order: 1 },
          { polls_id: dinnerPoll.id, option: 'Pizza', option_desc: 'Cheese', order: 2 },
          { polls_id: dinnerPoll.id, option: 'Italian', option_desc: 'Pasta', order: 3 },
          { polls_id: dinnerPoll.id, option: 'Subway', option_desc: '', order: 4 },
          { polls_id: dinnerPoll.id, option: 'Mexican', option_desc: 'Nachos', order: 5 },
          { polls_id: vacationPoll.id, option: 'Japan', option_desc: 'Tokyo', order: 5 },
          { polls_id: vacationPoll.id, option: 'Spain', option_desc: 'Madrid', order: 4 },
          { polls_id: vacationPoll.id, option: 'Portugal', option_desc: 'Porto', order: 3 },
          { polls_id: vacationPoll.id, option: 'Greece', option_desc: 'Athens', order: 2 },
          { polls_id: vacationPoll.id, option: 'France', option_desc: 'Nice', order: 1 },
        ]);
    });
  const createVotes = createOptions
    .then(([dP1, dP2, dP3, dP4, dP5, vP1, vP2, vP3, vP4, vP5]) => {
      return knex('votes').returning('*')
        .insert([
          { option_id: dP1.id, score: 5 },
          { option_id: dP1.id, score: 4 },
          { option_id: dP1.id, score: 2 },

          { option_id: dP2.id, score: 3 },
          { option_id: dP2.id, score: 5 },
          { option_id: dP2.id, score: 1 },

          { option_id: dP3.id, score: 3 },
          { option_id: dP3.id, score: 1 },
          { option_id: dP3.id, score: 2 },

          { option_id: dP4.id, score: 1 },
          { option_id: dP4.id, score: 1 },
          { option_id: dP4.id, score: 1 },

          { option_id: dP5.id, score: 5 },
          { option_id: dP5.id, score: 5 },
          { option_id: dP5.id, score: 5 },

          { option_id: vP1.id, score: 5 },
          { option_id: vP1.id, score: 4 },
          { option_id: vP1.id, score: 5 },

          { option_id: vP2.id, score: 3 },
          { option_id: vP2.id, score: 2 },
          { option_id: vP2.id, score: 1 },

          { option_id: vP3.id, score: 1 },
          { option_id: vP3.id, score: 1 },
          { option_id: vP3.id, score: 1 },

          { option_id: vP4.id, score: 4 },
          { option_id: vP4.id, score: 1 },
          { option_id: vP4.id, score: 5 },

          { option_id: vP5.id, score: 2 },
          { option_id: vP5.id, score: 1 },
          { option_id: vP5.id, score: 3 },
        ])

    })

  return createVotes;
}
