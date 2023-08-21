<template>
    <div v-if ="showForm" class= "tag-form-overlay">
        <div class="modal">
            <div class="close-button" @click="closeForm">
                <img class ="form-close-icon"  src="cross.png">
            </div>
            <h2>Add Tag</h2>
            <form @submit.prevent = "addTag">
                <input type= "text" v-model ="Tag" placeholder = "Tag" required>
                <button type="submit">Submit</button>
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
    },
    setup (props, context){
        const Tag = ref ('');
        const addTag = () => {
            const newTag = {
                Tag : Tag.value,
            };
            context.emit('tag-added', newTag);
            // Clear form field
            Tag.value = '';
        };
        
        const closeForm = () => {
            context.emit('form-closed', "Closed");
        };

        return {
            Tag,
            addTag,
            closeForm,
        };
    },
}
</script>

<style scoped>
.tag-form-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Higher than the table's z-index */
}
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}
.modal input{
    width: 300px; 
    height: 40px;
    padding-left:20px;
    display:block;
    margin-right:auto;
    margin-left:auto;
    margin-top:10px;
    border: 1px solid;
    border-color:skyblue;
    } 
.modal button{
    width: auto;
    border: 1px solid;
    margin-right:auto;
    margin-left:auto;
    margin-top:10px;
    width:300px;
    height:40px;
    border:1px solid rgb(133, 131, 131);
    margin-bottom: 10px;
}
.modal button:hover{
    cursor:pointer;
    background-color:antiquewhite;
}
.close-button{
    position: relative;
    width:100%;
}
.form-close-icon{
    height:18px;
    position: absolute;
    right:0;
}
.form-close-icon:hover{
    cursor : pointer;
}
</style>