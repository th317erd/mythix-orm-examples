'use strict';

const {
  Types,
} = require('mythix-orm');
const { ModelBase } = require('./model-base');

class CodeableConceptLink extends ModelBase {
  static fields = {
    ...(super.fields ?? {}),
    id: {
      type:         Types.XID(),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    codeableConceptID: {
      type: Types.FOREIGN_KEY('CodeableConcept:id', {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      allowNull: false,
      index:     true,
    },
    // Codeable concepts are links with multiple resources
    referenceType: {
      type:      Types.STRING(32),
      allowNull: false,
    },
    referenceTypeID: {
      type:      Types.XIDType,
      allowNull: false,
    },
    propsName: {
      type:      Types.STRING(32),
      allowNull: false,
    },
    codeableConcept: {
      type: Types.Model('CodeableConcept', ({ self }, { CodeableConcept }, codeableQuery) => {
        return CodeableConcept.$.id.EQ(self.codeableConceptID).MERGE(codeableQuery);
      }),
    },
  };
}

module.exports = {
  CodeableConceptLink,
};