'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersCountriesSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.integer('country_id')
        .after('gender')
        .unsigned()
        .nullable()
      table.foreign('country_id')
        .references('id')
        .inTable('countries')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('country_id')
    })
  }
}

module.exports = UsersCountriesSchema
