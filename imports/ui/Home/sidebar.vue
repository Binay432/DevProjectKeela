<template>
    <div class="sidebar-grid">
        <router-link to ="/contactTable">
            <div class="keela-features">
                <div>
                    <img class="features-icon" src="contactsIcon.png"> 
                </div>
                <div>
                    <h1 class="features-text">Contacts</h1>
                </div>
            </div>
        </router-link>

        <router-link to="/tags">
            <div class="keela-features">
                <div>
                    <img class="features-icon" src="tags.png"> 
                </div>
                <div>
                    <h1 class="features-text">Tags</h1>
                </div>  
            </div>
        </router-link>

        <div v-if="checkPermission" @click="checkPermissionAndNavigate">
            <div class="keela-features" >
                <div>
                    <img class="features-icon" src="organization.png"> 
                </div>
                <div>
                    <h1 class="features-text">Organization</h1>
                </div>  
            </div>
        </div>
        <div v-else></div>
        <button class="logout-button" @click="logout">Log Out</button>
    </div>
</template>

<script> 
import { Meteor } from 'meteor/meteor';
export default {
    name:"sidebar",
    computed:{
        checkPermission(){
            const userRole = Meteor.user().profile.orgRole;
            if(userRole === "Coordinator"){
                return false;
            }
            else{
                return true;
            }
        }
      
    },
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
        },
        checkPermissionAndNavigate(){
            Meteor.call('checkCoordinatorRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        alert("Permission Denied ");   
                    }else{
                        this.$router.push('/organizations');
                    }
                }
            });
        }
    }
}
</script>

<style scoped>
    .sidebar-grid{
        display: grid;
        grid-template-rows:15px 15px 15px 1fr;
        row-gap:20px;
        width:160px;
        background-color:rgb(196, 195, 195);
        border:1px solid rgb(166, 165, 165);
        padding:0.5em;
        top:54.5px;
        bottom:0;
        position:fixed;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .keela-features{
        display:flex;
        align-items: center;
        margin-top:10px;
        background-color:rgb(239, 235, 243);
    }
    .keela-features:hover{
        cursor:pointer; 
        background-color:rgb(214, 216, 218);

    }
    .features-icon{
        width:20px;
        margin-right:5px;
    }
    .features-text{
        margin:0;
    }
    .logout-button{
        border: 1px solid black; 
        height:30px;
        place-self: end center;
        width:140px;
        background-color:rgb(200, 202, 204);
    }
    .logout-button:hover{
        cursor:pointer;
        background-color:rgb(214, 216, 218);
    }

</style>