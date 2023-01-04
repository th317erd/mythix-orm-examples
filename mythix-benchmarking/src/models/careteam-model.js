'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');
const enums = require('./enum-types');
const { getter, setter } = require('./enum-utils');

class CareTeam extends ModelBase {
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
      get:       getter(enums.CARETEAM_STATUS_CODE_ENUM),
      set:       setter(enums.CARETEAM_STATUS_CODE_ENUM),
    },
    category: {
      type:      Types.STRING(64),
      allowNull: false,
    },
    name: {
      type:      Types.STRING(64),
      allowNull: false,
    },
    // As per standard, it is called 'subject'.
    patientID: {
      type: Types.FOREIGN_KEY('Patient:id', {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      allowNull: false,
      index:     true,
    },
    periodStart: {
      type: Types.DATETIME,
    },
    periodEnd: {
      type: Types.DATETIME,
    },
    note: {
      type: Types.STRING(128),
    },
    patient: {
      type: Types.Model('Patient', ({ self }, { Patient }, patientQuery) => {
        return Patient.$.id.EQ(self.patientID).MERGE(patientQuery);
      }),
    },
    telecom: {
      type: Types.Model('ContactPoint', ({ self }, { ContactPoint }, telecomQuery) => {
        return ContactPoint.$.referenceType.EQ('CareTeam').referenceTypeID.EQ(self.id).MERGE(telecomQuery);
      }),
    },
    participant: {
      type: Types.Model('CareTeamParticipant', ({ self }, { CareTeamParticipant }, participantQuery) => {
        return CareTeamParticipant.$.careTeamID.EQ(self.id).MERGE(participantQuery);
      }),
    },
  };
}

module.exports = {
  CareTeam,
};