/* global use */
'use strict'

const lostr = use('lodash/string')

/*
 * Adds a new relation that links trait object with its domain
 */
class DomainObject {
  register (Model, customOptions = {}) {
    const tmpObj = new Model()
    const objectType = lostr.kebabCase(tmpObj.constructor.name).toLowerCase()
    const defaultOptions = { domainModelName: 'DomainObject', objectType }
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.domainUses = function () {
      return this.hasMany(`App/Models/${options.domainModelName}`, 'id', 'object_id')
        .where('object_type', options.objectType)
    }
  }
}

module.exports = DomainObject
