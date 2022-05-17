'use strict'

const Logger = use('Logger')
const Token = use('App/Models/Token')

class TokenController {
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
      return response.status(400).json({
        message: 'Bad login',
        code: 5000
      })
    }
  }

  async logout({ request, response, auth}) {
    try{
      const token = request.input('user')
      await Token.query().where('token', token).delete()
      return response.status(200).json({
        code : 1000,
        message: 'User logout successfully'
      })
    }catch(err){
      Logger.info('Error logging out user...')
      Logger.info(err.message)
      return response.status(500).json({
        code: 5000,
        message: 'Backend error logging out user'
      })
    }
  }

}

module.exports = TokenController
