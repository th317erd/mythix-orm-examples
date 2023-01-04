'use strict';

const Nife = require('nife');
const {
  Model,
  Types,
  Utils: MythixORMUtils,
} = require('mythix-orm');
const Utils = require('../utils');

// This is the base model class that all other
// models inherit from. It provides common
// functionality between all models.

class ModelBase extends Model {
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

  static defaultOrder() {
    return [`${this.getModelName()}:createdAt`];
  }

  static isValidID(id, modelName) {
    return Utils.isValidID(id, modelName);
  }

  isValidID(id, modelName) {
    return this.constructor.isValidID(id, modelName);
  }

  static getModelIDPrefix() {
    return Utils.getModelIDPrefixFor(this.getModelName());
  }

  getModelIDPrefix() {
    return this.constructor.getModelIDPrefix();
  }

  static getModelTypeAndIDFromID(id) {
    return Utils.getModelTypeAndIDFromID(id);
  }

  getModelTypeAndIDFromID(id) {
    return this.constructor.getModelTypeAndIDFromID(id);
  }

  static getModelNameFromID(id) {
    return Utils.getModelNameFromIDPrefix(id);
  }

  getModelNameFromID(id) {
    return this.constructor.getModelNameFromID(id);
  }

  static stripIDPrefix(id) {
    return Utils.stripIDPrefix(id);
  }

  stripIDPrefix(id) {
    return this.constructor.stripIDPrefix(id);
  }

  static addIDPrefix(id) {
    return Utils.addIDPrefix(id);
  }

  addIDPrefix(id) {
    return this.constructor.addIDPrefix(id);
  }

  static getModelTypeAndID(_modelOrID) {
    if (!_modelOrID)
      return;

    let modelOrID = _modelOrID;
    if (modelOrID instanceof ModelBase) {
      return {
        type: modelOrID.getModelName(),
        id:   modelOrID.id,
      };
    } else if (modelOrID.type && modelOrID.id) {
      return modelOrID;
    } else if (this.isValidID(modelOrID)) {
      return this.getModelTypeAndIDFromID(modelOrID);
    }
  }

  getModelTypeAndID(_modelOrID) {
    return this.constructor.getModelTypeAndID(_modelOrID);
  }

  // MythixORM "getModel" only returns the current
  // model... so here we overload to be able to
  // fetch a model by name.
  getModel(modelName) {
    if (!modelName)
      return super.getModel();

    let connection = this.getConnection();
    return connection.getModel(modelName);
  }

  getModels() {
    let connection = this.getConnection();
    return connection.getModels();
  }

  throwNotFoundError(message, code) {
    throw new Utils.NotFoundError(message || 'Not Found', code);
  }

  throwForbiddenError(message, code) {
    throw new Utils.ForbiddenError(message || 'Forbidden', code);
  }

  // This will take a "query object"
  // and convert it into a Mythix ORM query
  static generateQueryFromFilter(Model, filter) {
    if (Nife.isEmpty(filter))
      return;

    return MythixORMUtils.generateQueryFromFilter(this.getConnection(), Model, filter);
  }

  generateQueryFromFilter(Model, filter) {
    return this.constructor.generateQueryFromFilter(Model, filter);
  }

  static collectEmails(emails) {
    return Nife.toArray(emails).filter((email) => {
      if (!email)
        return false;

      if (!Nife.instanceOf(email, 'string'))
        return false;

      if (email.indexOf('@') < 0)
        return false;

      return true;
    }).map((email) => email.toLowerCase());
  }

  collectEmails(emails) {
    return this.constructor.collectEmails(emails);
  }

  groupFilterKeys(filter, _groups) {
    if (Nife.isEmpty(_groups))
      return filter;

    // If the filter is already grouped, then
    // just return.
    let groupKeys = Object.keys(_groups);
    for (let i = 0, il = groupKeys.length; i < il; i++) {
      let key = groupKeys[i];
      if (Object.prototype.hasOwnProperty.call(filter, key))
        return filter;
    }

    // Groups are defined as a group name
    // key with the value being an array
    // of filter keys to group. For example:
    // { user: [ 'firstName' , 'lastName', 'email' ] }
    // "compileGroups" inverts this object, so it
    // would become:
    // { firstName: 'user', lastName: 'user', email: 'user' }
    // This allows us to quickly look up any filter attribute
    // name, and see which group it should be placed into.
    const compileGroups = (groups) => {
      let inverseGroups = {};
      let groupNames = Object.keys(groups);

      for (let i = 0, il = groupNames.length; i < il; i++) {
        let groupName = groupNames[i];
        let keyNames = Nife.toArray(groups[groupName]).filter(Boolean);

        for (let j = 0, jl = keyNames.length; j < jl; j++) {
          let keyName = keyNames[j];
          inverseGroups[keyName] = groupName;
        }
      }

      return inverseGroups;
    };

    let groups = compileGroups(_groups);
    if (Nife.isEmpty(groups))
      return {};

    // Now we iterate the filter keys themselves,
    // and see which group each key should be
    // placed into. Note: We "sanitize" the key,
    // because filter keys also include operators,
    // i.e. "firstName*": "%bob%"... we strip
    // any operator off the key to "sanitize" it,
    // and this allows us to match on "firstName",
    // whereas we wouldn't be able to match on
    // "firstName*", or "firstName!=" for example.
    let keys = Object.keys(filter);
    let result = {};
    for (let i = 0, il = keys.length; i < il; i++) {
      let key = keys[i];
      let sanitizedKey = key.replace(/\W/g, '');
      let groupName = groups[sanitizedKey];

      if (!groupName)
        continue;

      let groupScope = result[groupName];
      if (!groupScope)
        groupScope = result[groupName] = {};

      groupScope[key] = filter[key];
    }

    return result;
  }
}

module.exports = {
  ModelBase,
};
