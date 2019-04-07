Vue.http.headers.common['X-CSRFToken'] = "{{ csrf_token }}";
      new Vue({
        el: '#starting',
        delimiters: ['${','}'],
        data: {
          tickets: [],
          loading: true,
          currentTicket: {},
          message: null,
          newTicket: { 'ticket_status': null,'ticket_tech': null, 'ticket_customer': null,'ticket_desc': null  },
          search_term: '',
        },
        mounted: function() {
          this.getTickets();
        },
        methods: {
          getTickets: function() {
            let api_url = '/api/tickets/';
            if(this.search_term!==''||this.search_term!==null) {
              api_url = `/api/tickets/?search=${this.search_term}`
            }
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.tickets = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          getTicket: function(id) {
            this.loading = true;
            this.$http.get(`/api/tickets/${id}/`)
                .then((response) => {
                  this.currentTicket = response.data;
                  $("#editTicketModal").modal('show');
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          addTicket: function() {
            this.loading = true;
            this.$http.post('/api/tickets/',this.newTicket)
                .then((response) => {
                  this.loading = true;
                  this.getTickets();
                  $("#addTicketModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = true;
                  console.log(err);
                })
          },
          updateTicket: function() {
            this.loading = true;
            this.$http.put(`/api/tickets/${this.currentTicket.ticket_id}/`, this.currentTicket)
                .then((response) => {
                  this.loading = false;
                  this.currentTicket = response.data;
                  this.getTickets();
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          deleteTicket: function(id) {
            this.loading = true;
            this.$http.delete(`/api/tickets/${id}/`)
                .then((response) => {
                  this.loading = false;
                  this.getTickets();
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          }
        }
        
      });