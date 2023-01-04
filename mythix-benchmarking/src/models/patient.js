'use strict';

const {
  Types,
} = require('mythix-orm');
const { Person } = require('./person');

class Patient extends Person {
  static fields = {
    ...(super.fields ?? {}),
    telecom: {
      type: Types.Model('ContactPoint', ({ self }, { ContactPoint }, telecomQuery) => {
        return ContactPoint.$.referenceType.EQ('Patient').referenceTypeID.EQ(self.id).MERGE(telecomQuery);
      }),
    },
  };
}

module.exports = {
  Patient,
};