<template>
    <home/>
    <div class="empty_box">
        <h1 class="empty"><strong> oops! Nothing here !</strong></h1>
    </div>
</template>
<script>
import home from './Home/home.vue';

export default{
    name:'empty',
    components:{
        home,
    }
}

</script>

<style  scoped>
.empty_box{
    width:250px;
    height:100px;
    background-color: rgb(135, 105, 135);
    margin-top:70px;
    margin-left:400px;
    margin-right:50px;
    align-self: center;
    box-sizing: border-box;
}
.empty{
    color:black;
    font-size: 20px;
    align-self: center;
}
</style>