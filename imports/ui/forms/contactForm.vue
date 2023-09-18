<template>
    <div v-if ="showForm" class= "form-overlay">
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
                    <li v-for="tag in selectedTag" :key="tag">{{ tag.tagName }}<span class="remove-tag" @click="removeTag(tag)"> x</span> </li>
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
            const orgName = ref([]);

            const addContact = () => {
                const currentUser = Meteor.user();
                const currentOrg = currentUser.profile.orgId;
                console.log(currentOrg);
                const newContact = {
                    contactName : contactName.value.trim(),
                    contactEmail : contactEmail.value.trim(),
                    contactTag : {...selectedTag},
                    contactNumber : contactNumber.value.trim(), 
                    orgId : currentOrg, 
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
                Meteor.call('getTagIdByName',contactTag,(error, result)=>{
                    if(error){
                        alert(error.reason);
                    }else{
                        selectedTag.value.push({tagId: result, tagName:contactTag});
                    }
                })
                console.log(selectedTag);
                // selectedTag.value.push(contactTag);
            };
            const removeTag = (tag) =>{
                let indexOftag = selectedTag.value.indexOf(tag);
                selectedTag.value.splice(indexOftag, 1);
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

<style scoped lang="scss">
    @import "../../../src/shared-form-styles.scss"   
</style>
