'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');
const enums = require('./enum-types');
const { getter, setter } = require('./enum-utils');

class Person extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    firstName: {
      type:      Types.STRING(32),
      allowNull: true,
      index:     true,
    },
    lastName: {
      type:      Types.STRING(32),
      allowNull: true,
      index:     true,
    },
    active: {
      type:         Types.BOOLEAN,
      allowNull:    false,
      defaultValue: true,
    },
    gender: {
      type:      Types.INTEGER,
      allowNull: false,
      get:       getter(enums.GENDER_TYPE_ENUM),
      set:       setter(enums.GENDER_TYPE_ENUM),
    },
    birthDate: {
      type:      Types.DATE,
      allowNull: false,
    },
    address: {
      type:      Types.STRING(256),
      allowNull: false,
    },
  };
}

module.exports = {
  Person,
};