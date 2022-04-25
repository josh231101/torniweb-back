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
Route.post('login', 'UserController.login')


// CLIENT
Route.group(() => {

}).prefix('api/v1/client')



// CMS - ADMIN
Route.group(() => {
  Route.post('users', 'UserController.store')
  Route.get('/getCatalogo', () => {
    return { greeting: 'Hello world in JSON' }
  })
  Route.post('/submitOrder', () => {
    // TODO ESTO LO VA A CORRER
    console.log('submitOrder')
    return { success: 'GUARDADO!!!' }
  })
  Route.get('me', 'UserController.me')
})
  .prefix('api/v1/admin')
  .middleware(['auth'])
