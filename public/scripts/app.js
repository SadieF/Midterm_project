$(() => {

  const $form = $('#form-vote').on('submit', (e) => {
    e.preventDefault();
    console.log($form.serializeArray().map((item, index) =>
      ({ rank: index, option_id: item.value })));
  });

  $('#form-vote').sortable();

  $('span.header').on('click', (e) => {
    e.preventDefault();
    window.location.replace("/") //doesn't work
  })

  $('button#create-button').on('click', (e) => {
    e.preventDefault();
    window.location.replace("/") //doesn't work

  })

  $('button').on('submit', (e) => {
    e.preventDefault();
    const text = ('#form_email').val().trim();
    if (text === '') {
      $.flash("What's This Foolishness?! Please enter your email so we can send you your share link!");
    } else {
      alert('Win!');
    }
  })

  // $('#form_email').on('mouseover', (e) => {
  //   e.preventDefault();
  //   $.flash("Rawr");
  // })



})


// })

// const text = $(this).find('.input#form_email').val().trim();
//     if (text === '') {

// $('.button.btn.btn-secondary.btn-lg').on('submit', function(e) {
//   e.preventDefault();
//   $.flash("What's This Foolishness?! Please enter your email so we can send you your share link!");
// })
