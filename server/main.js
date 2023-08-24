import { Meteor } from 'meteor/meteor';
import {userAccounts} from '../imports/api/userAccountsCollection'; //useraccount is for contacts collection and not the signup data collection 
// import { Accounts } from 'meteor/accounts-base';

// Meteor.methods({
//     signupUser(userData){
//         const userId = Accounts.createUser({
//             firsName: userData.firstName,
//             email: userData.email,
//             password: userData.password,
//         });

//         //Store additional user data
//         Meteor.users.update(userId, {
//             $set:{
//                 organizationName:userData.organizationName,
//                 organizationRole: userData.organizationRole,
//             },
//         });
//     },
// });