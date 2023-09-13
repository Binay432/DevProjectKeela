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

<style scoped lang="scss">
    @import "../../../src/shared-form-styles.scss"   
</style>
