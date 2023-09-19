import { Meteor } from 'meteor/meteor';
import { contacts } from '../imports/db/contactsCollection';
import '../imports/api/methods/contactsMethods';
import { tags } from '../imports/db/tagsCollections';
import '../imports/api/methods/tagsMethods';
import { organizations } from '../imports/db/organizationsCollection';
import '../imports/api/methods/organizationsMethods';
import '../imports/api/methods/userAccountsMethods';
import './roles';


Meteor.publish('contacts', function (){
    if (this.userId) {
        return contacts.find({'orgId': Meteor.user().profile.orgId});
    } else {
        return this.ready(); //indicate that the publication is ready but contains no data.
    }
});
Meteor.publish('tags', function publishTags(){
    if(this.userId){
        return tags.find({'orgId': Meteor.user().profile.orgId});
    } else{
        return this.ready(); //indicate that the publication is ready but contains no data.
    }  
});
Meteor.publish('userData', function () {
    if(this.userId){
        return Meteor.users.find({});
    }else{
        return this.ready();
    }   
});
Meteor.publish('organizations', function (){
    if(this.userId){
        if(Roles.userIsInRole(this.userId,'Keela Admin')){
            console.log("enter keela admin");
            return organizations.find();
        }
        else if(Roles.userIsInRole(this.userId, 'Admin')){
            console.log("enter admin");
            return organizations.find({'_id': Meteor.user().profile.orgId});
        }else{
            return "Permission Denied";
        }       
    }else{
        return this.ready();
    }
});

Meteor.users.allow({
    remove(userId, doc) {
        return true; 
    },
    update(user, doc){
        return true;
    }
});
Meteor.users.allow({
    update(userId, doc){
        return true;
    }
});

