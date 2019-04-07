//Vue for Comments
var url = window.location.href;

function getID(url){
    var link = url.split("/");
    var location = link[5];
    return location;
}
var token = getID(url);


Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");
      var startComment = new Vue({
        el: '#startComment',
        delimiters: ['${','}'],
        data: {
          comments: [],
          tickets: [],
          loading: true,
          currentComment: {},
          message: null,
          newComment: { 'comment_text':null,'comment_auth':null,'comment_time':null,'comment_status':null,'ticket': null },
          search_term: '',
          allTickets: [],
          
        },
       mounted: function() {
          this.getComments(token);
          this.getTickets(token);
          this.getAllTickets();
        },
        methods: {
          getAllTickets: function() {
          let api_url = '/api/tickets/';
          if(this.search_term!==''||this.search_term!==null) {
            api_url = `/api/tickets/?search=${this.search_term}`
          }
          
            this.loading = true;
            this.$http.get(api_url)
                .then((response) => {
                  this.allTickets = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })

          },
          getTickets: function(token) {
                this.loading = true;
                this.$http.get(`/api/tickets/${token}`)
                    .then((response) => {
                      this.tickets = response.data;
                      this.loading = false;
                    })
                    .catch((err) => {
                      this.loading = false;
                      console.log(err);
                    })

              },
          getComments: function(token) {
            /*if(this.search_term!==''||this.search_term!==null) {
              api_url = `/api/comment/?search=${this.search_term}`
            }*/
            this.loading = true;
            this.$http.get(`/api/comment/?ticket=${token}`)

                .then((response) => {
                  this.comments = response.data;
                  this.loading = false;
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          setDefaultSelected: function(num, name) {
             startComment.newComment['ticket'] = num;
             startComment.newComment['comment_auth'] = name;
           },
           updateTicket: function(tickets) {
            console.log(this.tickets);
            this.tickets.ticket_customer_id = this.tickets.ticket_customer.id;
            // this.tickets.ticket_status = this.comments[comments.length].comment_status;
            this.$http.put(`/api/tickets/${this.tickets.ticket_id}/`, this.tickets)
                .then((response) => {
                  this.loading = false;
                  this.currentTicket = response.data;
                  this.getTickets();
                  $("#editTicketModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          updateTicketStatus: function(tickets) {
              this.tickets.ticket_status = this.newComment.comment_status;
              this.updateTicket(tickets);
          },
          addComment: function() {
            this.loading = true;
            this.$http.post('/api/comment/', this.newComment)

                .then((response) => {
                  this.loading = true;
                  this.getComments(token);
                  $("#addCommentModal").modal('hide');
                })
                .catch((err) => {
                  this.loading = true;
                  console.log(err);
                })
          },
        }
        
      });
