'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategoriesSchema extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.increments()
      table.integer('product_id').unsigned().nullable()
      table.integer('category_id').unsigned().nullable()

      table.foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

        table.foreign('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('product_categories')
  }
}

module.exports = ProductCategoriesSchema
