Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");

var starting = new Vue({
        el: '#starting',
        delimiters: ['${','}'],
        data: {
          all_entries: [], //Grabs all of the entries
          select_entries: [], //Filters out all of the junk
          message: true,
          loading: true,
          currentEntry: {'entry_author':{'id':0}, 'entry_author_id':0},
          message: null,
          newEntry: { 'floors_walked': null, 'calories_burned': null, 'steps_taken': null, 'entry_author': null, 'entry_author_id': null},
          search_term: '',
          users: [],
          currentWeek: '0',
          weekSelected: '',
          weekOptions: [ ],
          
        },
        mounted: function() {
          this.getAllEntries();
          this.getUsers();
          this.getCurrentWeek();
        },
        methods: {
          getCurrentWeek: function(){
            var startDay = 24;
            var startMonth = 1;

            var today = new Date();
            var day = String(today.getDate()).padStart(2, '0');
            var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var year = today.getFullYear();
            
            var dayDifference = day - startDay;

            if(month == 1){
              //Something else
            }if(month == 2){
              dayDifference += 31;
            }if(month == 3){
              dayDifference += 59;
            }if(month == 4){
              dayDifference += 90;
            }if(month == 5){
              dayDifference += 120;
            }if(month == 6){
              dayDifference += 151;
            }if(month == 7){
              dayDifference += 181;
            }if(month == 8){
              dayDifference += 212;
            }if(month == 9){
              dayDifference += 243;
            }if(month == 10){
              dayDifference += 272;
            }if(month == 11){
              dayDifference += 304;
            }if(month == 12){
              dayDifference += 334;
            }
            var weekTotal = dayDifference/7; 
            console.log("This is week total: " + weekTotal);
            this.weekSelected = Math.ceil(weekTotal);
            console.log("Week Selected: " + this.weekSelected);
            for(var x = 1; x < this.weekSelected + 1; x++){
              var temp = "Week " + x;
              this.weekOptions.push({ text: temp , value: x });
            }
          },
          checkID(id,entry){            
            if(entry.entry_author.id == id){
              return true;
            }else{
              return false;
            }
          },
          showFloors: function(id){
            if(this.message != null){
                if(this.message != 'steps'){
                  this.newEntry.steps_taken = null;
                  return true;
                }
            }
          }, 
          showSteps: function(){
            if(this.message != null){
                if(this.message != 'floors'){
                    this.newEntry.floors_walked = null;
                    return true;
                }
            }
            
          }, 
          setAuthor: function(id,loggedInUser){
            //Loops through all the users and matches the logged in user makes them the author
            if(this.newEntry.entry_author == null){
              for(x = 0; x < this.users.length; x++){
                if(this.users[x].user.id == id){
                  let author = {
                    id: this.users[x].id,
                    user: {
                      first_name: this.users[x].user.first_name,
                      last_name: this.users[x].user.last_name
                    }
                  }
                  this.newEntry.entry_author = author;
                  x = this.users.length;
                }
              }
              this.newEntry.entry_author_id = this.newEntry.entry_author.id;
            }else{
              return;
            }
            
          }, 
          getUsers: function() {
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
          getAllEntries: function() {
          let api_url = '/api/entries/';
          if(this.search_term!==''||this.search_term!==null) {
            api_url = `/api/entries/?search=${this.search_term}`
          }
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.all_entries = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          getSingleEntry: function(id) {
            this.loading = true;
            this.$http.get(`/api/entries/${id}/`)
                .then((response) => {
                  this.currentEntry = response.data;
                  //console.log(this.currentTicket.ticket_tech.id);
                  $("#editEntrysModal").modal('show');
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          addEntry: function(id) {
            this.loading = true;
            this.calculations(id);
            this.newEntry.week_number = this.weekSelected;

            this.$http.post('/api/entries/',this.newEntry)
                .then((response) => {
                  this.loading = false;
                  this.getAllEntries();
                  $("#addEntryModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          changeUserTotals: function(id,steps,floors,roundedCalories){
            for(var x = 0; x < this.users.length; x++){
              if(id == this.users[x].id){
                this.users[x].totalStairsStepped += Number(floors); 
                this.users[x].totalStepsTaken += Number(steps);
                console.log(roundedCalories);
                this.users[x].totalCaloriesBurned += Number(roundedCalories);
                this.users[x].totalEntries += 1;
                this.$http.put('/api/users/' + id + '/', this.users[x])
              }
            }
          },
          calculations: function(id){
            var steps = Number(this.newEntry.steps_taken);
            var stepsHalved = 0;
            var floors = Number(this.newEntry.floors_walked);
            var calories = 0;
            if(steps != 0 && floors == 0){
              floors = Math.round(steps/32);
              stepsHalved = Math.round(steps/2);
              calories = (stepsHalved*.17) + (stepsHalved*.05);
              this.newEntry.floors_walked = floors;
            }else if(steps == 0 && floors != 0){
              steps = Math.round(floors*32);
              stepsHalved = steps/2;
              calories = (stepsHalved*.17) + (stepsHalved*.05);
              this.newEntry.steps_taken = steps;
            }
            roundedCalories = Math.round(calories);
            this.newEntry.calories_burned = roundedCalories;
            this.changeUserTotals(id,steps,floors,roundedCalories);
          },
          updateEntry: function() {
            this.loading = true;
            this.$http.put(`/api/entries/${this.currentEntry.id}/`, this.currentEntry)
                .then((response) => {
                  this.loading = false;
                  this.currentEntry = response.data;
                  this.getAllEntries();
                  $("#editEntryModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          deleteEntry: function(id) {
            this.loading = true;
            this.$http.delete(`/api/entries/${id}/`)
                .then((response) => {
                  this.loading = false;
                  this.getAllEntries();
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          }
        }
        
      });
