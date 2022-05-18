'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static boot(){
    super.boot()
    this.addTrait('DomainObject')
    this.addTrait('SoftDelete')
  }

  orders() {
    return this.belongsToMany('App/Models/Order').pivotModel('App/Models/OrderProduct')
  }
}

module.exports = Product
