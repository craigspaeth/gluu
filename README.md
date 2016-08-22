# gluu

Gluing together a bunch of different libraries for ease of use—I guess a precursor to a "framework".


## TODO

* Extract libraries
  * JoiQL + Mongo modeling lib need `model.pre('query')` + `model.pre('mutation')`
  * Server reloader
  * Browserify-dev-middleware
  * This glue lib
* Generator CLI
  * Sub-app generator that creates
    * client.js
    * server.js
    * router.js
    * /models
    * /views
    * /controllers
* Consider native and ReactNativeWeb integration

## Reloader Notes

Server-side change

- serve script via router
- inject in scripts tag
- WebSocket refresh command
- Fetch current page
- Re-render body

Client-side change

- Replace script tag with itself causing new code to reload
- Push update to state tree
