'use strict'

/*
 * Safely deletes models fron database, this operation will
 * not totally remove the object but will hide it from standard queries.
 *
 * To return all values (including deleted) use `withTrashed` method.
 */
class SoftDelete {
  register(Model, customOptions = {}) {
    const deletedAtColumn = customOptions.name || Model.table + '.deleted_at'
    const cascade = customOptions.cascade || []

    Model.addGlobalScope((builder) => {
      builder.whereNull(deletedAtColumn)
    }, 'adonis_soft_deletes')

    Model.queryMacro('withTrashed', function () {
      this.ignoreScopes(['adonis_soft_deletes'])
      return this
    })

    Model.queryMacro('onlyTrashed', function () {
      this.ignoreScopes(['adonis_soft_deletes'])
      this.whereNotNull(deletedAtColumn)
      return this
    })

    Model.prototype.delete = async function () {
      for (let relation of cascade) {
        const related = await this[relation]().fetch()
        if (related && related.rows) {
          for (let obj of related.rows) {
            if (typeof obj.delete === 'function') {
              await obj.delete()
            }
          }
        } else if (related && typeof related.delete === 'function') {
          await related.delete()
        }
      }

      this[deletedAtColumn] = new Date()
      await this.save()
    }

    Model.prototype.restore = async function () {
      for (let relation of cascade) {
        const related = await this[relation]().withTrashed().fetch()
        if (related && related.rows) {
          for (let obj of related.rows) {
            if (typeof obj.restore === 'function') {
              await obj.restore()
            }
          }
        } else if (related && typeof related.restore === 'function') {
          await related.restore()
        }
      }

      this[deletedAtColumn] = null
      await this.save()
    }

    Model.prototype.forceDelete = async function () {
      await Model
        .query()
        .where(Model.primaryKey, this[Model.primaryKey])
        .ignoreScopes()
        .delete()
    }
  }
}

module.exports = SoftDelete
