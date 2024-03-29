'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */

const Order = use('App/Models/Order')
const OrderProduct = use('App/Models/OrderProduct')
const Logger = use('Logger')
const ObjectId = require('mongodb').ObjectId
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      // const prueba = await OrderProduct.with('products').with('order').fetch()
      // console.log('prueba', prueba.toJSON())
      const orderProducts = await Order
      .with('products')
      .fetch()
      return response.status(200).send(orderProducts)
    } catch (error) {
      Logger.info(`Error fetching product orders ${error.message}`)
    }
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    try {
      const data = request.all()
      const cotizationCode = Math.random().toString(36).substring(2, 15)
      if(!data.products) {
        response.status(400).json({
          code: 4000,
          message: 'Missing products in cotization'
        })
      }
      if(!data.products.length) {
        response.status(400).json({
          code: 4000,
          message: 'Minimum 1 product in cotization is needed'
        })
      }
      const newOrder = {
        ...data.order,
        order_code: cotizationCode,
        order_status: 'open',
        products: data.products.map(product => product._id)
      }
      if (!data.products.length) {
        throw new Error('No products on cart')
      }
      const order = await Order.create(newOrder)
      const userProducts = data.products.map(product => ({
        quantity: product.quantity,
        product_id: new ObjectId(product._id),
        order_id: order._id
      }))
      await OrderProduct.createMany(userProducts)
      return response.status(200).json(order)
    } catch (error) {
      Logger.info(`Error saving product orders ${error.message}`)
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = OrderController
