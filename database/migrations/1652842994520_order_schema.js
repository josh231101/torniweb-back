'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('order_code')
      table.string('client_name')
      table.string('email')
      table.string('phone')
      table.string('order_status').defaultTo('open')
      table.timestamps()
      table.dateTime('deleted_at')
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
