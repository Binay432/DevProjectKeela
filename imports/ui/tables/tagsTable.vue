<template>
    <home/>
    <div class = "table-grid">
            <div class="table-info-box">
                <div class ="left-section"> <strong>{{ specificOrganization.length }} Tags</strong></div>
                <div class ="middle-section"></div>
                <div class="right-section">
                    <button type="button" class="add-button" @click="addTag">Add Tags</button>
                    <tagForm v-if="showForm" :show-Form="showForm" :editing-Tag ="editingTag" @tag-added="handleTagAdded" @tag-edit="handleTagEdit" @form-closed="formClosed"/>
                </div>
            </div>
        <div class="table-box">
            <table class="table">
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
                            <button class="edit-button" @click="editTag(tag)">Edit</button>
                            <button class="delete-button" @click="deleteTag(tag)">Delete</button>
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
            const currentOrg = currentUser.profile.orgId;
            return this.tags.filter(tag => tag.orgId === currentOrg);
        }, 
    },
    methods:{
        onMounted(){
            this.tags = tags.find().fetch();
        },
        addTag(){
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

<style scoped lang="scss">
@import "../../../src/shared-table-styles.scss" 
</style>