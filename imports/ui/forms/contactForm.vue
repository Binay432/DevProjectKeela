<template>
    <div v-if ="showForm" class= "contact-form-overlay">
        <div class="modal">
            <div class="close-button" @click="closeForm">
                <img class ="form-close-icon"  src="cross.png">
            </div>
            <h2>{{ editingContact ? 'Edit Contact' : 'Add Contact' }}</h2>
            <form @submit.prevent = "addContact">
                <input type="text" v-model="contactName" placeholder="Name" required>
                <input type="email" v-model="contactEmail" placeholder="Eamil" required>
                <select  class="dropdown" id="tags" v-model="contactTag" placeholder="Tags" @change="addTag(contactTag)">
                    <option v-for="tag in tags" :key="tag._id" :value="tag.tagName">{{ tag.tagName }}</option>
                </select>
                <ul>
                    <li v-for="tag in selectedTag" :key="tag">{{ tag }}<span class="remove-tag" @click="removeTag(tag)"> x</span> </li>
                </ul>
                <input type= "text" v-model ="contactNumber" placeholder = "Number" required>
                <button type="submit">{{ editingContact ? 'Save' : 'Add' }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import { tags } from '../../db/tagsCollections';
import { Meteor } from 'meteor/meteor';

    export default {
        name:"contactForm",
        props:{
            showForm:Boolean, // props defined a properties (showForm here) that is expected to recieve from parent components and here its in the boolean form which is used to verify in the above template 
            editingContact: {
                type: Object,
                default: {}
            },
        }, 
        meteor:{
            $subscribe:{
                tags:[],
            },
            tags(){
                return tags.find().fetch();
            },
        }, 
        setup (props, context){
            const contactName = ref (props.editingContact? props.editingContact.contactName: '');
            const contactEmail = ref (props.editingContact? props.editingContact.contactEmail: '');
            const contactTag = ref (props.editingContact ? [props.editingContact.contactTag]: []);
            const contactNumber = ref (props.editingContact ? props.editingContact.contactNumber: '');
            const selectedTag = ref([]);

            const addContact = () => {
                const currentUser =Meteor.user();
                const newContact = {
                    contactName : contactName.value.trim(),
                    contactEmail : contactEmail.value.trim(),
                    contactTag : contactTag.value.trim(),
                    contactNumber : contactNumber.value.trim(), 
                };
                if (props.editingContact){
                        const contactId = props.editingContact._id;
                        context.emit('contact-edit',contactId, newContact);
                }else{
                    context.emit('contact-added', newContact); //alternative this.$emit()
                }
                // Clear form fields
                contactName.value = '';
                contactEmail.value = '';
                contactNumber.value = '';
                contactTag.value = '';
                selectedTag.value = [];
            };
            const closeForm = () => {
                context.emit('form-closed', "Closed");
            };
            const addTag = (contactTag) =>{
                selectedTag.value.push(contactTag);
                console.log(selectedTag);
            };
            const removeTag = (tag) =>{
                let indexOftag = selectedTag.value.indexOf(tag);
                selectedTag.value.splice(indexOftag, 1);
                console.log(selectedTag);
            };
            return {
                contactName,
                contactEmail,
                contactTag,
                contactNumber,
                addContact,
                closeForm,
                selectedTag,
                addTag,
                removeTag,
            };
        },
        
    };
   
</script>

<style scoped>
    .contact-form-overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* Higher than the table's z-index */
    }
    .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    }
    .modal input{
        width: 300px; 
        height: 40px;
        padding-left:20px;
        display:block;
        margin-right:auto;
        margin-left:auto;
        margin-top:10px;
        border: 1px solid;
        border-color:skyblue;
        } 
    .modal button{
        width: auto;
        border: 1px solid;
        margin-right:auto;
        margin-left:auto;
        margin-top:10px;
        width:300px;
        height:40px;
        border:1px solid rgb(133, 131, 131);
        margin-bottom: 10px;
    }
    .modal button:hover{
        cursor:pointer;
        background-color:antiquewhite;
    }
    .close-button{
        position: relative;
        width:100%;
    }
    .form-close-icon{
        height:18px;
        position: absolute;
        right:0;
    }
    .form-close-icon:hover{
        cursor : pointer;
    }
    .dropdown{
    width: 300px; 
    height: 40px;
    padding-left:20px;
    display:block;
    margin-right:auto;
    margin-left:auto;
    margin-top:10px;
    border:1px solid rgb(26, 25, 25);
    }
    .remove-tag:hover{
       cursor:pointer;
    }


</style>