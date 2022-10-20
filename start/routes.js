'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * LOGIN ROUTES
 */
Route.post('login', 'TokenController.login')
Route.post('logout', 'TokenController.logout')


// CLIENT
Route.group(() => {
  Route.get('products','ProductController.index')
  Route.get('products/active','ProductController.active')
  Route.post('orders','OrderController.store')

  Route.post('attemptSignIn/:tokenId', 'OAuthController.attemptSignIn')

}).prefix('api/client')



// CMS - ADMIN
Route.group(() => {
  // GET
  Route.get('me', 'UserController.me')
  Route.resource('countries', 'CountryController')
    .apiOnly()
  Route.resource('users', 'UserController')
    .apiOnly()

  Route.resource('products', 'ProductController')
    .apiOnly()

  Route.post('products/deactivate/:id','ProductController.deactivate')
  Route.post('products/activate/:id','ProductController.activate')

    Route.resource('orders', 'OrderController')
    .apiOnly()

  Route.resource('file', 'FileController')
    .apiOnly()

})
  .prefix('api/admin')
  .middleware(['auth'])
