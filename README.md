# gluu

Gluing together a bunch of different libraries for ease of use—I guess a precursor to a "framework".

## TODO

* Extract libraries
  * Reloader lib
    * surfaces UI element when reloaded (blip of some sort)
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

## App vs. Lib

The app is the main unit of domain-specific modularity. One can separate code into layers like models, views, controllers, ui models, etc. within an app, but it is more encouraged to dileneate your large application into smaller apps. This, in conjunction with a root level shared components/lib folder, has proven to be a very successful architecture at Artsy with little need to add additional concepts at a project-wide level.

The app encapsulates a large unit of code that is specific and unique to your app's domain, as opposed to code that is generically useful across your company or the open source world. Examples of the former at Artsy would be a "markdown page" or "fair microsite" app, examples of the latter would be an "artsy auth modal", "fillwidth library" or "garner caching lib". Apps and libs also allow a wide level of freedom to choose the best architecture/approach for the job—an app can be a simple Koa app rendering a static page or a universal react app with all sorts of complexity. Similarly libs can be anything from an add function to a complex onboarding modal UI.

That said a good rule of thumb for choosing where to place code is first in an app. Then as one finds themself violating DRY and copy pasting code across apps, extract it into a lib that is designed in a more generically useful way. When doubling down on this concept, it sets this architecture up to be easier to extract whole apps into their own deployed projects. A lib should be designed in a way that it would be simple to extract into it's own repo and published to npm. An app should be designed in a manner that can run standalone with little, or no, extra code written. The process of extracting an app into it's own standalone project should ideally involve simply publishing the shared libs to npm, instead of source controlled with the project, moving the app folder into it's own repo, writing a package.json that looks like a subset of the parent project.

That said, a sort of "twelve factor" manifesto for writings apps/libs...

1. /lib folder is added to NODE_PATHs for ease of "promoting" a lib to npm
2. Apps and libraries never require backwards out of their /apps or /lib folders to avoid implicit dependencies that are hard to untangle
3. Apps export a single Koa instance that can be mounted and _just works_
4. Apps can be run standalone with a single `node apps/foo` command (bonus for using the `require.main === module` trick)
5. UI libs are self contained JS modules and don't need transpiling or hooking into any build process (can just be `require`d into any browserify build)
6. The exception to #4 and #5 is transpiling stage 4 ES features e.g. using `node -r babel-core/register apps/foo` or expecting the babelify transform

