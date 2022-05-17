'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PositionsSchema extends Schema {
  up () {
    this.create('positions', (table) => {
      table.increments()
      table.string('name',254)
      table.timestamps()
      table.dateTime('deleted_at')
    })
  }

  down () {
    this.drop('positions')
  }
}

module.exports = PositionsSchema
