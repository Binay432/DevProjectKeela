import { Mongo } from 'meteor/mongo';

export const organizations = new Mongo.Collection('organizations');
//here contactsCollection is a collection to be used here while "contacts" refers to the name to be display/assign to the collection 
