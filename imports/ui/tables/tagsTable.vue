<template>
    <home/>
    <div class = "table-grid">
            <div class="contacts-info-box">
                <div class ="left-section"> <strong>{{ specificOrganization.length }} Tags</strong></div>
                <div class ="middle-section"></div>
                <div class="right-section">
                    <button type="button" class="add-button" @click="addTag">Add Tags</button>
                    <tagForm v-if="showForm" :show-Form="showForm" :editing-Tag ="editingTag" @tag-added="handleTagAdded" @tag-edit="handleTagEdit" @form-closed="formClosed"/>
                </div>
            </div>
        <div class="contacts-table-box">
            <table class="contact-table">
                <thead>
                    <tr>   
                        <th>TAGS</th>
                        <th>CREATED DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tag in specificOrganization" :key="tag._id">
                        <td>{{ tag.tagName }}</td>
                        <td>{{ tag.createdAt}}</td>
                        <td>
                            <button class="edit-tag" @click="editTag(tag)">Edit</button>
                            <button class="delete-tag" @click="deleteTag(tag)">Delete</button>
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
import tagForm from '../forms/tagForm.vue';
import {tags} from '../../db/tagsCollections';
import { Meteor } from 'meteor/meteor';

export default{
    name: "tagsTable",
    components:{
        home,
        tagForm,
    },
    data(){
        return {
            showForm: false, 
            editingTag : Object,
        }
    },
    meteor:{
        $subscribe:{
            tags:[]
        },
        tags(){
            return tags.find().fetch();
        }
    },
    computed:{
        specificOrganization(){
            const currentUser = Meteor.user();
            const currentOrg = currentUser.profile.orgName;
            return this.tags.filter(tag => tag.orgName === currentOrg);
        }, 
    },
    methods:{
        onMounted(){
            this.tags = tags.find().fetch();
        },
        addTag(orgName){
            this.editingTag = null;
            this.showForm = true;
        },
        editTag(tag){
            this.editingTag = {...tag};
            console.log(this.editingTag);
            this.showForm = true ;
        },
        handleTagAdded(newTag){
            Meteor.call('tags.insert',newTag);
            this.showForm = false;
        },
        formClosed(message){
            // alert(message);
            this.showForm = false;
        },
        deleteTag(tag){
            if(confirm('Are you sure you want to delete this tag?')){
                Meteor.call('tags.delete',tag._id,(error)=>{
                    if(error){
                        console.error('Error deleting tag:', error);
                        alert('Error deleting tag:' + error.tag);
                    }
                });
            }
        },
        handleTagEdit(tagId, newTag){
            if(confirm('Are you sure you want to edit this Tag?')){
                Meteor.call('tags.edit', tagId, newTag, (error)=>{
                    if(error){
                        console.error('Error updating Tag:', error);
                        alert('Error editing Tag: ' + error.message);
                    }
                });
            }
            this.showForm = false;
        }   
    },
   
    
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
    .contacts-info-box{
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
    .contacts-table-box{
        background-color:white;
        border:1px solid rgb(168, 166, 166);
    }
    .add-button{
        width:100px;
        height:35px;
        border-radius:5px;
        background-color:rgb(198, 138, 198);
        border-style:solid;   
    }
    .add-button:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    .contact-table{
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
    .contact-table thead tr{
        color:black;
        text-align:left;
        font-weight:bold;
        border-bottom:1px solid black;;
    }
    .contact-table th,
    .contact-table td{
        padding:12px 15px;
    }
    .contact-table tbody tr{
        border-bottom:1px solid #dddddd;
        text-align:left;
    }
    .contact-table tbody tr:nth-of-type(even){
        background-color:#f3f3f3;
    }
    .delete-tag{
        background-color:rgb(232, 197, 232);
        border:1px solid black;
        width:20%;
        box-sizing: border-box;

    }
    .delete-tag:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
    .edit-tag{
        margin-left:5px;
        background-color:rgb(121, 157, 121);
        border:1px solid black;
        width:20%;
        margin-right:5%;
        box-sizing: border-box;
    }
    .edit-tag:hover{
        background-color:rgb(197, 193, 197);
        cursor:pointer;
    }
</style>