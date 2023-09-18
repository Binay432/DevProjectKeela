<template>
    <home/>
    <div class = "table-grid">
        <button class ="back-button" @click="backToOrganization">Back</button>
        <div class="table-info-box">
            <div class ="left-section"><strong>{{ specificOrganization.length }} Users</strong></div>
            <div class ="middle-section"><strong>Organization:</strong> {{ orgName}}</div>
            <div class="right-section">
                <button type="button" class="add-button" @click="inviteUser" :disabled="isInviteButtonDisabled">Invite User</button>
                <inviteForm v-if="showForm" :show-Form="showForm" :editingUser ="editingUser" @invite-user="handleInviteContact" @user-edit ="handleUserEdit" @form-closed = "formClosed"/>   
            </div>
        </div>
        <div class="table-box">
            <table class="table">
                <thead>
                    <tr>   
                        <th>FULL NAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in specificOrganization" :key="user._id">
                        <td>{{ user.profile.firstName +' '+ user.profile.lastName }}</td>
                        <td>{{ user.emails[0].address }}</td>
                        <td>{{ user.profile.orgRole }}</td>
                        <td>
                            <button class="edit-button" @click="editUser(user)">Edit</button>
                            <button class="delete-button" @click="deleteUser(user)">Delete</button>
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>
    </div>
</template>


<script>
import home from '../Home/home.vue';
import { Meteor } from 'meteor/meteor';
import inviteForm from '../forms/inviteForm.vue';

export default {
    name:'userTable',
    components:{
        home,
        inviteForm,
    },
    props: {
        orgId: String,
        orgName: String,
    },
    computed:{
        specificOrganization(){
            if(!Meteor.user()){
                return [];
            }else{
                return this.users.filter(user => user.profile.orgId === this.orgId);
            }  
        }, 
    },
    data(){
        return {
            showForm: false, 
            editingUser: null,
            isInviteButtonDisabled : false,
        }
    },
    meteor: {
        $subscribe: {
            users: [],
        },
        users() {
            return Meteor.users.find({}).fetch();
        },
    },
    methods:{
        inviteUser(){
            this.showForm = true;
            this.editingUser = null;
        },
        editUser(user){
            if((user._id === Meteor.userId()) || (user.profile.orgRole === 'Keela Admin')){
                Meteor.call('checkAdminRole',(error,result) =>{
                    if(error){
                        alert('Error Checking permission : ', error.message);
                    }else if(result){
                        alert("Permission Denied");
                    }else{
                        Meteor.call('checkKeelaAdminRole',(error, result) => {
                            if(error){
                                alert('Error Checking permission : ', error.message);
                            }else if(result){
                                this.editingUser = {...user};
                                this.showForm = true;
                            }
                        })
                    }
                })
            }else{
                this.editingUser = {...user};
                this.showForm = true;
            }
            
        },
        handleInviteContact(newUser){
            const user = {
                    email : newUser.email,
                    password : newUser.password,
                    confirmPassword : newUser.Password,
                    profile:{
                        firstName : newUser.firstName,
                        lastName : newUser.lastName,
                        orgId: this.orgId,
                        orgName : this.orgName,
                        orgRole : newUser.orgRole,
                    },
                }
                Meteor.call('createUserAccount',user, (error) =>{
                    if(error){
                        alert(error.reason);
                    }else{
                        alert('User registered succefully');
                    }
                })
            this.showForm = false;
        },
        handleUserEdit(userId, newUser){
            console.log(userId);
            console.log(newUser);
            if(confirm('Are you sure you want to edit this user?')){
                const user = {
                    emails  : [
                        {address: newUser.email, verified: false}
                    ],
                    profile:{
                        firstName : newUser.firstName,
                        lastName : newUser.lastName,
                        orgId: this.orgId,
                        orgName : this.orgName,
                        orgRole : newUser.orgRole,
                    },
                }
                Meteor.call('users.edit', userId, user, (error)=>{
                    if(error){
                        console.error('Error updating user:', error);
                        alert('Error editing user: ' + error.message);
                    }
                });
            }
            this.showForm = false;
        },
        formClosed(message){
            console.log(message);
            this.showForm = false;
        },
        deleteUser(user){
            if((user._id === Meteor.userId()) || (user.profile.orgRole === 'Keela Admin')){
                Meteor.call('checkAdminRole',(error,result) =>{
                    if(error){
                        alert('Error Checking permission : '+  error.message);
                    }else if(result){
                        alert("Permission Denied");
                    }
                });
                Meteor.call('checkKeelaAdminRole',(error,result) =>{
                    if(error){
                        alert('Error Checking permission : '+  error.message);
                    }else if(result){
                        if(confirm('Are you sure you want to delete this user?')){
                            Meteor.call('users.delete', user._id, (error)=>{
                                if(error){
                                    console.error('Error deleting contact:', error);
                                    alert('Error deleting contact: ' + error.message);
                                }
                            });
                        }
                    }
                });
            }else{
                if(confirm('Are you sure you want to delete this user?')){
                    Meteor.call('users.delete', user._id, (error)=>{
                        if(error){
                            console.error('Error deleting contact:', error);
                            alert('Error deleting contact: ' + error.message);
                        }
                    });
                }
            }
        },
       backToOrganization(){
            this.$router.push('/organizations');
       },
       
    }
}
</script>

<style scoped lang="scss">
@import "../../../src/shared-table-styles.scss" 
</style>
