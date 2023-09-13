<template>
    <home/>
    <div class = "table-grid">
            <div class="contacts-info-box">
                <div class ="left-section"><strong>{{ specificOrganization.length }} Contacts</strong></div>
                <div class ="middle-section"></div>
                <div class="right-section">
                    <button type="button" class="add-button" @click="addContact" :disabled="isAddButtonDisabled">Add Contact</button>
                    <!-- editingContat ="editingContact" means just a string of editingContact is props while :editingContat ="editingContact" means contents of editingContact is props -->
                    <contactForm v-if="showForm" :show-Form="showForm" :editingContact ="editingContact" @contact-added="handleContactAdded" @form-closed="formClosed" @contact-edit="handleContactEdit"/>   
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
                    <tr v-for="contact in specificOrganization" :key="contact._id">
                        <td>{{ contact.contactName }}</td>
                        <td>{{ contact.contactEmail }}</td>
                        <td>{{ contact.contactTag._value }}</td>
                        <td>{{ contact.contactNumber }}</td>
                        <td>
                            <button class="edit-contact" @click="editContact(contact)">Edit</button>
                            <button class="delete-contact" @click="deleteContact(contact)">Delete</button>
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>
    </div>
</template>

<script> 
import home from '../Home/home.vue';
import  contactForm  from '../forms/contactForm.vue';
import { contacts } from '../../db/contactsCollection';
import { Meteor } from 'meteor/meteor';

export default{
    name: "contactTable",
    components:{
        home,
        contactForm, 
    },
    data(){
        return {
            showForm: false,
            editingContact: null,
            isAddButtonDisabled : false,
        };
    },
    
    meteor:{
        $subscribe:{
            contacts:[],
        },
        contacts(){
            return contacts.find().fetch();
        },
    },  
    computed:{
        specificOrganization(){
            const currentUser = Meteor.user();
            const currentOrg = currentUser.profile.orgName;
            return this.contacts.filter(contact => contact.orgName === currentOrg);
        },
    },
    methods:{
        onMounted(){
            this.contacts = contacts.find().fetch();
        },
        addContact(){
            Meteor.call('checkCoordinatorRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        alert("Permission Denied");   
                    }else{
                        this.isAddButtonDisabled = false;
                        this.editingContact = null;
                        this.showForm = true;
                    }
                }
            });
        },
        editContact(contact){
            Meteor.call('checkCoordinatorRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        alert("Permission Denied ");   
                    }else{
                        this.isAddButtonDisabled = false;
                        this.editingContact = {...contact};
                        this.showForm = true;
                    }
                }
            });
          
        },
        handleContactAdded(newContact){
            Meteor.call('contacts.insert',newContact ,(error)=>{
                if(error){
                    alert('Error adding contact: ' + error.message);
                }
            });
            this.showForm = false; 
        },

        formClosed(message){
            this.showForm = false;
        },
        deleteContact(contact){
            Meteor.call('checkCoordinatorRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        alert("Permission Denied");   
                    }else{
                        if(confirm('Are you sure you want to delete this contact?')){
                            Meteor.call('contacts.delete', contact._id, (error)=>{
                                if(error){
                                    console.error('Error deleting contact:', error);
                                    alert('Error deleting contact: ' + error.message);
                                }
                            });
                        }
                    }
                }
            });
        },
        handleContactEdit(contactId, newContact){
            if(confirm('Are you sure you want to edit this contact?')){
                Meteor.call('contacts.edit', contactId, newContact, (error)=>{
                    if(error){
                        console.error('Error updating contact:', error);
                        alert('Error editing contact: ' + error.message);
                    }
                });
            }
            this.showForm = false;
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