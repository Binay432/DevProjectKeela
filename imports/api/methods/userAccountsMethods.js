import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'createUserAccount'(user){
        //this will prevent user from auto logged in 
        const userId = Accounts.createUser(user);
        //following code will asisigned role 
        if (user.profile.orgRole){
            Meteor.call('assignRole', userId, user.profile.orgRole, (error) => {
                    if (error) {
                    console.error(error.reason);
                    } 
                })
            }
    },
    'users.edit'(userId, updatedUser){
        if(this.userId){
            Meteor.users.update({_id: userId}, {$set: updatedUser});
        }else{
            throw new Meteor.Error('not-authorized', 'You are not authorized to edit this user info');
        }
    },
    'users.delete'(userId){
        if(!this.userId){
            throw new Meteor.Error('not-authorized','You are not authorzed to delete organization.');
        }
        Meteor.users.remove(userId);
    }
})