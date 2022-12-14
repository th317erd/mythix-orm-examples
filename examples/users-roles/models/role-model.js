'use strict';

const { Types } = require('mythix-orm');
const { ModelBase } = require('./model-base');

class Role extends ModelBase {
  static fields = {
    ...(ModelBase.fields || {}),
    id: {
      type:         Types.XID({ prefix: 'ROL-' }),
      defaultValue: Types.XID.Default.XID,
      allowNull:    false,
      primaryKey:   true,
    },
    userID: {
      columnName:   'user_id',
      type:         Types.FOREIGN_KEY('User:id', {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      allowNull:    false,
      index:        true,
    },
    name: {
      type:         Types.STRING(32),
      allowNull:    false,
      index:        true,
    },
    // Setup a singular relationship with "User"
    user: {
      //                target   context   models    ...args
      type: Types.Model('User', ({ self }, { User }, userQuery) => {
        // self = "this" Role instance
        return User.$.id.EQ(self.userID).MERGE(userQuery);
      }),
    },
  };

  static async createForUser(user, roleName) {
    // It is generally a good idea to fetch the model
    // class from the connection instead of using the class
    // directly. See the connection binding article in the
    // documentation for why this is the case:
    // https://github.com/th317erd/mythix-orm/wiki/ConnectionBinding
    const { Role } = this.getModels();

    return await Role.create({
      userID: user.id,
      name:   roleName,
    });
  }
}

module.exports = {
  Role,
};
