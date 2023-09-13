<template>
    <home/>
    <div class = "table-grid">
            <div class="table-info-box">
                <div class ="left-section"><strong> {{ organizations.length }} Organizations</strong></div>
                <div class ="middle-section"></div>
                <div class="right-section">
                    <button v-if="checkPermission" type="button" class="add-button" :disabled="isAddButtonDisabled" @click="addOrganization">Add Organization</button>
                    <organizationForm v-if="showForm" :show-Form="showForm" :editingOrganization="editingOrganization" @organization-added="handleOrganizationAdd" @organization-edit="handleOrganizationEdit" @form-closed = "formClosed"/>   
                </div> 
            </div>
        <div class="table-box">
            <table class="table">
                <thead>
                    <tr>   
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>USERS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class = "org-row" v-for="organization in organizations" :key="organization._id">
                        <td @click="navigateToUserTable(organization.organizationName)">{{ organization.organizationName }}</td>
                        <td @click="navigateToUserTable(organization.organizationName)">{{ organization.organizationEmail}}</td>
                        <td @click="navigateToUserTable(organization.organizationName)"> {{ usersInSpecificOrganization(organization.organizationName)}}</td>
                        <td>
                            <button class="edit-button" @click="editOrganization(organization)">Edit</button>
                            <button class="delete-button" @click="deleteOrganization(organization)">Delete</button>
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>
    </div>
</template>


<script>
import home from '../Home/home.vue';
import organizationForm from '../forms/organizationForm.vue'
import { organizations } from '../../db/organizationsCollection'
import { Meteor } from 'meteor/meteor';
import userTable from './userTable.vue';



export default {
    name:'organizationsTable',
    components:{
        home,
        organizationForm,
        userTable,
    },
    data(){    
        return {
            showForm: false, 
            editingOrganization: null, 
            isAddButtonDisabled : false,
            CheckAdminRole: '',
        }
    },
    computed:{
        checkPermission(){
            const userRole = Meteor.user().profile.orgRole;
            if(userRole === 'Admin'){
                return false;
            }else{
                return true;
            }
        }
    },
    meteor: {
        $subscribe: {
            organizations: [],
            users: [],
        },
        organizations() {
            return organizations.find({}).fetch();
        },
        users() {
            return Meteor.users.find({}).fetch();
        },
    },
    
    methods:{
        addOrganization(){
            Meteor.call('checkAdminRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        alert("Permission Denied");   
                    }else{
                        this.isAddButtonDisabled = false;
                        this.editingOrganization = null; 
                        this.showForm = true;
                    }
                }
            });    
        },
        editOrganization(organization){
            Meteor.call('checkKeelaAdminRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        this.editingOrganization = {...organization};
                        this.showForm = true;  
                    }
                }
            }); 
            Meteor.call('checkAdminRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        if(Meteor.user().profile.orgName === organization.organizationName){
                            this.editingOrganization = {...organization};
                            this.showForm = true;
                        }
                        else {
                            alert("permission denied: You're not in this organization");
                        }
                    }
                }
            })
            
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
            Meteor.call('checkAdminRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        alert("Permission Denied");   
                    }else{
                        if(confirm('Are you sure you want to delete this organization?')){
                            Meteor.call('organizations.delete', organization._id, (error)=>{
                                if(error){
                                    alert('Error deleting organization: ' + error.message);
                                }
                            })
                        }
                    }
                }
            });    
        },
        formClosed(message){
            this.showForm = false;
        },
        navigateToUserTable(orgName){
            Meteor.call('checkKeelaAdminRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        this.$router.push({ name:'userTable', params:{orgName}});
                    }
                }
            }); 
            Meteor.call('checkAdminRole',(error,result) =>{
                if(error){
                    alert('Error Checking permission : ', error.message);
                }else{
                    if(result){
                        if(Meteor.user().profile.orgName === orgName){
                            this.$router.push({ name:'userTable', params:{orgName}});
                        }
                        else {
                            alert("permission denied: You're not in this organization");
                        }
                    }
                }
            })
        },
        usersInSpecificOrganization(orgName){
            return (this.users.filter(user => user.profile.orgName === orgName)).length;
        },
    }
}
</script>


<style scoped lang="scss">
@import "../../../src/shared-table-styles.scss" 
</style>