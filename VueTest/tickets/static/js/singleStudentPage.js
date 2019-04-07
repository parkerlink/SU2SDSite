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
	  deletedEntry: {},
          users: [],
          all_user_info: {},
          full_name: '',
          student_email: '',
	  temp_user: {},
	  updatedUser: {},
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
		  this.temp_user = response.data;
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
            this.full_name += this.all_user_info.user.first_name + " " + this. all_user_info.user.last_name;
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
          },
	  deleteEntry: function(id) {
            console.log(id);
            this.loading = true;
	    this.setDeletedEntry(token,id);
     	   

	    this.$http.delete(`/api/entries/${id}/`)
                .then((response) => {
                  this.loading = false;
		  this.getEntries();
                })
                .catch((err) => {
                  this.loading = false;
                  console.log('This is the big error');
                  console.log(err);
                })
          },
	setDeletedEntry: function(userId, id){
	this.$http.get(`/api/users/${userId}/`)
                .then((response) => {
                  this.loading = false;
                  this.updatedUser = response.data;
                  console.log(this.updatedUser);
                }) 
                .catch((err) => {
                  this.loading = false;
                  console.log('This is the big error');
                  console.log(err);
                })

	this.$http.get(`/api/entries/${id}/`)
                .then((response) => {
                  this.loading = false;
                  this.deletedEntry = response.data;
                  console.log(this.deletedEntry);
		})
                .catch((err) => {
                  this.loading = false;
                  console.log('This is the big error');
                  console.log(err);
                })
		this.removeStats(this.updatedUser,this.deletedEntry);
	},
	removeStats: function(userInfo,deletedEntry) {
	 var newFloorsTotal = Number(userInfo.totalStairsStepped - deletedEntry.floors_walked);
	 var newStepsTotal = userInfo.totalStepsTaken - deletedEntry.steps_taken;
	 var newCaloriesTotal = userInfo.totalCaloriesBurned - deletedEntry.calories_burned;
	 var newEntryNumber = userInfo.totalEntries - 1;
	console.log("New floors total: " + newFloorsTotal);
        console.log("New steps total: " + newStepsTotal);
        console.log("New calories total: " + newCaloriesTotal);
        console.log("New entries total: " + newEntryNumber);
	}
         
        }
      });
