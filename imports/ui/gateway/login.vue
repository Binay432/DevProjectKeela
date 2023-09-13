<template>
    <form @submit.prevent="logIn">
        <div class="loginContainer">
                <img class ="logo_msg" alt="keela logo" src="keela-logo-2.png">
                <h1>Log In</h1>
                <input v-model="email" class="inputField" type="text" placeholder ="Email" required>
                <input v-model="password" class="inputField" type="password" placeholder ="Enter Password" required>
                <button type="submit" class="login_button" > Log In </button>
                <router-link to="/signup" class="signup-link">Not have an account?<strong>Sign Up</strong></router-link>
        </div>
    </form>
</template>

<script>
    export default {
    name : 'login',
    data(){
        return {
            email:"",
            password:""
        }
    },
    methods:{
        logIn(){
            Meteor.loginWithPassword(this.email,this.password, (error)=>{
                if(error){
                    alert(error.reason);
                }
                else{
                    this.$router.push('/home');
                }
            })
        }
    }
    }
</script>
<style scoped>
    .loginContainer{
        display:flex;
        background-color:rgb(239, 212, 239);
        align-content: center;
        flex-direction: column;
        border:1px solid rgb(5, 4, 4);
        width:350px;
        height:auto;
        align-items: center;
        margin:auto;
        margin-top:10%;
        margin-bottom:35
    }
     .logo_msg{
        width:300px;
        height:auto;
        margin-bottom:5px;
    }
    .loginContainer h1{
        font-size: 30px;
        color:purple;
    }
    .inputField{
        border:1px solid rgb(0, 0, 0);
        width:300px;;
        height:30px;
        display:block;
        margin-right:auto;
        margin-left:auto;
        margin-top:10px;
        background-color:rgb(239, 212, 239);
    }
    .login_button{
        width: auto;
        border: 1px solid;
        margin-right:auto;
        margin-left:auto;
        margin-top:10px;
        width:300px;
        height:40px;
        border:1px solid rgb(58, 56, 56);
        margin-bottom: 10px;
    }
    .login_button:hover{
        cursor:pointer;
        background-color:antiquewhite;
    }
    .loginContainer strong{
        color:green;
    }
    .loginContainer strong:hover{
        cursor: pointer;
        color:purple;
    }

</style>