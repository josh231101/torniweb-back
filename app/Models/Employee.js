'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {
  static boot(){
    super.boot()
    this.addTrait('DomainObject')
    this.addTrait('SoftDelete')

  }

  static get filterable () {
    return ['id', 'user_id', 'team_id', 'is_manager']
  }

  static get searchable () {
    return ['position']
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  team(){
    return this.belongsTo('App/Models/Team')
  }

  position() {
    return this.belongsTo('App/Models/Position','position_id', 'id')
  }

}

module.exports = Employee
