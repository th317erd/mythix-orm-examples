'use strict';

const { SQLiteConnection } = require('mythix-orm-sqlite');
const Models = require('./models');

// Entry point
(async function() {
  console.log('Creating connection...');

  let connection = new SQLiteConnection({
    models: Models,
    // logger: console, // uncomment this to see all SQL statements sent to the database
  });

  try {
    console.log('Starting connection...');
    await connection.start();

    console.log('Creating tables in the database...');
    await connection.createTables(Models);

    await main(connection);
  } finally {
    console.log('Stopping the connection...');
    await connection.stop();
  }
})();

async function main(connection) {
  const { User, Role } = connection.getModels();

  let user = await connection.transaction(async () => {
    let user = await User.create({
      email: 'test@example.com',
      phone: '123-456-7890',
      firstName: 'Mythix',
      lastName: 'ORM',
      dob: '1986-10-16',
    });

    // Log out the model
    console.log('Our User model: ', user);

    // The "getRoles" method of the user is injected
    // by the "roles" relationship of the User model.
    let roles = await user.getRoleNames();
    if (roles.length === 0) {
      console.log('Oh no! You have no roles! Let\'s add some for you!');

      await Role.createForUser(user, 'admin');
      await Role.createForUser(user, 'tester');

      console.log('Created two roles for the user');
    }

    return user;
  });

  let roles = await user.getRoleNames();
  if (roles.length > 0) {
    console.log(`Yay! Now you have the following roles: ${roles.join(', ')}`);
  }

  // Reload user model using a query
  user = await User.where.email.EQ('test@example.com').first();

  // Greet our user
  user.greet();

  console.log('Destroying user!');

  // Now delete our user
  await user.destroy();

  // onDelete: 'CASCADE' on the foreign key
  // of the Roles:userID field should also
  // delete the user's roles when the user
  // is deleted.
  console.log('Remaining Users: ', await User.count());
  console.log('Remaining Roles: ', await Role.count());
}
