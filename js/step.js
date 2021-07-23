;
(() => {
  const selector = "#contact_form"

  //Events
  $('.step textarea').keydown((e) => {
    if (e.keyCode == 13) {
      e.preventDefault()
      $(e.target).blur()
    }
  })

  $('.path-step').on('click', (ev) => {
    $currentCircle = $(ev.target)
    const $position = ($($currentCircle).index('.path-step')) + 1
    const $stepPosition = $('.step:nth-child(' + $position + ')')
    focusCircle($stepPosition)
    changeNext($stepPosition)
  })

  $(selector).find('.input').change((ev) => {
    const $input = $(ev.target)
    const $nextStep = $input.parent().next('.step')
    const is_Validate = isValidate
    if (!is_Validate || $nextStep.length > 0) {
      changeNext($nextStep)
    } else {
      validateForm()
    }

  })

  //Helpers
  function validateForm() {
    if (isValidate()) {
      sendForm()
    } else {
      const $invalidFieldSet = $(selector).find('.input:invalid').first().parent()
      changeNext($invalidFieldSet)
    }
  }

  function sendForm() {
    const $form = $(selector)
    $.ajax({
      url: $($form).attr("action"),
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      dataType: "json",
      data: $form.formObject(),
      success: () => {
        $form.slideUp()
        $('#info-contact').html('Se envio tu mensaje, nos pondremos en contacto con vos')
      }
    })
  }

  function isValidate() {
    return document.querySelector(selector).checkValidity()
  }

  function focusCircle($circle) {
    $('.path-step.active').removeClass('active')
    $($circle).addClass('active')
  }

  function changeNext($nextStep) {
    $('.step.active').removeClass('active')
    $($nextStep).addClass('active')
    $($nextStep).find('.input').focus()
    //Coordinar los circulos
    const $position = ($($nextStep).index('.step')) + 1
    const $pathPosition = $('.path-step:nth-child(' + $position + ')')
    focusCircle($pathPosition)
  }

})()