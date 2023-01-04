'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');
const enums = require('./enum-types');
const { getter, setter } = require('./enum-utils');

class ContactPoint extends ModelBase {
  static = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    system: {
      type:      Types.INTEGER,
      allowNull: false,
      get:       getter(enums.SYSTEM_TYPE_ENUM),
      set:       setter(enums.SYSTEM_TYPE_ENUM),
    },
    value: {
      type:      Types.STRING(32),
      allowNull: false,
    },
    use: {
      type:      Types.INTEGER,
      allowNull: false,
      get:       getter(enums.USE_TYPE_ENUM),
      set:       setter(enums.USE_TYPE_ENUM),
    },
    // A Patient, Doctor and CareTeam, all can have multiple contact-points
    referenceType: {
      type:      Types.STRING(32),
      allowNull: false,
    },
    referenceTypeID: {
      type:      Types.XIDType,
      allowNull: false,
    },
  };
}

module.exports = {
  ContactPoint,
};