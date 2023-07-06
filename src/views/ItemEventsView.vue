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
              <div class="row">
                <div class="col-md-8">
                  <h3 class="card-title">Events for {{ item.name }}</h3>
                </div>

                <div class="col-md-4 pull-right">
                  <a class="btn btn-primary float-end" @click="adding=!adding">Add Event</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row" v-if="adding">
                <form class="row g-3" @submit.prevent="addItemEvent">
                  <div class="col-md-6">
                    <label for="inputName" class="form-label">Event</label>
                    <select class="form-select" aria-label="Default select example" required v-model="formData.event_id">
                      <option selected>Select Event</option>
                      <option v-for="event in all_events" :key="event.id" :value="event.id">{{ event.title }}</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="inputPrice" class="form-label">Value</label>
                    <input type="text" class="form-control" required id="value" placeholder="" v-model="formData.value">
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
              <div class="row mt-4">
                <div class="table-responsive">
                  <table class="table border text-nowrap text-md-nowrap table-hover mb-0">
                    <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="events.length<1">
                      <td colspan="4" class="text-center">No events available</td>
                    </tr>
                    <tr v-for="event in events" :key="event.id">
                      <td>{{ event.title }}</td>
                      <td>{{ event.description }}</td>
                      <td>{{ event.value }}</td>
                      <td>
                        <RouterLink :to="'/event/edit/' + event.id" class="btn btn-primary">Edit</RouterLink>
                        <button class="btn btn-danger" @click="deleteItemEvent(event.id)">Delete</button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
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
      all_events: [],
      item: {},
      adding: false,
      formData: {
        event_id: '',
        value: '',
        item_id: this.$route.params.id,
      }
    }
  },
  mounted() {
    this.getItem();
    this.getAllEvents();
    this.getItemEvents();
  },
  methods: {
    getItemEvents() {
      api.get('list_item_events', {
        item_id: this.$route.params.id
      }, true).then((response) => {
        if (response.events.length > 0) {
          this.events = response.events;
        } else {
          if (response.error) {
            alert(response.error.join('<br>'))
          }
          this.events = [];
        }
      });
    },
    getAllEvents() {
      api.get('list_events', {}, true).then((response) => {
        if (response.length > 0) {
          this.all_events = response;
        } else {
          if (response.error) {
            alert(response.error.join('<br>'))
          }
          this.all_events = [];
        }
      });
    },
    getItem() {
      api.get('get_item', {
        id: this.$route.params.id
      }, true).then((response) => {
        console.log(response);
        this.item = response;
      });
    },
    addItemEvent() {
      api.post('create_item_event', this.formData, true).then(() => {
        this.getItemEvents();
        this.adding = false;
        this.formData = {
          event_id: '',
          value: '',
          item_id: this.$route.params.id,
        }
      });
    },
    deleteItemEvent(id) {
      confirm('Are you sure you want to delete this item event?') && api.post('delete_item_event', {
        id: id
      }, true).then(() => {
        this.getItemEvents();
      });
    }
  }
}
</script>
