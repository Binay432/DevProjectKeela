import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Roles.getAllRoles().length === 0) {
    Roles.createRole('Keela Admin');
    Roles.createRole('Admin');
    Roles.createRole('Coordinator');
  }
});

Meteor.methods({
  'roles.getRoles'() {
    // Fetch roles 
    return Roles.getAllRoles().fetch();
  },
    'assignRole'(userId, roleName) {
        // Check if the user already has a role
        const userRoles = Roles.getRolesForUser(userId);
        if (userRoles && userRoles.length > 0) {
          throw new Meteor.Error('user-already-has-role', 'User already has a role assigned.');
        }    // Assign the specified role to the user
        else if (userId && roleName) {
          Roles.addUsersToRoles(userId, roleName);
        }
      },
});