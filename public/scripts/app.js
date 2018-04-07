$(() => {

  const $form = $('#form-vote').on('submit', (e) => {
    e.preventDefault();
    console.log($form.serializeArray().map((item, index) =>
      ({ rank: index, option_id: item.value })));
  });

  $('#form-vote').sortable();

  $('span.header').on('click', (e) => {
    e.preventDefault();
    window.location.replace("/")
  })

  $('button#create-button').on('click', (e) => {
    e.preventDefault();
    window.location.replace("/")
  })

  $('#create-poll').on('submit', (e) => {
    const email = $('#create-poll').find('textarea').val().trim();
    if (email.length === 0) {
      e.preventDefault();
      $.flash("What's This Foolishness?! Please enter your email so we can send you your share link!");
    }
  })


})
