/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPerson: {name: "", bio: "", bioVisible: true}
    };
  },
  created: function() {
    axios.get("/people.json").then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      this.people.push(this.newPerson);
    },
    deletePerson: function(person) {
      var index = this.people.indexOf(person);
      this.people.splice(index, 1);
    },
    toggleBio: function(person) {
      person.bioVisible = !person.bioVisible;
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});