'use strict'

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('437950640578-3d2vs0uo765kdu5jfbjimofvet0n0dpp.apps.googleusercontent.com');
const Guest = use('App/Models/Guest')

class OAuthController {
  async attemptSignIn(request, response){
    try {
      const token = request.params.tokenId
      const ticket = await client.verifyIdToken({
        idToken: token,
        requiredAudience: '437950640578-3d2vs0uo765kdu5jfbjimofvet0n0dpp.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      const email = payload.email
      const name = payload.name
      const picture = payload.picture
      const locale = payload.locale

      await Guest.create({
        email,
        name,
        picture,
        locale
      })
    } catch (error) {
      return response.status(500).json({ code: 5000, message: 'Error validating'})
    }
  }
}

module.exports = OAuthController
