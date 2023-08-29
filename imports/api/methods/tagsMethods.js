import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { tags } from '../../db/tagsCollections';

Meteor.methods ( {
   'tags.insert'(newTag){
        tags.insert({
            newTag, 
            createdAt: new Date(),
            userId: this.userId,
        })
   }
});