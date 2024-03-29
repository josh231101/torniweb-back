'use strict'

const User = use('App/Models/User')
const Logger = use('Logger')
class UserController {
  async index({ request, response}) {
    try{
      const users = await User.with('country').fetch()
      return response.status(200).json(users)
    } catch(err) {
      Logger.info('Error gettings all users')
      Logger.info(err.message)
      return response.status(500).json({
        code: 5000,
        message: 'Backend error getting users'
      })
    }
  }


  async store({ request, response }) {
    try {
      const data = request.all()
      if(!data.user) {
        return response.status(400).json({
          code : 4000,
          message: "Incorrect information provided to EP",
        })
      }
      if(!data.user.password && !data.user.email) {
        return response.status(400).json({
          code : 4000,
          message: "Missing password and email",
        })
      }
      const user = await User.create(data.user)

      return response.json({
        code: 1000,
        message: "New user registered correctly",
        user
      })
    } catch (err) {
      Logger.info('There was an error storing new user')
      Logger.info(err.message)
      return response.status(500).json({
        code: 5000,
        message: 'Error creating new user'
      })
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
