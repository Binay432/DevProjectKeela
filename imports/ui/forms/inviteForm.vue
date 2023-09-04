<template>
    <div v-if ="showForm" class= "user-form-overlay">
        <div class="modal">
            <div class="close-button" @click="closeForm">
                <img class ="form-close-icon"  src="cross.png">
            </div>
            <h2>Invite User</h2>
            <form @submit.prevent = "submit">
                <input type="email" v-model="email" id="email" placeholder ="Email" required>
                <input type="text" v-model="orgName" id="orgName" placeholder ="Organization Name" required>
                <select class="dropdown" id="OrgRole" v-model="orgRole" placeholder="Organization Role">
                    <option value="Keela Admin" selected>Keela Admin</option>
                    <option value="Admin" >Admin</option>
                    <option value="Coordinator">Coordinator</option>
                </select>
                <button type="submit">Invite</button><br>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    name:"inviteForm",
    props:{
        showForm:Boolean,
    },
    setup(props, context){
        const email = ref();
        const orgName = ref('');
        const orgRole = ref('');

        const submit = () =>{
            const newUser = {
                email : email.value.trim(),
                orgName : orgName.value.trim(),
                orgRole : orgRole.value.trim()
            };
            context.emit('invite-user', newUser);
            email.value ='';
            orgName.value = '';
            orgRole.value = '';
        };
        const closeForm =() => {
                context.emit('form-closed', "Closed");
        };
        return {
            email,
            orgName,
            orgRole,
            submit,
            closeForm,
        };
    },
}

</script>

<style scoped>
    .user-form-overlay{
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
    .dropdown{
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