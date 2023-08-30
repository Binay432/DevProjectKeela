<template>
    <home/>
    <div class = "table-grid">
            <div class="contacts-info-box">
                <div class ="left-section"><strong> User Count</strong></div>
                <div class ="middle-section">middle</div>
                <div class="right-section">
                    <button type="button" class="invite-button">Invite User</button>
                    <!-- <contactForm v-if="showForm" :show-Form="showForm" :editingContact ="editingContact" @contact-added="handleContactAdded" @form-closed="formClosed" @contact-edit="handleContactEdit"/>    -->
                </div>
            </div>
        <div class="contacts-table-box">
            <table class="contact-table">
                <thead>
                    <tr>   
                        <th>FULL NAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user._id">
                        <td>{{ user.profile.firstName + user.profile.lastName }}</td>
                        <td>{{ user.emails }}</td>
                        <td>{{ user.profile.orgRole }}</td>
                        <td>
                            <!-- <button class="edit-contact" @click="editContact(contact)">Edit</button> -->
                            <button class="delete-contact">Delete</button>
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
import { ref } from 'vue';
const userInfo = Meteor.user({fields: { email:1, profile:1}});
console.log(userInfo);
export default {
    name:'userTable',
    components:{
        home,
    },
    // meteor:{
    //     $subscribe:{
    //         users:[],
    //     },
    //     users(){
    //         return users.find().fetch();
    //     }
    // }

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
    .invite-button{
        width:100px;
        height:35px;
        border-radius:5px;
        background-color:rgb(198, 138, 198);
        border-style:solid;   
    }
    .add-button:hover{
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
    .delete-contact{
        background-color:rgb(232, 197, 232);
        border:1px solid black;
        width:20%;
        box-sizing: border-box;

    }
    .delete-contact:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    .edit-contact{
        margin-left:5px;
        background-color:rgb(121, 157, 121);
        border:1px solid black;
        width:20%;
        margin-right:5%;
        box-sizing: border-box;
    }
    .edit-contact:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    
</style>