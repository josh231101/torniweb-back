'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductsSchema extends Schema {
  up () {
    this.create('order_products', (table) => {
      table.increments()
      table.integer('order_id').unsigned().nullable()
      table.integer('product_id').unsigned().nullable()
      table.integer('quantity')
      table.foreign('order_id').references('id').inTable('orders').onDelete('SET NULL').onUpdate('CASCADE')
      table.foreign('product_id').references('id').inTable('products').onDelete('SET NULL').onUpdate('CASCADE')
      table.timestamps()
      table.dateTime('deleted_at')
    })
  }

  down () {
    this.drop('order_products')
  }
}

module.exports = OrderProductsSchema
