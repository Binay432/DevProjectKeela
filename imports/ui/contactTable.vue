<template>
    <AppMenu/>
    <div class = "table-grid">
            <div class="contacts-info-box">
                <div class ="left-section">Number of contacts</div>
                <div class ="middle-section">middle</div>
                <div class="right-section">
                    <button type="button" class="add-button" @click="showAlert()">Add Contacts</button>
                </div>
            </div>
        <div class="contacts-table-box">
            <table class="contact-table">
                <thead>
                    <tr>   
                        <th>FULL NAME</th>
                        <th>EMAIL</th>
                        <th>TAGS</th>
                        <th>CONTACT NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ data1.name }}</td>
                        <td>{{ data1.email }}</td>
                        <td>{{ data1.tags }}</td>
                        <td>{{ data1.contact }}</td>
                    </tr>
                    <tr>
                        <td>{{ data2.name }}</td>
                        <td>{{ data2.email }}</td>
                        <td>{{ data2.tags }}</td>
                        <td>{{ data2.contact }}</td>
                    </tr>

                </tbody>
                
            </table>
        </div>
    </div>
</template>

<script> 
import AppMenu from './AppMenu.vue'
    export default{
        name: "contactTable",
        methods: {
            showAlert(){
                alert('button clicked');
            }
        },
        components:{
            AppMenu
        },
        data(){
            return {
                data1:{
                    name:"binay sah",
                    email:'binay@email.com',
                    contact:'9865741258',
                    tags:'tag1'
                },
                data2:{
                    name:"kamal sah",
                    email:'kamal@email.com',
                    contact:'98657415425',
                    tags:'tag2'
                }
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
    .contacts-info-box{
        border:1px solid rgb(168, 166, 166);
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .lef-section{
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
</style>