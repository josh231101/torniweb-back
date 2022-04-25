'use strict'

const User = use('App/Models/User')
const Logger = use('Logger')

class UserController {
  async store({ request, response }) {
    try {
      console.log('aqui')
      const input = request.all()
      console.log('aqui', input)
      // TODO: Add sanitizer an validations :)
      await User.create(input)

      return response.json({
        code: 1000,
        message: "New user registered correctly"
      })
    } catch (err) {
      Logger.info('There was an error storing new user')
      Logger.info(err.message)
    }
  }

  async login({ request, response, auth }) {
    try {
      let input = request.all()
      let token = await auth.withRefreshToken().attempt(input.email, input.password)
      return response.json({
        code: 1000,
        token: token,
        message: "Bienvenido al sistema",
      })
    } catch (err) {
      Logger.info(err.message)
      Logger.info('Error in your request')
    }
  }

  async me({ response, auth }) {
    try {
      return await auth.getUser()
    } catch (error) {
      Logger.info('Error fetching user information')
      Logger.info(error.message)
      response.json({
        code: 5000,
        message: 'No user authenticated'
      })
    }
  }
}


module.exports = UserController
