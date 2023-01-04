'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');
const enums = require('./enum-types');
const { getter, setter } = require('./enum-utils');

class Encounter extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    status: {
      type:      Types.INTEGER,
      allowNull: false,
      get:       getter(enums.ENCOUNTER_STATUS_CODE_ENUM),
      set:       setter(enums.ENCOUNTER_STATUS_CODE_ENUM),
    },
    class: {
      type:      Types.STRING(16),
      allowNull: false,
    },
    type: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('type')),
    },
    serviceType: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('serviceType')),
    },
    priority: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('priority')),
    },
    reasonCode: {
      type: Types.Model('CodeableConceptLink', codeableConceptLookUp('reasonCode')),
    },
    //As per the standard, it is `subject`
    patientID: {
      type: Types.FOREIGN_KEY('Patient:id', {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      allowNull: false,
      index:     true,
    },
    startPeriod: {
      type:      Types.DATETIME,
      allowNull: true,
    },
    endPeriod: {
      type:      Types.DATETIME,
      allowNull: true,
    },
    length: {
      type:      Types.INTEGER,
      allowNull: true,
    },
    appointment: {
      type: Types.Model('Appointment', ({ self }, { Appointment }, appQuery) => {
        return Appointment.$.encounterID.EQ(self.id).MERGE(appQuery);
      }),
    },
    diagnosis: {
      type: Types.Model('Diagnosis', ({ self }, { Diagnosis }, diagnosisQuery) => {
        return Diagnosis.$.encounterID.EQ(self.id).MERGE(diagnosisQuery);
      }),
    },
  };
}

function codeableConceptLookUp(props) {
  return ({ self }, { CodeableConceptLink }, linkQuery) => {
    return CodeableConceptLink.$
      .referenceType.EQ('Encounter')
      .referenceTypeID.EQ(self.id)
      .propsName.EQ(props)
      .MERGE(linkQuery);
  };
}

module.exports = {
  Encounter,
};