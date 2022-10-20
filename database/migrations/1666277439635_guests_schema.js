'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuestsSchema extends Schema {
  up () {
    this.create('guests', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('guests')
  }
}

module.exports = GuestsSchema
