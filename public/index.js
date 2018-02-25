/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPerson: {name: "", bio: ""},
      errors: [],
      nameFilter: "",
      bioFilter: "",
      sortAttribute: 'name'
    };
  },
  created: function() {
    axios.get("/people.json").then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      var params = {
        name: this.newPerson.name,
        bio: this.newPerson.bio
      };
      axios.post("/people.json", params).then(function(response){
        this.people.push(response.data);
        this.newPerson.name = "";
        this.newPerson.bio = "";
      }.bind(this)).catch(function(error) {
        this.errors = error.response.data.errors;
      }.bind(this));
    },
    deletePerson: function(person) {
      var id = person.id
      axios.delete("/people/" + id).then(function(response) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
      }.bind(this));
    },
    toggleBio: function(person) {
      person.bioVisible = !person.bioVisible;
    },
    isValidPerson: function(person) {
      var validName = person.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      var validBio = person.bio.toLowerCase().includes(this.bioFilter.toLowerCase());
      return validName && validBio;
    },
    setSortAttribute: function(attribute) {
      this.sortAttribute = attribute;
    }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        return person1[this.sortAttribute].localeCompare(person2[this.sortAttribute]);
      }.bind(this));
    }
  }
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












