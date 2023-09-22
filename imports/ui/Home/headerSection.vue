<template>
    <div class="header">
        <div class="leftBox">
            <img class="keelaLogo" src="/keela-logo-2.png" alt="keela image">
        </div>
        <div class="middleBox">
          <h1 id="orgName"> {{ organizationName }} </h1>
        </div>
        <div class="rightBox">
           <strong id="userName">User: {{ userName }}</strong> 
        </div> 
    </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
export default {
    name : 'headerSection',
    data(){
        return{
            orgName:'',
        }
    },
    computed:{
        organizationName() {
            if(!Meteor.user()){
                return this.orgName = 'Loading ...'
            }else{
                const user = Meteor.user();
                const userOrgId = user.profile.orgId;
                Meteor.call('getOrganizationNameById', userOrgId, (error, result) => {
                    if(error){
                        alert(error.reason);
                    }else{
                        this.orgName = result;
                    }
                })
                return this.orgName;
            }   
        },
        userName(){
            if(!Meteor.user()){
                return 'Loading...';
            }else{
                const user = Meteor.user();
                return user ? user.profile.firstName+" "+ user.profile.lastName : '' ;
            }
        },
    },
    
};
</script>


<style>
    .header{
        display: flex;
        flex-direction: row;
        margin-top: 0px;
        height: 55px;
        border-width: 1px;
        border-radius: 5px;
        background-color:rgb(9, 25, 68);
        border:1px solid rgb(166, 165, 165);
        top :0;
        left:0;
        right:0;
        float:top;
        justify-content: space-between; /* it distribute the flexbox at equal space in between them */
        align-items: center; /* it align the contents in flexbox */
        position: fixed;
    }
    .leftBox{
        display:flex;
        align-items:center;
        width: 100px;
    }
    .keelaLogo{
        height:25px;
        width:100px;
        margin-left:2px;
    }
    .middleBox{
        flex:1;
        margin-left:5px;
        margin-right:5px;
        align-content:center;
    }
    .middleBox h1{
        font-size: 25px;
        color:purple
    }
    .rightBox{
        display:flex;
        margin-right:5px;
    }
    .org-dropdown{
        width:auto;
        height:35px;
        align-self:end;
        border:solid;
        border-color: rgb(205, 202, 202);
        border-radius:10px;
    }
    .org-dropdown select{
        position: absolute;
        right: 0;    
    }
    .org-dropdown:hover{
        cursor:pointer;
    }
    #userName, #orgName{
        color:white;
    }
</style>