import { Meteor } from 'meteor/meteor';
import { contacts } from '../imports/db/contactsCollection';
import '../imports/api/methods/contactsMethods';
import { tags } from '../imports/db/tagsCollections';
import '../imports/api/methods/tagsMethods';

Meteor.publish('contacts', function (){
    if (this.userId) {
        return contacts.find({ userId: this.userId });
    } else {
        return this.ready(); //indicate that the publication is ready but contains no data.
    }
});

Meteor.publish('tags', function publishTags(){
    if(this.userId){
        return tags.find({userId: this.userId});
    } else{
        return this.ready(); //indicate that the publication is ready but contains no data.
    }
   
});
