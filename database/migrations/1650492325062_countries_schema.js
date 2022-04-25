'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountriesSchema extends Schema {
  up () {
    this.create('countries', (table) => {
      table.increments()
      table.string('name')
      table.string('phone_code',4)
      table.string('default_locale').defaultTo('en')
      table.dateTime('deleted_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('countries')
  }
}

module.exports = CountriesSchema
