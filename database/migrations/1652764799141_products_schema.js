'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name',254)
      table.string('code',254)
      table.string('icon_image',254)
      table.float('price', 2)
      table.bool('is_active').defaultTo(true)
      table.timestamps()
      table.dateTime('deleted_at')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
