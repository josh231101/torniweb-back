'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up() {
    this.create('employees', (table) => {
      table.increments()
      table.integer('user_id').unsigned().nullable()
      table.foreign('user_id').references('id').inTable('users')
      table.integer('team_id').unsigned().nullable()
      table.foreign('team_id').references('id').inTable('teams')
      table.integer('position_id').unsigned().references('id').inTable('positions')
      table.bool('is_manager').defaultTo(false)
      table.timestamps()
      table.dateTime('deleted_at')
    })
  }

  down() {
    this.drop('employees')
  }
}

module.exports = EmployeeSchema
