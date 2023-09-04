import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { organizations } from '../../db/organizationsCollection';

Meteor.methods ({
    'organizations.insert'(newOrganization){
        if(!this.userId){
            throw new Meteor.Error('not-authorized','You are not authorzed to add organization.');
        }
        organizations.insert({
            ...newOrganization,
            createdAt: new Date(),
            userId: this.userId,
        })
    },
    'organizations.delete'(organizationId){
        if(!this.userId){
            throw new Meteor.Error('not-authorized','You are not authorzed to delete organization.');
        }
        organizations.remove({_id:organizationId, userId:this.userId});
    },
    'organizations.edit'(organizationId, updatedOrganization){
        if (this.userId) {
            organizations.update({ _id: organizationId, userId: this.userId }, { $set: updatedOrganization });
        } else {
            throw new Meteor.Error('not-authorized', 'You are not authorized to edit this organization.');
        }
    }
})

