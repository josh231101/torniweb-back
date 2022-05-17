'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Position extends Model {
  static boot(){
    super.boot()
    this.addTrait('SoftDelete')
    this.addTrait('DomainObject')
  }

  static get visible () {
    return [
      'id',
      'name'
    ]
  }

}

module.exports = Position
