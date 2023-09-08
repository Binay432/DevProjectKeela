<template>
    <div v-if ="showForm" class= "form-overlay">
        <div class="modal">
            <div class="close-button" @click="closeForm">
                <img class ="form-close-icon"  src="cross.png">
            </div>
            <h2>{{ editingOrganization ? 'Edit Organization' : 'Add Organization' }}</h2>
            <form @submit.prevent = "submit">
                <input type="text" v-model="organizationName" placeholder="Name" required>
                <input type="email" v-model="organizationEmail" placeholder="Eamil" required>
                <button type="submit">{{ editingOrganization ? 'Save' : 'Add' }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';

export default {
    name:"organizationForm",
    props:{
        showForm:Boolean, // props defined a properties (showForm here) that is expected to recieve from parent components and here its in the boolean form which is used to verify in the above template 
        editingOrganization: {
            type: Object,
            default: {}
        },
    }, 
    setup (props, context){
        const organizationName = ref (props.editingOrganization? props.editingOrganization.organizationName: '');
        const organizationEmail = ref (props.editingOrganization? props.editingOrganization.organizationEmail: '');

        const submit = () => {
            const newOrganization = {
                organizationName : organizationName.value.trim(),
                organizationEmail : organizationEmail.value.trim(),
            };
            if (props.editingOrganization){
                    const organizationId = props.editingOrganization._id;
                    context.emit('organization-edit',organizationId, newOrganization);
            }else{
                context.emit('organization-added', newOrganization); //alternative this.$emit()
            }
            // Clear form fields
            organizationName.value = '';
            organizationEmail.value = '';
        };
        const closeForm = () => {
            context.emit('form-closed', "Closed");
        };
        return {
            organizationName,
            organizationEmail,
            submit,
            closeForm,
        };
    },
    
};
   
</script>

<style scoped>
    .form-overlay{
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