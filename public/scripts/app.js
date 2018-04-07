$(() => {

  const $form = $('#form-vote').on('submit', (e) => {
    e.preventDefault();
    console.log($form.serializeArray().map((item, index) =>
      ({ rank: index, option_id: item.value })));
  });

  $('#form-vote').sortable();


})

// $('.button.btn.btn-secondary.btn-lg').on('submit', function(e) {
//     e.preventDefault();
//     const text = $(this).find('.input#form_email').val().trim();
//     if (text === '') {
//       $.flash("What's This Foolishness?! Please enter your email so we can send you your share link!");
