'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');

class CodeableConcept extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    coding: {
      type:      Types.STRING(32),
      allowNull: false,
    },
    text: {
      type:      Types.STRING(32),
      allowNull: false,
    },
  };
}

module.exports = {
  CodeableConcept,
};