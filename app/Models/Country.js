'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Country extends Model {
  static boot(){
    super.boot()
    this.addTrait('SoftDelete')
    this.addTrait('DomainObject')
  }

  static get dates () {
    return super.dates.concat(['deleted_at'])
  }

  user() {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Country
