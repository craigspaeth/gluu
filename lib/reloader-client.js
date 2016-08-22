(function () {
  var socket = window.io('/', { path: '/gluu-socket-io/socket.io' })
  var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  var poll = () =>
    delay(100).then(() => window.fetch(window.location.href).catch(poll))
  socket.on('gluuRefreshServerCode', () => {
    poll().then(() =>
      window.fetch(window.location.href)
        .then((res) => res.text())
        .then((text) => {
          var el = document.createElement('html')
          el.innerHTML = text
          var html = el.getElementsByTagName('body')[0].innerHTML
          window.document.body.innerHTML = html
          window.fetch(document.querySelector('[src*="/client.js"').src)
            .then((res) => res.text())
            .then((text) => window.eval(text))
        })
    )
  })
})()
