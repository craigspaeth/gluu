var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
var poll = () =>
  delay(100).then(() => window.fetch(window.location.href).catch(poll))
var reloadServer = () =>
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
      }))
var reloadClient = () =>
  window.fetch(document.querySelector('[src*="/client.js"').src)
    .then((res) => res.text())
    .then((text) => {
      // Reload the last Baobab state
      // const oldState = window.state.get()
      window.eval(text)
      // window.state.set(oldState)
    })
var ws = new window.WebSocket('ws://localhost:1234')
ws.onmessage = (event) => {
  if (event.data === 'server') {
    reloadServer().then(reloadClient)
  } else if (event.data === 'client') {
    reloadServer().then(reloadClient)
  }
}
