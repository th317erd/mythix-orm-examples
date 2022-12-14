'use strict';

const { Types } = require('mythix-orm');
const { ModelBase } = require('./model-base');

class User extends ModelBase {
  static fields = {
    ...(ModelBase.fields || {}),
    id: {
      type:         Types.XID({ prefix: 'USR-' }),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    email: {
      type:         Types.STRING(128),
      allowNull:    false,
      index:        true,
      unique:       true,
    },
    phone: {
      type:         Types.STRING(32),
      allowNull:    true,
      index:        true,
    },
    firstName: {
      type:         Types.STRING(32),
      allowNull:    true,
      index:        true,
    },
    lastName: {
      type:         Types.STRING(32),
      allowNull:    true,
      index:        true,
    },
    dob: {
      type:         Types.DATE,
      allowNull:    true,
      index:        true,
    },
    // Setup a plural relationship with "Role"
    roles: {
      //                 target   context   models    ...args
      type: Types.Models('Role', ({ self }, { Role }, userQuery) => {
        // self = "this" User instance
        return Role.$.userID.EQ(self.id).MERGE(userQuery);
      }),
    },
  };

  greet() {
    console.log(`Hello ${this.firstName} ${this.lastName}! How are you today?`);
  }

  async getRoleNames() {
    // "pluckRoles" is injected on the model by the above
    // "roles" relationship.
    return await this.pluckRoles(null, [ 'name' ]);
  }
}

module.exports = {
  User,
};
