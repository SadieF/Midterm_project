$(() => {

  const $form = $('#form-vote').on('submit', (e) => {
    e.preventDefault();
    console.log($form.serializeArray().map((item, index) =>
      ({rank: index, option_id: item.value})));
  });

  $('#form-vote').sortable();

})
