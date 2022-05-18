'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static boot(){
    super.boot()
    this.addTrait('DomainObject')
    this.addTrait('SoftDelete')
  }

  products() {
    return this.belongsToMany('App/Models/Product').pivotModel('App/Models/OrderProduct').withPivot(['quantity'])
  }

}

module.exports = Order
