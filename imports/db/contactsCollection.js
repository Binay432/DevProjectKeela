import { Mongo } from 'meteor/mongo';
 
export const contactsCollection = new Mongo.Collection('contacts');
//here contactsCollection is a collection to be used here while "contacts" refers to the name to be display/assign to the collection 
