'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');

class Qualification extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    code: {
      type:      Types.STRING(64),
      allowNull: false,
    },
    startDate: {
      type:      Types.DATETIME,
      allowNull: false,
    },
    endDate: {
      type:      Types.DATETIME,
      allowNull: false,
    },
    practitionerID: {
      type: Types.FOREIGN_KEY('Practitioner:id', {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      allowNull: false,
      index:     true,
    },
  };
}

module.exports = {
  Qualification,
};