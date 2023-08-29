<template>
    <home/>
    <div class = "table-grid">
            <div class="contacts-info-box">
                <div class ="left-section">Number of contacts</div>
                <div class ="middle-section">middle</div>
                <div class="right-section">
                    <button type="button" class="add-button" @click="showForm = true">Add Contact</button>
                    <contact-form v-if="showForm" :show-Form="showForm" @contact-added="handleContactAdded" @form-closed="formClosed"/>
                </div>
            </div>
        <div class="contacts-table-box">
            <table class="contact-table">
                <thead>
                    <tr>   
                        <th>FULL NAME</th>
                        <th>EMAIL</th>
                        <th>TAGS</th>
                        <th>CONTACT NUMBER</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contact in contacts" :key="contact._id">
                        <td>{{ contact.newContact.contactName }}</td>
                        <td>{{ contact.newContact.contactEmail }}</td>
                        <td>{{ contact.newContact.contactTag }}</td>
                        <td>{{ contact.newContact.contactNumber }}</td>
                        <td>
                            <button class="edit-contact">Edit</button>
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
import { ref , onMounted} from 'vue';
import contactForm from '../forms/contactForm.vue';
import { contacts } from '../../db/contactsCollection';
import { Meteor} from 'meteor/meteor';

export default{
    name: "contactTable",
    data(){
        return {
            showForm: false,
        };
    },
    meteor:{
        $subscribe:{
            contacts:[]
        },
        contacts(){
            return contacts.find().fetch();
        }
    },
    components:{
        home,
        contactForm, 
    },
 
    methods:{
        onMounted(){
            this.contacts = contacts.find().fetch();
        },
        handleContactAdded(newContact){
            Meteor.call('contacts.insert',newContact);
            this.showForm = false; 
        },

        formClosed(message){
            this.showForm = false;
        }
    },
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
    .add-button{
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