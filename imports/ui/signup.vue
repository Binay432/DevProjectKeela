<template>
    <form @submit.prevent="onSignUp">
        <div class="signupContainer">
            <img class ="logo" alt="keela logo" src="keelaLogo.png">
            <h1>Sign Up</h1>
            <div class="register">
                <input type="text" v-model="firstName" id="firstName" placeholder ="First Name" required>
                <input type="text" v-model="lastName" id="lastName" placeholder ="Last Name" required>
                <input type="email" v-model="email" id="email" placeholder ="Email" required>
                <input type="text" v-model="orgName" id="orgName" placeholder ="Organization Name" required>
                <select class="dropdown" id="OrgRole" v-model="orgRole" placeholder="Organization Role">
                    <option value="Admin" selected>Admin</option>
                    <option value="Coordinator">Coordinator</option>
                </select>
                <input v-model="password" type="password" placeholder ="Enter Password" required>
                <input v-model="confirmPassword" type="password" placeholder ="Confirm Password" required>
                <p v-if ="error" class="error-message">{{ error }}</p>    
                <button type="submit"> Sign Up </button>
            </div>       
        </div>  
    </form>
</template>

<script>
import login from './login.vue';

export default {
    name : 'signup',
    data(){
        return {
            firstName:"",
            lastName:"",
            email:"",
            orgName:"",
            orgRole:"",
            password:"",
            confirmPassword:"",  
            error:"",   
        };
    },
    methods:{
        checkPasswordValidation(password, confirmPassword){
            if(password !== confirmPassword){
                this.error = "Password should be same";
            }
        },
        clearInputField(){
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.orgName = "";
            this.orgRole = "";
            this.password = "";
            this.confirmPassword = "";
        },
        onSignUp(){
            const firstName = this.firstName;
            const lastName = this.lastName;
            const email = this.email;
            const orgName = this.orgName;
            const orgRole = this.orgRole;
            const password = this.password;
            const confirmPassword = this.confirmPassword;
            this.checkPasswordValidation(password, confirmPassword);
            if (this.error === ""){
                const user = {
                    email : this.email,
                    password : this.password,
                    confirmPassword : this.confirmPassword,
                    profile:{
                        firstName : this.firstName,
                        lastName : this.lastName,
                        orgName : this.orgName,
                        orgRole : this.orgRole,
                    },
                }
                Accounts.createUser(user, (error) => {
                    if(error){
                        console.error(error.reason);
                    }
                    else{
                        this.clearInputField();
                        this.$router.push('/'); //navigate to login page 
                    }
                });     
            }  
        },
    }
}
</script>

<style scoped>
.signupContainer{
    display:flex;
    background-color:none;
    align-content: center;
    flex-direction: column;
    border:1px solid rgb(238, 234, 234);
    width:350px;
    height:auto;
    align-items: center;
    margin:auto;
    margin-top:7%;
    margin-bottom:35;
}
.logo{
    height:50px;
    float:center;
}
h1{
    color:rgb(231, 93, 231);
    size:50px;
}
.register input{
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
.register button{
    width: auto;
    border: 1px solid;
    margin-right:auto;
    margin-left:auto;
    margin-top:10px;
    width:300px;
    height:40px;
    border:1px solid rgb(238, 234, 234);
    margin-bottom: 10px;
}
.register button:hover{
    cursor:pointer;
    background-color:antiquewhite;
}
.error-message{
    color:red;
    font-size:15px;
}
</style>
