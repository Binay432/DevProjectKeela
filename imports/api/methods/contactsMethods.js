import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { contacts } from '../../db/contactsCollection';

Meteor.methods ( {
   'contacts.insert'(newContact){
        contacts.insert({
            newContact, 
            createdAt: new Date(),
            userId: this.userId,
        })
   }
});