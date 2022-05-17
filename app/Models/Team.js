'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  static boot(){
    super.boot()
    this.addTrait('SoftDelete')
    this.addTrait('DomainObject')
  }

  static get dates () {
    return super.dates.concat(['deleted_at'])
  }

  static get visible () {
    return [
      'id',
      'name',
      'deleted_at'
    ]
  }

  static get searchable () {
    return ['name', 'default_position']
  }

  employees () {
    return this.hasMany('App/Models/Employee')
  }


}

module.exports = Team
