Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");

var starting = new Vue({
        el: '#starting',
        delimiters: ['${','}'],
        data: {
          all_entries: [], //Grabs all of the entries
          stepsTotal: 0, 
          caloriesTotal: 0, 
          energySaved: 0,
          floorsTotal: 0,
          announcementList: [],
        },
        mounted: function() {
          this.getAllEntries();
          this.getAnnouncements();
        },
        methods: {
          getAnnouncements: function() {
            let api_url = '/api/announcements/';
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.announcementList = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          getAllEntries: function() {
          let api_url = '/api/entries/';
            this.loading = true;
            this.$http.get(api_url )
                .then((response) => {
                  this.all_entries = response.data;
                  this.calculateFootsteps(this.all_entries);
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          calculateFootsteps: function(all_entries){
              var stairsStepConversion;
              console.log(all_entries);
              for(var x = 0; x < all_entries.length;x++){
                if(all_entries[x].steps_taken){
                    this.stepsTotal += all_entries[x].steps_taken;
                }else{
                    stairsStepConversion = all_entries[x].floors_walked*32;
                    this.stepsTotal += stairsStepConversion;
                }
                this.floorsTotal += all_entries[x].floors_walked;
                this.caloriesTotal += all_entries[x].calories_burned;
              }
              this.energySaved = this.floorsTotal*5;
          }
        }
      });
