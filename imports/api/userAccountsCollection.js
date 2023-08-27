import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Contacts = new Mongo.Collection('contacts');

if (Meteor.isServer) {
    Meteor.publish('contacts', function () {
      return Contacts.find({})
    })
  }
  