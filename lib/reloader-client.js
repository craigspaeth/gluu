(function () {
  var socket = window.io('/', { path: '/gluu-socket-io/socket.io' })
  var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  var poll = () =>
    delay(100).then(() => window.fetch(window.location.href).catch(poll))
  // On code change
  socket.on('gluuRefreshCode', () => {
    poll().then(() =>
      // Fetch the current page again
      window.fetch(window.location.href)
        .then((res) => res.text())
        .then((text) => {
          // Reload the new body HTML
          var el = document.createElement('html')
          el.innerHTML = text
          var html = el.getElementsByTagName('body')[0].innerHTML
          window.document.body.innerHTML = html
          // Reload the recompiled browser-code
          window.fetch(document.querySelector('[src*="/client.js"').src)
            .then((res) => res.text())
            .then((text) => {
              // Reload the last Baobab state
              const oldState = window.state.get()
              window.eval(text)
              window.state.set(oldState)
            })
        })
    )
  })
})()
