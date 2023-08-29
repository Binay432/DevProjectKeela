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
   },
   'contacts.delete'(contactId){
    if(!this.userId) {
        throw new Meteor.Error('not-authorized','You are not authorizded to delete contacts.');
    }
    contacts.remove({_id:contactId, userId:this.userId});
  }
});
