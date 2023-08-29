import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { contacts } from '../../db/contactsCollection';

Meteor.methods ( {
   'contacts.insert'(newContact){
    if(!this.userId) {
        throw new Meteor.Error('not-authorized','You are not authorizded to add contacts.');
    }
    contacts.insert({
            ...newContact, 
            createdAt: new Date(),
            userId: this.userId,
        })
   },
   'contacts.delete'(contactId){
    if(!this.userId) {
        throw new Meteor.Error('not-authorized','You are not authorizded to delete contacts.');
    }
    contacts.remove({_id:contactId, userId:this.userId});
  },
  'contacts.edit'(contactId, updatedContact) {
    check(contactId, String);
    check(updatedContact, Object);
    if (this.userId) {
      contactsCollection.update({ _id: contactId, userId: this.userId }, { $set: updatedContact });
    } else {
      throw new Meteor.Error('not-authorized', 'You are not authorized to edit this contact.');
    }
  },
  'contacts.getCount'() {
    console.log('Method executed');
    if (this.userId) {
      const count = contacts.find({ userId: this.userId }).count();
      console.log('Contact Count:', count);
      return count;
    }
    console.log('User not logged in');
    return 0;
  },
});
