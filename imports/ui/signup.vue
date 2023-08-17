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

export default {
    name : 'signup',
    data(){
        return {
            firstName:"",
            lastName:"",
            email:"",
            orgName:"",
            orgRole:"Admin",
            password:"",
            confirmPassword:"",  
            error:"",   
        };
    },
    methods:{
        onSignUp(){
            const firstName = this.firstName;
            const lastName = this.lastName;
            const email = this.email;
            const orgName = this.orgName;
            const orgRole = this.orgRole;
            const password = this.password;
            const confirmPassword = this.confirmPassword;

            this.error="";

            if(password !== confirmPassword){
                this.error = "Password should be same";
            }
                
        }
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
