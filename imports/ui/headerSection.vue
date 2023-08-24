<template>
    <div class="header">
        <div class="leftBox">
            <img class="keelaLogo" src="keela-logo-2.png" alt="keela image">
        </div>
        <div class="middleBox">
          <h1> {{ organizationName }} </h1>
        </div>
        <div class="rightBox">
            <select class="org-dropdown" id="organization" v-model="selectedOption">
                <option value="user" selected>{{ userName }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { Meteor} from 'meteor/meteor';
export default {
    name : 'headerSection',
    data(){
        return {
            selectedOption:'',
        };
    },
    computed:{
        organizationName() {
            const user = Meteor.user();
            return user ? user.profile.orgName : '';
        },
        userName(){
            const user = Meteor.user();
            return user ? user.profile.firstName+ user.profile.lastName : '' ;
        }
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
        background-color:white;
        border:1px solid rgb(166, 165, 165);
        top :0;
        left:0;
        float:top;
        justify-content: space-between; /* it distribute the flexbox at equal space in between them */
        align-items: center; /* it align the contents in flexbox */
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
        width:150px;
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
</style>