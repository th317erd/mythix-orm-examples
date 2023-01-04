'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');

class CareTeamParticipant extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    role: {
      type:      Types.STRING(64),
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
    careTeamID: {
      type: Types.FOREIGN_KEY('CareTeam:id', {
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
    practitioner: {
      type: Types.Model('Practitioner', ({ self }, { Practitioner }, practitionerQuery) => {
        return Practitioner.$.id.EQ(self.practitionerID).MERGE(practitionerQuery);
      }),
    },
    careTeam: {
      type: Types.Model('CareTeam', ({ self }, { CareTeam }, careTeamQuery) => {
        return CareTeam.$.id.EQ(self.careTeamID).MERGE(careTeamQuery);
      }),
    },
  };
}

module.exports = {
  CareTeamParticipant,
};