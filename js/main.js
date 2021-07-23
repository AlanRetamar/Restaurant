if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
};
(() => {

  let sticky = false
  let currentPosition = 0
  let imageCounter = $('[data=imageCounter]').attr('content')
  $('#sticky-navigation').removeClass('hidden')
  $('#sticky-navigation').slideUp(0)
  checkScroll()
  isOpen()


  setInterval(() => {
    if (currentPosition < imageCounter) currentPosition++
    else currentPosition = 0
    $('#gallery .inner').css({
      'left': '-' + currentPosition * 100 + '%'
    })
  }, 3000)

  $('#hamburger-menu').on('click', toggleNav)

  $('.menu-link').on('click', toggleNav)
  $(window).scroll(checkScroll)

  function checkScroll() {
    const inBottom = isInBottom()

    if (inBottom && !sticky) {
      sticky = true
      stickNavigation()
    }
    if (!inBottom && sticky) {
      sticky = false
      noStickNavigation()
    }
  }

  function isOpen() {
    let date = new Date()
    let hours = date.getHours()
    if (hours >= 20 || hours <= 2) {
      $('#is-open').addClass('glyphicon').addClass('glyphicon-time').html(' Abierto ahora')
    } else {
      $('#is-open').addClass('glyphicon').addClass('glyphicon-time').html(' Cerrado ahora<br> Abierto de 8:00pm a 2:00am')
    }

  }

  function toggleNav() {
    $('#responsive-nav ul').toggleClass('active')
    $('#hamburger-menu').toggleClass('glyphicon-menu-hamburger')
  }

  function stickNavigation() {
    $('#description').addClass('fixed').removeClass('absolute')
    //document.body.style.overflowX = 'clip'
    $('#navigation').slideUp('fast')
    $('#sticky-navigation').slideDown('fast')
  }

  function noStickNavigation() {

    $('#description').removeClass('fixed').addClass('absolute')
    $('#navigation').slideDown('fast')
    $('#sticky-navigation').slideUp('fast')
  }

  function isInBottom() {
    const description = $("#description")
    const descriptionHeight = description.height()
    return $(window).scrollTop() > $(window).height() - (descriptionHeight * 2.5)
  }

})()