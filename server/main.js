import { Meteor } from 'meteor/meteor';
import { contacts } from '../imports/db/contactsCollection';
import '../imports/api/methods/contactsMethods';
import { tags } from '../imports/db/tagsCollections';
import '../imports/api/methods/tagsMethods';

Meteor.publish('contacts', function (){
    return contacts.find();

});

Meteor.publish('tags', function publishTags(){
    return tags.find();
})