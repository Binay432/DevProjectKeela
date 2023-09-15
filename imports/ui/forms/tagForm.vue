<template>
    <div v-if ="showForm" class= "form-overlay">
        <div class="modal">
            <div class="close-button" @click="closeForm">
                <img class ="form-close-icon"  src="cross.png">
            </div>
            <h2>{{ editingTag ? 'Edit Tag' : 'Add Tag' }}</h2>
            <form @submit.prevent = "addTag">
                <input type= "text" v-model ="tagName" placeholder = "Tag" required>
                <button type="submit">{{ editingTag ? 'Save' : 'Add' }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
 

    export default {
        name:"tagForm", 
        props:{
            showForm:Boolean, // props defined a properties (showForm here) that is expected to recieve from parent components and here its in the boolean form which is used to verify in the above template 
            editingTag:{
                type : Object, 
                default: {}
            },
        },
        setup (props, context){
            const tagName = ref (props.editingTag ? props.editingTag.tagName: '');
            const orgName = ref([]);

            const addTag = () => {
                const currentUser = Meteor.user();
                const currentOrg = currentUser.profile.orgId;
                const newTag = {
                    tagName : tagName.value.trim(),
                    orgId : currentOrg,
                };
                //Tags.insert(newTag);
                if(props.editingTag){
                    const tagId = props.editingTag._id;
                    context.emit('tag-edit',tagId,newTag);
                }else{
                    context.emit('tag-added', newTag);
                }
                // Clear form field
                tagName.value = '';
            };
            
            const closeForm = () => {
                context.emit('form-closed', "Closed");
            };

            return {
                tagName,
                addTag,
                closeForm,
            };
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../src/shared-form-styles.scss"   
</style>
