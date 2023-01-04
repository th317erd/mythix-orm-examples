'use strict';

const {
  Types,
} = require('mythix-orm');
const { Person } = require('./person');

class Practitioner extends Person {
  static fields = {
    ...(super.fields ?? {}),
    qualification: {
      type: Types.Model('Qualification', ({ self }, { Qualification }, qualificationQuery) => {
        return Qualification.$.practitionerID.EQ(self.id).MERGE(qualificationQuery);
      }),
    },
    telecom: {
      type: Types.Model('ContactPoint', ({ self }, { ContactPoint }, telecomQuery) => {
        return ContactPoint.$.referenceType.EQ('Practitioner').referenceTypeID.EQ(self.id).MERGE(telecomQuery);
      }),
    },
  };
}

module.exports = {
  Practitioner,
};