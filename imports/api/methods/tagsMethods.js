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
    'tags.edit'(tagId, updatedTag) {
        if (this.userId) {
          tags.update({ _id: tagId}, { $set: updatedTag});
        } else {
          throw new Meteor.Error('not-authorized', 'You are not authorized to edit this tag.');
        }
    },
    'getTagIdByName'(tagName) {
        const tag = tags.findOne({tagName});
        if (tag) {
          return tag._id;
        } else {
          throw new Meteor.Error('tag-not-found', 'tag not found');
        }
    },
    'getTagNameById'(tagIds) {
      const ListOfTags = tags.find({ _id: {$in: tagIds} }).fetch().map(tag=>tag.tagName);
      if (ListOfTags.length) {
          return ListOfTags;
        }else {
          throw new Meteor.Error('tag-not-found', 'tag not found');
      }
  }
});