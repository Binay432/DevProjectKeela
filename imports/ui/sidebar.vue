<template>
    <div class="sidebar-grid">
        <div class="keela-features">
            <div>
                <img class="features-icon" src="contactsIcon.png"> 
            </div>
            <div>
                <nav>
                    <router-link to="/contactTable">
                        <button class="features-button">Contacts</button>
                    </router-link>
                 </nav>
                 <router-view/>
            </div>           
        </div>
        <div class="keela-features">
            <div>
                <img class="features-icon" src="tags.png"> 
            </div>
            <div>
                <router-link to="/tags">
                    <button class="features-button">Tags</button>
                </router-link>
            </div>  
        </div>
        <div class="keela-features">
            <div>
                <img class="features-icon" src="settings.png"> 
            </div>
            <div>
                <button class="features-button">Settings</button>
            </div>  
        </div>
        <button class="logout-button" @click="logout">Log Out</button>
    </div>
</template>

<script> 
import { Meteor } from 'meteor/meteor';
export default {
    name:"sidebar",
    methods:{
        logout(){
            Meteor.logout((error) => {
                if(error){
                    console.error(error.reason);
                }
                else{
                    this.$router.push('/');
                }
            });
        }
    }
}
</script>

<style scoped>
    .sidebar-grid{
        display: grid;
        grid-template-rows:100px 100px 100px;
        row-gap:20px;
        width:160px;
        background-color:white;
        border:1px solid rgb(166, 165, 165);
        padding:0.5em;
        top:54.5px;
        bottom:0;
        position:fixed;
        border-radius: 5px;
    }
    .keela-features{
        display:grid;
        grid-template-rows:80px 1fr;
    }
    .features-icon{
        width:50px;
        margin-top:20px;
        margin-left:50px;
    }
    .features-button{
        width:140px;
        height:30px;  
        background-color:rgb(200, 202, 204);
    }
    .features-button:hover{
        background-color:rgb(214, 216, 218);
        cursor:pointer;
    }
    .logout-button{
        border: 1px solid black; 
        height:30px;
        margin-top:37vw;
        background-color:rgb(200, 202, 204);
    }
    .logout-button:hover{
        cursor:pointer;
        background-color:rgb(214, 216, 218);
    }

</style>