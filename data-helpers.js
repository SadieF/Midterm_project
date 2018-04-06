module.exports = function(knex) {

  function getPollByShareUrl(shareUrl) {
    return knex('polls')
      .first('*')
      .where({ shareurl_random_key: shareUrl });
  }

  function getOptionsByShareUrl(shareUrl) {
    return knex('options')
      .select('options.*')
      .join('polls', 'polls.id', 'options.poll_id')
      .where({ 'polls.shareurl_random_key': shareUrl })
      .orderBy('options.order');
  }

  function getPollWithOptionsByShareUrl(shareUrl) {
    const pollPromise = getPollByShareUrl(shareUrl);
    const optionsPromise = getOptionsByShareUrl(shareUrl);

    return Promise.all([pollPromise, optionsPromise])
      .then(([poll, options]) => ({ ...poll, options }))
      .catch((err) => {
        console.log('Err', err);
      })
  }

  function getPollByAdminUrl(adminUrl) {
    return knex('polls')
      .first('*')
      .where({ adminurl_random_key: adminUrl });
  }

  function getScoresByAdminUrl(adminUrl) {
    return knex('options')
      .select('options.*', 'votes.*')
      .join('polls', 'polls.id', 'options.poll_id')
      .join('votes', 'votes.option_id', 'options.id')
      .where({ 'polls.adminurl_random_key': adminURL })
      .orderBy('votes.score', 'desc');
  }

  function getPollWithOptionsAndScoresByAdminURL(adminUrl) {
    const adminPollPromise = getPollByAdminUrl(adminUrl);
    const optionsAndScoresPromise = getScoresByAdminUrl(adminUrl);

    return Promise.all([adminPollPromise, optionsAndScoresPromise])
      .then(([adminPoll, adminScores]) => ({ ...adminPoll, adminScores }))
      .catch((err) => {
        console.log('Err', err);
      })
  }

  return {
    getPollByShareUrl,
    getOptionsByShareUrl,
    getPollWithOptionsByShareUrl,
    getPollByAdminUrl,
    getScoresByAdminUrl,
    getPollWithOptionsAndScoresByAdminURL
  };
}
