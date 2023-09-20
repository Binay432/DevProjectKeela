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

#App Features:
1. User can signup the organization and user as a Keela Admin
2. Keela Admin Role: can access all organization and their respective users 
3. Associated user to the organization can be access by clicking on the respective organization row 
4. Organization Admin can see the associated organization only 
5. Contacts and Tags table display tha organization associated contacts only 
6. Contact can have more than one tag 
7. Updating the one aspects (for instance tag) will be seen to the associated field (eg: contact tags)
