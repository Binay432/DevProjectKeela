import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { contacts } from '../../db/contactsCollection';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods ({
  'contacts.insert'(newContact){
    if((!this.userId) || (!Roles.userIsInRole(this.userId, ['Keela Admin','Admin']))) {
      throw new Meteor.Error('not-authorized','You are not authorized to add contact.');
    }
    contacts.insert({
      ...newContact, 
      createdAt: new Date(),
      userId: this.userId,
    })
  },
  'contacts.delete'(contactId){
    if((!this.userId) || (!Roles.userIsInRole(this.userId, ['Keela Admin','Admin']))) {
      throw new Meteor.Error('not-authorized','You are not authorized to delete contact.');
    }
    contacts.remove({_id:contactId, userId:this.userId});
  },
  'contacts.edit'(contactId, updatedContact) {
    if((!this.userId) || (!Roles.userIsInRole(this.userId, ['Keela Admin','Admin']))) {
      throw new Meteor.Error('not-authorized','You are not authorized to edit contact.');
    } 
    contacts.update({ _id: contactId, userId: this.userId }, { $set: updatedContact });
  },

});
