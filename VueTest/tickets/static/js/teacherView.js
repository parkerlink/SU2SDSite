Vue.http.headers.common['X-CSRFToken'] = $("#token").attr("value");
    const starting = new Vue({
        el:'#starting',
        delimiters: ['${','}'],
        data:{
          cats:[],
          currentSort:'id',
          currentSortDir:'asc',
          pageSize:10,
          currentPage:1
        },
        mounted: function() {
          //this.getAllEntries();
          this.getUsers();
        },
        methods:{
          removeTestProfiles: function(){
            console.log("Removing");
            for(var x = 0; x < this.cats.length;x++){
              if(!(this.cats[x].user.first_name) || !(this.cats[x].user.last_name)){
                this.cats.splice(x,1);
              }
            }
          },
          getUsers: function() {
            this.loading = true;
            this.$http.get(`/api/users/`)
                .then((response) => {
                  this.cats = response.data;
                  this.removeTestProfiles();
                  console.log(this.cats);
                  this.loading = false;
                  
                })
                .catch((err) => {
                  this.loading = false;
                  console.log(err);
                })
          },
          sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
              this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
            console.log(this.currentSort);
          },
          nextPage:function() {
            if((this.currentPage*this.pageSize) < this.cats.length) this.currentPage++;
          },
          prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
          }
      
        },
        computed:{
          sortedCats:function() {
            return this.cats.sort((a,b) => {
              let modifier = 1;
              if(this.currentSortDir === 'desc') modifier = -1;
              if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
              if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
              return 0;
            }).filter((row, index) => {
              let start = (this.currentPage-1)*this.pageSize;
              let end = this.currentPage*this.pageSize;
              if(index >= start && index < end) return true;
            });
          }
        }
      })