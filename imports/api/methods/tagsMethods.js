import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { tags } from '../../db/tagsCollections';

Meteor.methods ( {
   'tags.insert'(newTag){
    if(!this.userId) {
        throw new Meteor.Error('not-authorized','You are not authorizded to add tags.');
    }
    tags.insert({
            ...newTag,  //this means not transaferring newTag rather the contents of the new tag 
            createdAt: new Date(),
            userId: this.userId,
        })
   },
   'tags.delete'(tagId){
    if(!this.userId){
        throw new Meteor.Error('not-authorized','You are not authorized to delete tags.');
    }
    tags.remove({_id:tagId, userId:this.userId});
   },
});