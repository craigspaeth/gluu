# gluu

Gluing together a bunch of different libraries for ease of use—I guess a precursor to a "framework".

## TODO

* Extract libraries
  * JoiQL + Mongo modeling lib need `model.pre('query')` + `model.pre('mutation')`
    * Actually probably want to kill this in favor of less magic
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
* Reloader library
  * surfaces UI element when reloaded (blip of some sort)
