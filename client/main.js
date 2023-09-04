// main entry point is in imports/ui/main.jsx
import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
  Meteor.subscribe('contactsAll');
  Meteor.subscribe ('tags');
  Meteor.subscribe('userData');
  Meteor.subscribe('organizations');
});

