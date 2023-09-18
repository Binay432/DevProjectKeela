<template>
    <div v-if ="showForm" class= "form-overlay">
        <div class="modal">
            <div class="close-button" @click="closeForm">
                <img class ="form-close-icon"  src="/cross.png">
            </div>
            <h2>{{ editingUser ? 'Edit User' : 'Invite User' }}</h2>
            <form @submit.prevent = "submit">
                <input type="text" v-model="firstName" id="firstName" placeholder ="First Name" required>
                <input type="text" v-model="lastName" id="lastName" placeholder ="Last Name" required>
                <input type="email" v-model="email" id="email" placeholder ="Email" required>
                <select class="dropdown" id="OrgRole" v-model="orgRole" placeholder="Organization Role">
                    <option v-for="role in roles" :key="role">{{ role }}</option>
                </select>
                <input v-model="password" type="password" placeholder ="Enter Password" required>
                <button type="submit">{{ editingUser ? 'Save' : 'Invite' }}</button><br>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { Meteor } from 'meteor/meteor';
export default {
    name:"inviteForm",
    props:{
        showForm:Boolean,
        editingUser: {
            type: Object,
            default: {}
        }
    },
    data(){
        return {
            roles:[],
        }  
    },
    mounted() {
        // Call the Meteor Method to fetch roles
        Meteor.call('roles.getRoles', (error, result) => {
            if (!error) {
                this.roles = result.map((role) => role._id);
            } else {
                console.error(error.reason);
            }
        });
    },
    setup(props, context){
        const firstName = ref(props.editingUser ? props.editingUser.profile.firstName: '');
        const lastName = ref (props.editingUser ? props.editingUser.profile.lastName: '');
        const email = ref(props.editingUser ? props.editingUser.emails[0].address: '');
        // const orgName = ref(props.editingUser ? props.editingUser.profile.orgName: '');
        const orgRole = ref(props.editingUser ? props.editingUser.profile.orgRole: '');
        const password = ref (props.editingUser ? props.editingUser.password: '');
        const submit = () =>{
            const newUser = {
                firstName : firstName.value.trim(),
                lastName : lastName.value.trim(),
                email: email.value.trim(),
                // orgName : orgName.value.trim(),
                orgRole : orgRole.value.trim(),
                password : password.value.trim(),
            };
            if(props.editingUser){
                const userId = props.editingUser._id;
                context.emit('user-edit',userId, newUser);
            }else{
                context.emit('invite-user', newUser);
            }
            firstName.value = '';
            lastName.value = '';
            email.value ='';
            // orgName.value = '';
            orgRole.value = '';
            password.value ='';
        };
        const closeForm =() => {
            context.emit('form-closed', "Closed");
        };
        return {
            firstName,
            lastName,
            email,   
            // orgName,
            orgRole,
            password,
            submit,
            closeForm,
        };
    },
}

</script>

<style scoped lang="scss">
    @import "../../../src/shared-form-styles.scss"   
</style>
