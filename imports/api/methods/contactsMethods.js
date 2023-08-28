import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { contactsCollection } from '../../db/contactsCollection';

Meteor.methods ( {
   'contacts.insert'(newContact){
        check(newContact,Object)
        contactsCollection.insert({
            newContact, 
            createdAt: new Date,
            userId: this.userId,
        })
   }
});