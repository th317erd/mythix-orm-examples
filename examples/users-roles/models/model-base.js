'use strict';

const { Model, Types } = require('mythix-orm');

// Common ancestor for all models.
//
// Here we can add common methods
// and common fields that should
// be shared between all models.
class ModelBase extends Model {
  // Common fields that all models have
  static fields = {
    createdAt: {
      type:         Types.DATETIME,
      defaultValue: Types.DATETIME.Default.NOW,
      allowNull:    false,
      index:        true,
    },
    updatedAt: {
      type:         Types.DATETIME,
      defaultValue: Types.DATETIME.Default.NOW.UPDATE,
      allowNull:    false,
      index:        true,
    },
  };

  // By default, the query order of all models will be
  // by their "createdAt" column
  static defaultScope(query) {
    return query.ORDER('createdAt');
  }

  // Setup methods to allow us to easily
  // fetch model classes.
  //
  // We have both static methods, and instance
  // methods, because these might be called from
  // a static context, or an instance context.
  static getModels() {
    let connection = this.getConnection();
    if (!connection)
      return;

    return connection.getModels();
  }

  getModels() {
    return this.constructor.getModels.call(this);
  }
}

module.exports = {
  ModelBase,
};
