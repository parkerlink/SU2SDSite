/*var url = window.location.href;

function getID(url){
    var link = url.split("/");
    var location = link[4];
    return location;
}
var token = getID(url);
*/
Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");
      var getUserInfo = new Vue({
        el: '#getUserInfo',
        delimiters: ['${','}'],
        data: {
          users: [],
          loading: true,
          currentUser: {},
          message: null,
          //newComment: { 'comment_text':null,'comment_auth':null,'comment_time':null,'comment_status':null,'ticket':null,'reply':null  },
          search_term: '',
        },
       mounted: function() {
          this.getUsers();
        },
        methods: {
          getUsers: function() {
            /*if(this.search_term!==''||this.search_term!==null) {
              api_url = `/api/comment/?search=${this.search_term}`
            }*/
            this.loading = true;
            this.$http.get(`/api/users/`)
                .then((response) => {
                  this.users = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          getUser: function(token) {
            this.loading = true;
            this.$http.get(`/api/users/${token}/`)
                .then((response) => {
                  this.currentUser = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          }
        }
        
      })