<template>
    <div class="loginContainer">
            <img class ="logo_msg" alt="keela logo" src="keelaLogo.png">
            <h1>Log In</h1>
            <input class="inputField" type="text" placeholder ="Email">
            <input class="inputField" type="password" placeholder ="Enter Password">
            <router-link to="/home"><button class="login_button" > Log In </button> </router-link>
            <router-link to="/signup" class="signup-link">Not have an account?<strong>Sign Up</strong></router-link>
    </div>
</template>
<script>
    export default {
    name : 'login',
    }
</script>
<style scoped>
    .loginContainer{
        display:flex;
        background-color:none;
        align-content: center;
        flex-direction: column;
        border:1px solid rgb(238, 234, 234);
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
        border:1px solid rgb(238, 234, 234);
        width:300px;;
        height:30px;
        display:block;
        margin-right:auto;
        margin-left:auto;
        margin-top:10px;
    }
    .login_button{
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