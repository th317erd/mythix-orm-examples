'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');

class Appointment extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    status: {
      type:      Types.STRING(32),
      allowNull: false,
    },
    cancelationReason: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('cancelationReason')),
    },
    serviceCategory: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('serviceCategory')),
    },
    serviceType: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('serviceType')),
    },
    specialty: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('specialty')),
    },
    appointmentType: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('appointmentType')),
    },
    reasonCode: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('reasonCode')),
    },
    priority: {
      type:      Types.INTEGER,
      allowNull: true,
    },
    description: {
      type:      Types.STRING(128),
      allowNull: true,
    },
    start: {
      type:      Types.DATETIME,
      allowNull: true,
    },
    end: {
      type:      Types.DATETIME,
      allowNull: true,
    },
    created: {
      type:      Types.DATETIME,
      allowNull: true,
    },
    comment: {
      type:      Types.STRING(128),
      allowNull: true,
    },
    encounterID: {
      type: Types.FOREIGN_KEY('Encounter:id', {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      allowNull: false,
      index:     true,
    },
  };
}

function codeableConceptLookUp(props) {
  return ({ self }, { CodeableConceptLink }, linkQuery) => {
    return CodeableConceptLink.$
      .referenceType.EQ('Appointment')
      .referenceTypeID.EQ(self.id)
      .propsName.EQ(props)
      .MERGE(linkQuery);
  };
}

module.exports = {
  Appointment,
};