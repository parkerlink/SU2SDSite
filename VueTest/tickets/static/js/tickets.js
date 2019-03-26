//Vue for All IT Tickets
Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");
      var starting = new Vue({
        el: '#starting',
        delimiters: ['${','}'],
        data: {
          tickets: [],
          loading: true,
          currentTicket: {'ticket_tech':{'id':0}, 'ticket_tech_id':0,'ticket_customer':{'id':0}, 'ticket_customer_id':0},
          message: null,
          newTicket: { 'ticket_status': null, 'ticket_tech': null, 'ticket_tech_id': null, 'ticket_customer': null,'ticket_desc': null},
          search_term: '',
          users: [],
        },
        mounted: function() {
          this.getTickets();
          this.getUsers();
        },
        methods: {
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
                  //console.log(this.currentTicket.ticket_tech.id);
                  if(this.currentTicket.ticket_tech){
                    this.currentTicket.ticket_tech_id = this.currentTicket.ticket_tech.id;
                  }else {
                    // this.currentTicket.ticket_tech = null;
                     this.currentTicket.ticket_tech_id = 0;
                  }
                  this.currentTicket.ticket_customer_id = this.currentTicket.ticket_customer.id;

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
                  this.loading = false;
                  this.getTickets();
                  $("#addTicketModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          updateTicket: function() {
            this.loading = true;
                  if(this.currentTicket.ticket_tech_id == 0) {
                     this.currentTicket.ticket_tech = null;
                     this.currentTicket.ticket_tech_id = null;
                  }
                // console.log("Before customer" + this.currentTicket.ticket_customer.id);
                // this.currentTicket.ticket_customer_id = this.currentTicket.ticket_customer.id;
                // console.log("After customer" + this.currentTicket.ticket_customer.id);

            this.$http.put(`/api/tickets/${this.currentTicket.ticket_id}/`, this.currentTicket)
                .then((response) => {
                  this.loading = false;
                  console.log("Before the response data even comes in");
                  this.currentTicket = response.data;
                  this.getTickets();
                  $("#editTicketModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          deleteTicket: function(id) {
            console.log('You pressed delete');
            this.loading = true;
            this.$http.delete(`/api/tickets/${id}/`)
                .then((response) => {
                  this.loading = false;
                  this.getTickets();
                })
                .catch((err) => {
                  this.loading = false;
                  console.log('This is the big error');
                  console.log(err);
                })
          }
        }
        
      });
    $(document).on("keypress", ".input-group:has(input:input, span.input-group-btn:has(div.btn)) input:input", function(e){
        if (e.which == 13){
            $(this).closest(".input-group").find("div.btn").click();
        }
    });
