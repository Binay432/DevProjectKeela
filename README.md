# Meteor + Vue3 + Vite

This is a simple example of how to use Vue3 with Meteor.

## How to use

1. Clone this repo
2. Run `meteor npm install`
3. Run `meteor`
4. Open `http://localhost:3000` in your browser

## Libraries used

- [Vue3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://next.router.vuejs.org/)
- [Meteor](https://www.meteor.com/)
- [Vue Meteor Tracker](https://github.com/meteor-vue/vue-meteor-tracker)
- [Tailwind CSS](https://tailwindcss.com/)




 props:{
        showForm:Boolean, // props defined a properties (showForm here) that is expected to recieve from parent components and here its in the boolean form which is used to verify in the above template 
    },
    setup (props, context){
        const contactName = ref ('');
        const contactEmail = ref ('');
        const contactTag = ref ('');
        const contactNumber = ref ('');

        const addContact = () => {
            const currentUser =Meteor.user();
            const newContact = {
                organization:currentUser.profile.orgName,
                contactName : contactName.value,
                contactEmail : contactEmail.value,
                contactTag : contactTag.value,
                contactNumber : contactNumber.value, 
            };
            Meteor.call('addContact',newContact);
            //context.emit('contact-added', newContact);
            // Clear form fields
            contactName.value = '';
            contactEmail.value = '';
            contactNumber.value = '';
            contactTag.value = '';
        };
        
        
        const closeForm = () => {
            context.emit('form-closed', "Closed");
        };

        return {
            contactName,
            contactEmail,
            contactTag,
            contactNumber,
            addContact,
            closeForm,
        };
    },
    subscriptions() {
        return {
        contacts: Meteor.subscribe('contacts'),
        };
    },
    meteor: {
        $subscribe: {
            'contacts': [],
        },
        contacts() {
            return contactsCollection.find().fetch();
        },
    },


    
}