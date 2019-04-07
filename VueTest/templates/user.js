Vue.http.headers.common['X-CSRFToken'] = $("#token2").attr("value");
      var starting = new Vue({
        el: '#starting',
        delimiters: ['${','}'],
        data: {
          announcements: [],
          loading: true,
          currentAnnouncement: {},
          message: null,
          newAnnouncement: { 'announcement_title': null, 'announcement_text': null},
          search_term: '',
          users: [],
        },
        mounted: function() {
          this.getAnnouncements();
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
          getAnnouncements: function() {
            let api_url = '/api/announcements/';
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.announcements = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          sayHello: function() {
            window.alert('Hello!');
          },
          // getAnnouncement: function(id) {
          //   this.loading = true;
          //   this.$http.get(`/api/announcements/${id}/`)
          //       .then((response) => {
          //         this.currentTicket = response.data;
          //         $("#editTicketModal").modal('show');
          //         this.loading = false;
          //       })
          //       .catch((err) => {
          //         this.loading = false;
          //         console.log(err);
          //       })
          // },
          addAnnouncement: function() {
            this.loading = true;
            this.$http.post('/api/announcements/',this.newAnnouncement)
                .then((response) => {
                  this.loading = false;
                  this.getAnnouncements();
                  $("#addAnnouncementModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          }//,
          // updateTicket: function() {
          //   this.loading = true;
          //   this.$http.put(`/api/tickets/${this.currentTicket.ticket_id}/`, this.currentTicket)
          //       .then((response) => {
          //         this.loading = false;
          //         this.currentTicket = response.data;
          //         this.getTickets();
          //         $("#editTicketModal").modal('hide');
          //       })
          //       .catch((err) => {
          //         this.loading = false;
          //         console.log(err);
          //       })
          // },
          // deleteTicket: function(id) {
          //   console.log('You pressed delete');
          //   this.loading = true;
          //   this.$http.delete(`/api/tickets/${id}/`)
          //       .then((response) => {
          //         this.loading = false;
          //         this.getTickets();
          //       })
          //       .catch((err) => {
          //         this.loading = false;
          //         console.log('This is the big error');
          //         console.log(err);
          //       })
          // }
        }
        
      });
