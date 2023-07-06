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
                  <h3 class="card-title">Add Event</h3>
                </div>

                <div class="col-md-4 pull-right">
                  <RouterLink to="/events" class="btn btn-primary float-end">Back</RouterLink>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <form class="row g-3" @submit.prevent="addEvent">
                  <div class="col-md-6">
                    <label for="inputName" class="form-label">Title</label>
                    <input type="text" class="form-control" id="inputTitle" required placeholder="Title" v-model="formData.title">
                  </div>
                  <div class="col-md-6">
                    <label for="inputPrice" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Short and sweet work best" v-model="formData.description">
                    </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary">Add</button>
                  </div>
                </form>
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
      formData: {
        title: '',
        description: ''
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      api.get('get_item',{
        id: this.$route.params.id
      }, true).then((response) => {
        this.formData = response;
      });
    }
  },
  methods: {
    addEvent() {
      api.post('create_event', {
        title: this.formData.title,
        description: this.formData.description,
      }, true).then((response) => {
        console.log(response);
    this.$router.push('/events');
  });
    }
  }
}
</script>
