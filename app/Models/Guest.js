'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Guest extends Model {

  static boot(){
    super.boot()
    this.addTrait('DomainObject')
    this.addTrait('SoftDelete')
  }


}

module.exports = Guest
