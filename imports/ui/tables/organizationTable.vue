<template>
    <home/>
    <div class = "table-grid">
            <div class="organization-info-box">
                <div class ="left-section"><strong> Organizations</strong></div>
                <div class ="middle-section">middle</div>
                <div class="right-section">
                    <button type="button" class="add-button" @click="addOrganization">Add Organization</button>
                    <organizationForm v-if="showForm" :show-Form="showForm" :editingOrganization="editingOrganization" @organization-added="handleOrganizationAdd" @organization-edit="handleOrganizationEdit" @form-closed = "formClosed"/>   
                </div> 
            </div>
        <div class="organization-table-box">
            <table class="organization-table">
                <thead>
                    <tr>   
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>USERS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="organization in organizations" :key="organization._id">
                        <td>{{ organization.organizationName }}</td>
                        <td>{{ organization.organizationEmail}}</td>
                        <td>{{  }}</td>
                        <td>
                            <button class="edit-organization" @click="editOrganization(organization)">Edit</button>
                            <button class="delete-organization" @click="deleteOrganization(organization)">Delete</button>
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>
    </div>
</template>


<script>
import home from '../Home/home.vue';
import { ref, onMounted } from 'vue';
import organizationForm from '../forms/organizationForm.vue'
import { organizations } from '../../db/organizationsCollection'
import { Meteor } from 'meteor/meteor';


export default {
    name:'organizationsTable',
    components:{
        home,
        organizationForm,
    },
    data(){
       
        return {
            showForm: false, 
            editingOrganization: null, 
        }
    },
    meteor: {
        $subscribe: {
            organizations: [],
        },
        organizations() {
            return organizations.find({}).fetch();
        },
    },
    methods:{
        onMounted(){
            this.organizations = organizations.find().fetch();
        },
        addOrganization(){
            this.editingOrganization = null; 
            this.showForm = true;
        },
        editOrganization(organization){
            this.editingOrganization = {...organization};
            this.showForm = true;
        },
        handleOrganizationAdd(newOrganization){
            Meteor.call('organizations.insert',newOrganization);
            this.showForm = false;
        },
        handleOrganizationEdit(organizationId, newOrganization){
            if(confirm('Are you sure you want to edit this organization?')){
                Meteor.call('organizations.edit', organizationId, newOrganization, (error)=>{
                    if(error){
                        console.error('Error updating organization:', error);
                        alert('Error editing organization: ' + error.message);
                    }
                });
            }
            this.showForm = false;
        },
        deleteOrganization(organization){
            if(confirm('Are you sure you want to edit this organization?')){
                Meteor.call('organizations.delete', organization._id, (error)=>{
                    if(error){
                        console.error('Error updating organization:', error);
                        alert('Error editing contact: ' + error.message);
                    }
                })
            }
        },
        formClosed(message){
            this.showForm = false;
        }
        
    }
}
</script>


<style scoped>
    .table-grid{
        display:grid;
        grid-template-rows:50px 1fr;
        margin-top:70px;
        margin-left:200px;
        margin-right:50px;

    }
    .organization-info-box{
        border:1px solid rgb(168, 166, 166);
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .left-section{
        display:flex;
        margin-left:5px;
    }
    .right-section{
        display:flex;
        margin-right:5px;
    }
    .organization-table-box{
        background-color:white;
        border:1px solid rgb(168, 166, 166);
    }
    .add-button{
        width:auto;
        height:35px;
        padding:5px;
        border-radius:5px;
        background-color:rgb(198, 138, 198);
        border-style:solid;   
    }
    .add-button:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    .organization-table{
        border-collapse:collapse;
        margin :0 0;
        font-size:0.9em;
        min-width:400px;
        border-radius: 5px 5px 0 0;
        overflow:hidden;
        box-shadow: 0 0 2px rgba(0,0,0,0.15);
        table-layout:fixed;
        width:100%
    }
    .organization-table thead tr{
        color:black;
        text-align:left;
        font-weight:bold;
        border-bottom:1px solid black;;
    }
    .organization-table th,
    .organization-table td{
        padding:12px 15px;
    }
    .organization-table tbody tr{
        border-bottom:1px solid #dddddd;
        text-align:left;
    }
    .organization-table tbody tr:nth-of-type(even){
        background-color:#f3f3f3;
    }
    .delete-organization{
        background-color:rgb(232, 197, 232);
        border:1px solid black;
        width:20%;
        box-sizing: border-box;

    }
    .delete-organization:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    .edit-organization{
        margin-left:5px;
        background-color:rgb(121, 157, 121);
        border:1px solid black;
        width:20%;
        margin-right:5%;
        box-sizing: border-box;
    }
    .edit-organization:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    
</style>