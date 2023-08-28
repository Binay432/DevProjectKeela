import { Meteor } from 'meteor/meteor';
import { contactsCollection } from '../imports/db/contactsCollection';
import '../imports/api/publication/contactsPublications';
import '../imports/api/methods/contactsMethods';

// const insertContact = newContact => TasksCollection.insert({ newContact });
 
// Meteor.startup(() => {
//   if (TasksCollection.find().count() === 0) {
//     [
//       las
//     ].forEach(insertTask)
//   }
// });