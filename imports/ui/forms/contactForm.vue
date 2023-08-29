<template>
    <div v-if ="showForm" class= "contact-form-overlay">
        <div class="modal">
            <div class="close-button" @click="closeForm">
                <img class ="form-close-icon"  src="cross.png">
            </div>
            <h2>Add Contact{{ contactName }}</h2>
            <form @submit.prevent = "addContact">
                <input type="text" v-model="contactName" placeholder="Name" required>
                <input type="email" v-model="contactEmail" placeholder="Eamil" required>
                <input type= "text" v-model ="contactTag" placeholder = "Tag" required>
                <input type= "text" v-model ="contactNumber" placeholder = "Number" required>
                <button type="submit">{{ editingContact ? 'Save' : 'Add' }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';

export default {
    name:"contactForm",
    props:{
        showForm:Boolean, // props defined a properties (showForm here) that is expected to recieve from parent components and here its in the boolean form which is used to verify in the above template 
        editingContact: {
            type: Object,
            default: {}
        },
    },
    created() {
        console.log('editingContact prop in contactForm:', this.editingContact);
    },
    data(){
        // console.log(this.editingContact.newContact);
        return {
            contactName: this.editingContact ? this.editingContact.newContact.contactName: '',
            contactEmail: this.editingContact? this.editingContact.contactEmail:'',
            contactTag: this.editingContact? this.editingContact.contactTag: '',
            contactNumber: this.editingContact? this.editingContact.contactNumber: '',
        }
    }, 
    setup (props, context){
        console.log(props.editingContact);
        const contactName = ref (props.editingContact?.newContact ? props.editingContact.newContact.contactName: '');
        const contactEmail = ref ('');
        const contactTag = ref ('');
        const contactNumber = ref ('');

        const addContact = () => {
            const currentUser =Meteor.user();
            const newContact = {
                contactName : contactName.value.trim(),
                contactEmail : contactEmail.value.trim(),
                contactTag : contactTag.value.trim(),
                contactNumber : contactNumber.value.trim(), 
            };
            context.emit('contact-added', newContact); //alternative this.$emit()
            // Clear form fields
            contactName.value = '';
            contactEmail.value = '';
            contactNumber.value = '';
            contactTag.value = '';
        };
        const closeForm = () => {
            context.emit('form-closed', "Closed");
        };
        return {
            contactName,
            contactEmail,
            contactTag,
            contactNumber,
            addContact,
            closeForm,
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
</style>