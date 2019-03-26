var url = window.location.href;

function getID(url){
    var link = url.split("/");
    var location = link[5];
    return location;
}
var token = getID(url);
console.log(token);
Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");

var starting = new Vue({
        el: '#starting',
        delimiters: ['${','}'],
        data: {
          all_entries: [], //Grabs all of the entries
          individual_entries: [],
          loading: true,
          currentEntry: {'entry_author':{'id':0}, 'entry_author_id':0},
          message: null,
          users: [],
          all_user_info: {},
          full_name: '',
          student_email: '',
        },
        mounted: function() {
          this.getAllEntries(token);
          this.getUser(token);
        },
        methods: {
          getUser: function(token){
            let api_url = `/api/users/${token}`;
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.all_user_info = response.data;
                  this.setFullName(this.all_user_info);
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          setFullName: function(all_user_info){
            console.log(all_user_info);
            this.student_email = all_user_info.user.email;
            console.log(this.student_email);
            this.full_name += all_user_info.user.first_name + " " + all_user_info.user.last_name;
            this.all_entries.splice(0,all_entries.length);
          },
          getAllEntries: function(token) {
          let api_url = `/api/entries/`;
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.all_entries = response.data;
                  this.getEntries(token);
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          getEntries: function(id) {
              console.log("Getting entries");
              console.log(this.all_entries);
            for(var x = 0; x < this.all_entries.length; x++){
                if(this.all_entries[x].entry_author.id == id){
                    this.individual_entries.push(this.all_entries[x]);
                    this.all_entries.splice(x,1);
                }
            }
          }
         
        }
      });
