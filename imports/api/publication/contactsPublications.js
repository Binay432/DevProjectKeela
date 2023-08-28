import { Meteor } from 'meteor/meteor';
import { contactsCollection } from '../../db/contactsCollection';

Meteor.publish('contacts', function publishContacts(){
    return contactsCollection.find({userId:this.userId});
});
