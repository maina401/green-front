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
                  <h3 class="card-title">{{operation}} Item</h3>
                </div>

                <div class="col-md-4 pull-right">
                  <RouterLink to="/" class="btn btn-primary float-end">Back</RouterLink>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <form class="row g-3" @submit.prevent="addItem">
                  <div class="col-md-6">
                    <label for="inputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Name" v-model="formData.name">
                  </div>
                  <div class="col-md-6">
                    <label for="inputPrice" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Short and sweet work best" v-model="formData.description">
                    </div>
                  <div class="col-md-6">
                    <label for="inputPrice" class="form-label">Price</label>
                    <input type="text" class="form-control" id="inputPrice" placeholder="Price" v-model="formData.price">
                  </div>
                  <div class="col-md-6">
                    <label for="inputQuantity" class="form-label">Quantity</label>
                    <input type="text" class="form-control" id="inputQuantity" placeholder="Quantity" v-model="formData.quantity">
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary">{{operation}}</button>
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
      items: [],
      formData: {
        id: '',
        name: '',
        price: '',
        color: '',
        quantity: '',
        description: ''
      },
      operation: 'Add'
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.operation = 'Edit';
      api.get('get_item',{
        id: this.$route.params.id
      }, true).then((response) => {
        this.formData = response;
      });
    }
  },
  methods: {
    addItem() {
      let resource = 'create_item';
      if (this.$route.params.id) {
        resource = 'update_item';
        this.formData.id = this.$route.params.id;
      }
      api.post(resource, {
        ...this.formData,
      }, true).then((response) => {
        console.log(response);
        this.items = response;
      });
    }
  }
}
</script>
