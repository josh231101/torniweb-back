'use strict'

const Country = use('App/Models/Country')
const Logger = use('Logger')

class CountryController {
  async index({ request, response}) {
    try{
      const countries = await Country.all()
      return response.status(200).json(countries)
    } catch(err) {
      Logger.info('Error gettings all users')
      Logger.info(err.message)
      return response.status(500).json({
        code: 5000,
        message: 'Backend error getting countries'
      })
    }
  }
}

module.exports = CountryController
