'use strict'


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const FileController = use('App/Controllers/Http/FileController')
const Product = use('App/Models/Product')
const Logger = use('Logger')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try{
      const products = await Product.all()
      return response.status(200).json(products)
    }catch(err){
      Logger.info('Error listing products...')
      Logger.info(err.message)
      return response.status(500).json({
        code: 5000,
        message: 'Backend error listing products'
      })
    }
  }


  async active ({ request, response, view }) {
    try{
      const products = await Product.query().where('is_active',1).fetch()
      return response.status(200).json(products)
    }catch(err){
      Logger.info('Error listing products...')
      Logger.info(err.message)
      return response.status(500).json({
        code: 5000,
        message: 'Backend error listing products'
      })
    }
  }


  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try{

      const data = request.only(['name', 'code', 'price', 'is_active'])
      const file = request.only('icon_image') // inBase64

      data.price = Number.parseFloat(data.price)
      data['is_active'] = data['is_active'] ? 1 : 0
      const fileBase64Array = file.icon_image.split(';base64,')
      const fileBase64 = fileBase64Array[1]
      const extention = fileBase64Array[0].substring(11)
      const fileName = await FileController.storeBase64({ file : fileBase64, extention  })
      const newProduct = await Product.create({...data, icon_image: fileName})
      return response.status(200).json(newProduct)
    }catch(err){
      console.log('err.', err.message)
      Logger.info('Error creating new product...')
      Logger.info(err.message)
      return response.status(500).json({
        code: 5000,
        message: 'Backend error creating product'
      })
    }

  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProductController
