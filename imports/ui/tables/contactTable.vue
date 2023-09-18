<template>
    <home/>
    <div class = "table-grid">
            <div class="table-info-box">
                <div class ="left-section"><strong>{{ specificOrganization.length }} Contacts</strong></div>
                <div class ="middle-section"></div>
                <div class="right-section">
                    <button v-if="checkPermission" type="button" class="add-button" @click="addContact" :disabled="isAddButtonDisabled">Add Contact</button>
                    <!-- editingContat ="editingContact" means just a string of editingContact is props while :editingContat ="editingContact" means contents of editingContact is props -->
                    <contactForm v-if="showForm" :show-Form="showForm" :editingContact ="editingContact" @contact-added="handleContactAdded" @form-closed="formClosed" @contact-edit="handleContactEdit"/>   
                </div>
            </div>
        <div class="table-box">
            <table class="table">
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
                    <tr  v-for="contact in specificOrganization" :key="contact._id">
                        <td>{{ contact.contactName }}</td>
                        <td>{{ contact.contactEmail }}</td>
                        <td>{{ getTagName(contact.contactTag._value.map(tag=> tag.tagId))}}</td>
                        <td>{{ contact.contactNumber }}</td>
                        <td>
                            <button v-if="checkPermission" class="edit-button" @click="editContact(contact)">Edit</button>
                            <button v-if="checkPermission" class="delete-button" @click="deleteContact(contact)">Delete</button>
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
            contactTags :[],
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
            const currentOrg = currentUser.profile.orgId;
            return this.contacts.filter(contact => contact.orgId === currentOrg);
        },
        checkPermission(){
            const userRole = Meteor.user().profile.orgRole;
            if(userRole === 'Coordinator'){
                return false;
            }else{
                return true;
            }
        }
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
        // getTagName(tagId){
        //     const tagNames = [];
        //     for(let i=0; i<tagId.length; i++){
        //         Meteor.call('getTagNameById',tagId[i],(error, result) => {
        //             if(error){
        //                 alert(error.message);
        //             }else{
        //                 tagNames.push(result);
        //             }
        //         })
        //     }
        //     console.log(tagNames)
        // }
        async getTagName(tagIds) {
            const tagNamePromises = tagIds.map(tagId => {
                return new Promise((resolve, reject) => {
                    Meteor.call('getTagNameById', tagId, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                });
            });

            try {
                const tagNames = await Promise.all(tagNamePromises);
                console.log(tagNames.join(',')); 
                return tagNames.join(',');
            } catch (error) {
                alert(error.message); 
                return '';
            }
        },

    }
}
</script>

<style scoped lang="scss">
@import "../../../src/shared-table-styles.scss"   
</style>