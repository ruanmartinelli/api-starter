import 'dotenv/config'
import _ from 'lodash'
import db from 'db/'
import {ValidationError} from 'util/error'

class Model {
  constructor(options) {
    this.tableName = options.tableName
    this.columns = options.columns || []
    this.joins = options.joins || []
    this.rawJoins = options.rawJoins || []
    this.foreignColumns = options.foreignColumns || []
    this.camelCase = false || options.camelCase
    this.idAttribute = options.idAttribute || 'id'

    // hooks
    this.beforeCreate = options.beforeCreate || _.noop
    this.beforeUpdate = options.beforeUpdate || _.noop
  }

  async find(filter) {
    const query = db(this.tableName)
    const columns = []

    if (_.isEmpty(this.columns)) {
      columns.push(`${this.tableName}.*`)
    }

    this.foreignColumns.forEach(c => columns.push(c))

    query.select(columns)

    this.joins.forEach(j => query.join(j.table, j.first, j.second))
    this.rawJoins.forEach(j => query.joinRaw(j))

    _.mapKeys(filter, (value, key) => {
      if (_.isUndefined(value)) return

      query.where(`${this.tableName}.${key}`, value)
    })

    return query
  }

  findById(id) {
    const where = {}

    where[this.idAttribute] = id

    return this.find(where).then(_.head)
  }

  async update(obj) {
    if (!obj[this.idAttribute]) {
      throw new ValidationError('Error updating object: Missing ID field')
    }

    await this.beforeUpdate(obj)

    return db(this.tableName)
      .update(obj)
      .where(this.idAttribute, obj.id)
      .then(() => this.findById(obj.id))
  }

  async create(obj) {
    await this.beforeCreate(obj)

    return db(this.tableName)
      .insert(obj)
      .then(([id]) => this.findById(id))
  }

  async remove(id) {
    if (!id) throw new ValidationError('Error removing object: Missing ID field')

    return db(this.tableName)
      .where(this.idAttribute, id)
      .del()
  }

  upsert(obj) {
    if (obj[this.idAttribute]) {
      return this.update(obj)
    } else {
      return this.create(obj)
    }
  }
}

export default Model
