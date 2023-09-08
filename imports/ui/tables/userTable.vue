<template>
    <home/>
    <div class = "table-grid">
        <button class = "back-button" @click="backToOrganization">Back</button>
        <div class="contacts-info-box">
            <div class ="left-section"><strong>{{ specificOrganization.length }} Users</strong></div>
            <div class ="middle-section">{{ orgName }}</div>
            <div class="right-section">
                <button type="button" class="invite-button" @click="inviteUser">Invite User</button>
                <inviteForm v-if="showForm" :show-Form="showForm" :editingUser ="editingUser" @invite-user="handleInviteContact" @user-edit ="handleUserEdit" @form-closed = "formClosed"/>   
            </div>
        </div>
        <div class="contacts-table-box">
            <table class="contact-table">
                <thead>
                    <tr>   
                        <th>FULL NAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                        <th>ORG</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in specificOrganization" :key="user._id">
                        <td>{{ user.profile.firstName + user.profile.lastName }}</td>
                        <td>{{ user.emails[0].address }}</td>
                        <td>{{ user.profile.orgName }}</td>
                        <td>{{ user.profile.orgRole }}</td>
                        <td>
                            <button class="edit-user" @click="editUser(user)">Edit</button>
                            <button class="delete-user" @click="deleteUser(user)">Delete</button>
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
import { ref, onMounted } from 'vue';
import inviteForm from '../forms/inviteForm.vue';


export default {
    name:'userTable',
    components:{
        home,
        inviteForm,
    },
    props: {
        orgName: String,
    },
    computed:{
        specificOrganization(){
            return this.users.filter(user => user.profile.orgName === this.orgName);
        }, 
    },
    data(){
        return {
            showForm: false, 
            editingUser: null,
        }
    },
    meteor: {
        $subscribe: {
            users: [],
        },
        users() {
            return Meteor.users
                .find({}).fetch();
        },
    },
    methods:{
        inviteUser(){
            this.showForm = true;
            this.editingUser = null;
        },
        editUser(user){
            this.editingUser = {...user};
            console.log("user to be edited"+ {...user});
            this.showForm = true;
        },
        handleInviteContact(newUser){
            console.log(this.orgName);
            const user = {
                    email : newUser.email,
                    password : newUser.password,
                    confirmPassword : newUser.Password,
                    profile:{
                        firstName : newUser.firstName,
                        lastName : newUser.lastName,
                        orgName : this.orgName,
                        orgRole : newUser.orgRole,
                    },
                }
            Accounts.createUser(user, (error) => {
                    if(error){
                        console.error(error.reason);
                    }
                });
            this.showForm = false;
        },
        handleUserEdit(userId, newUser){
            if(confirm('Are you sure you want to edit this user?')){
                Meteor.call('users.edit', userId, newUser, (error)=>{
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
            if(confirm('Are you sure you want to delete this user?')){
                Meteor.call('users.delete', user._id, (error)=>{
                    if(error){
                        console.error('Error deleting contact:', error);
                        alert('Error deleting contact: ' + error.message);
                    }
                });
            }
        },
       backToOrganization(){
            this.$router.push('/organizations');
       },
       
    }
}
</script>


<style scoped>
    .table-grid{
        display:grid;
        grid-template-rows:50px 1fr;
        margin-top:70px;
        margin-left:200px;
        margin-right:50px;

    }
    .contacts-info-box{
        border:1px solid rgb(168, 166, 166);
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:0.5%
    }
    .left-section{
        display:flex;
        margin-left:5px;
    }
    .right-section{
        display:flex;
        margin-right:5px;
    }
    .contacts-table-box{
        background-color:white;
        border:1px solid rgb(168, 166, 166);
    }
    .invite-button,.back-button{
        width:100px;
        height:35px;
        border-radius:5px;
        background-color:rgb(198, 138, 198);
        border-style:solid;   
    }
    
    .invite-button:hover,.back-button:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    .contact-table{
        border-collapse:collapse;
        margin :0 0;
        font-size:0.9em;
        min-width:400px;
        border-radius: 5px 5px 0 0;
        overflow:hidden;
        box-shadow: 0 0 2px rgba(0,0,0,0.15);
        table-layout:fixed;
        width:100%
    }
    .contact-table thead tr{
        color:black;
        text-align:left;
        font-weight:bold;
        border-bottom:1px solid black;;
    }
    .contact-table th,
    .contact-table td{
        padding:12px 15px;
    }
    .contact-table tbody tr{
        border-bottom:1px solid #dddddd;
        text-align:left;
    }
    .contact-table tbody tr:nth-of-type(even){
        background-color:#f3f3f3;
    }
    .delete-user{
        background-color: red;
        border:1px solid black;
        width:20%;
        box-sizing: border-box;

    }
    .delete-user:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    .edit-user{
        margin-left:5px;
        background-color:rgb(121, 157, 121);
        border:1px solid black;
        width:20%;
        margin-right:5%;
        box-sizing: border-box;
    }
    .edit-user:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    
</style>