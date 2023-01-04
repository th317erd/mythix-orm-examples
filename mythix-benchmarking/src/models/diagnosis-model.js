'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');

class Diagnosis extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    condition: {
      // For the benchmarking purpose, keeping the condition as simple type
      type:      Types.STRING(64),
      allowNull: false,
    },
    use: {
      type: Types.Model('CodeableConceptLink', ({ self }, { CodeableConceptLink }, linkQuery) => {
        return CodeableConceptLink.$
          .referenceType.EQ('Diagnosis')
          .referenceTypeID.EQ(self.id)
          .propsName.EQ('use')
          .MERGE(linkQuery);
      }),
    },
    rank: {
      type:      Types.INTEGER,
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

module.exports = {
  Diagnosis,
};
