'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
const Drive = use('Drive')
const File = use('App/Models/File')
const base64 = use('base64-arraybuffer-es6')
const fs = require('fs')
const Logger = use('Logger')



class FileController {
  static async storeBase64({ file, extention }) {
    try{
      const randomName = Math.random().toString(36).substring(2, 15)
      const fileName = `${randomName}_${Date.now()}.${extention}`
      const arrayBuffer = base64.decode(file)
      const buffer = Buffer.from(arrayBuffer)

      const url = await Drive.put(fileName, buffer, {
        ACL: "public-read",
      })
      Logger.info(`New resouce on: ${url}`)
      return fileName
    } catch(err){
      Logger.error('Error storing file')
      throw new Error('Error storing s3 image')
    }
  }
  /**
   * Show a list of all files.
   * GET files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new file.
   * GET files/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try{
      request.multipart.file('image', {}, async (file) => {
        try{
          // Create a random name for file
          const randomName = Math.random().toString(36).substring(2, 15)
          const fileName = `${randomName}_${Date.now()}.${file.subtype}`
          const ContentType = file.headers['content-type']
          const ACL = "public-read"

          const url = await Drive.put(fileName, file.stream, {
            ContentType,
            ACL
          })
          return response.status(200).json({
            url
          })
        }catch(err){
          console.log('Error during S3 upload', err.message)
          console.log(err)
        }
      }).process()
    } catch(err) {
      console.log('Error during S3 upload', err.message)
      console.log(err)
    }

  }

  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing file.
   * GET files/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update file details.
   * PUT or PATCH files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a file with id.
   * DELETE files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FileController
