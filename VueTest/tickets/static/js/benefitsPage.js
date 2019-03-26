Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");

var starting = new Vue({
        el: '#starting',
        delimiters: ['${','}'],
        data: {
          //all_entries: [], //Grabs all of the entries
          //select_entries: [], //Filters out all of the junk
          message: true,
          loading: true,
          //currentEntry: {'entry_author':{'id':0}, 'entry_author_id':0},
          //message: null,
          //newEntry: { 'floors_walked': null, 'calories_burned': null, 'steps_taken': null, 'entry_author': null, 'entry_author_id': null},
          benefitList: [],
          newBenefit: { 'benefit_text': null },
          currentBenefit: { },
          
          climateList: [],
          newClimate: {},
          currentClimate: {},

          search_term: '',
          //users: [],
        },
        mounted: function() {
        //   this.getAllEntries();
        this.getBenefitList();
        this.getClimateList();
        //   this.getUsers();
        },
        methods: {
        //   getUsers: function() {
        //     this.loading = true;
        //     this.$http.get(`/api/users/`)
        //         .then((response) => {
        //           this.users = response.data;
        //           this.loading = false;
                  
        //         })
        //         .catch((err) => {
        //           this.loading = false;
        //           console.log(err);
        //         })
        //   },
          getBenefitList: function() {
          let api_url = '/api/benefitList/';
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.benefitList = response.data;
                  console.log(this.benefitList);
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          getClimateList: function() {
            let api_url = '/api/climateList/';
              this.loading = true;
              this.$http.get(api_url)
                  .then((response) => {
                    this.climateList = response.data;
                    console.log(this.climateList);
                    this.loading = false;
                  })
                  .catch((err) => {
                    this.loading = false;
                    console.log(err);
                  })
            },
          editBenefits: function(id) {
            this.loading = true;
            this.$http.get(`/api/benefitList/${id}/`)
                .then((response) => {
                  this.currentBenefit = response.data;
                  console.log(this.currentBenefit);
                  $("#editBenefitList").modal('show');
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          updateBenefit: function() {
            this.loading = true;
            this.$http.put(`/api/benefitList/${this.currentBenefit.id}/`, this.currentBenefit)
                .then((response) => {
                  this.loading = false;
                  this.currentBenefit = response.data;
                  this.getBenefitList();
                  $("#editBenefitList").modal('hide');
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          addBenefit: function() {
                this.loading = true;
                console.log(this.newBenefit);
                var temp = this.newBenefit;
                this.$http.post('/api/benefitList/',temp)
                    .then((response) => {
                    this.loading = false;
                    this.getBenefitList();
                    $("#addBenefitModal").modal('hide');
                    })
                    .catch((err) => {
                    this.loading = false;
                    console.log(err);
                    })
            },
            addClimate: function() {
                this.loading = true;
                console.log(this.newClimate);
                var temp = this.newClimate;
                this.$http.post('/api/climateList/',temp)
                    .then((response) => {
                    this.loading = false;
                    this.getClimateList();
                    $("#addClimateModal").modal('hide');
                    })
                    .catch((err) => {
                    this.loading = false;
                    console.log(err);
                    })
            },
            editClimate: function(id) {
                this.loading = true;
                this.$http.get(`/api/climateList/${id}/`)
                    .then((response) => {
                      this.currentClimate = response.data;
                      $("#editClimateList").modal('show');
                      this.loading = false;
                    })
                    .catch((err) => {
                      this.loading = false;
                      console.log(err);
                    })
              },
            updateClimate: function() {
                this.loading = true;
                this.$http.put(`/api/climateList/${this.currentClimate.id}/`, this.currentClimate)
                    .then((response) => {
                      this.loading = false;
                      this.currentClimate = response.data;
                      this.getClimateList();
                      $("#editClimateList").modal('hide');
                    })
                    .catch((err) => {
                      this.loading = false;
                      console.log(err);
                    })
              },
        //   getSingleEntry: function(id) {
        //     this.loading = true;
        //     this.$http.get(`/api/entries/${id}/`)
        //         .then((response) => {
        //           this.currentEntry = response.data;
        //           //console.log(this.currentTicket.ticket_tech.id);
        //           $("#editEntrysModal").modal('show');
        //           this.loading = false;
        //         })
        //         .catch((err) => {
        //           this.loading = false;
        //           console.log(err);
        //         })
        //   },
        //   addEntry: function(id) {
        //     this.loading = true;
        //     this.calculations(id);
        //     this.newEntry.week_number = this.weekSelected;

        //     this.$http.post('/api/entries/',this.newEntry)
        //         .then((response) => {
        //           this.loading = false;
        //           this.getAllEntries();
        //           $("#addEntryModal").modal('hide');
        //         })
        //         .catch((err) => {
        //           this.loading = false;
        //           console.log(err);
        //         })
        //   },
        //   updateEntry: function() {
        //     this.loading = true;
        //     this.$http.put(`/api/entries/${this.currentEntry.id}/`, this.currentEntry)
        //         .then((response) => {
        //           this.loading = false;
        //           this.currentEntry = response.data;
        //           this.getAllEntries();
        //           $("#editEntryModal").modal('hide');
        //         })
        //         .catch((err) => {
        //           this.loading = false;
        //           console.log(err);
        //         })
        //   },
        //   deleteEntry: function(id) {
        //     this.loading = true;
        //     this.$http.delete(`/api/entries/${id}/`)
        //         .then((response) => {
        //           this.loading = false;
        //           this.getAllEntries();
        //         })
        //         .catch((err) => {
        //           this.loading = false;
        //           console.log(err);
        //         })
        //   }
        }
        
      });
