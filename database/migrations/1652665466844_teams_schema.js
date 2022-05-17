'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamsSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.integer('parent_id').unsigned().nullable()
      table.foreign('parent_id').references('id').inTable('teams')
      table.string('name',254)
      table.timestamps()
      table.dateTime('deleted_at')
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamsSchema
