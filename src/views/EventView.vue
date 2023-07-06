<template>
  <Header/>
  <SideBar/>
  <div class="main-content app-content mt-8">

    <div class="side-app">
      <!-- CONTAINER -->
      <div class="row mt-5">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row d-flex">
                <div class="col-md-8">
                  <h3 class="card-title">Available Events</h3>
                </div>

                <div class="col-md-4 pull-right">
                  <RouterLink to="/event/add" class="btn btn-primary float-end">Add Event</RouterLink>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table border text-nowrap text-md-nowrap table-hover mb-0">
                  <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created On</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="events.length<1">
                    <td colspan="4" class="text-center">No events available</td>
                  </tr>
                  <tr v-for="item in events" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                      <RouterLink :to="'/event/edit/' + item.id" class="btn btn-primary">Edit</RouterLink>
                      <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- CONTAINER END -->
    </div>
  </div>

</template>
<script>
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import * as api from "@/utils/api";

export default {
  components: {SideBar, Header},
  data() {
    return {
      events: [],
    }
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      api.get('list_events', [], true).then((response) => {
        console.log(response);
        this.events = response;
      });
    },
    deleteItem(id) {
     confirm('Are you sure you want to delete this event?') &&  api.post('delete_event', {
       id: id
     }, true).then(() => {
         this.getEvents();
     });
    }
  }
}
</script>
