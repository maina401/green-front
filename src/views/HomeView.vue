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
                  <h3 class="card-title">Available Items</h3>
                </div>

                <div class="col-md-4 pull-right">
                  <RouterLink to="/item/add" class="btn btn-primary float-end">Add Item</RouterLink>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table border text-nowrap text-md-nowrap table-hover mb-0">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.color }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>
                      <RouterLink :to="'/item/edit/' + item.id" class="btn btn-primary">Edit</RouterLink>
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
      items: [],
    }
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      api.get('list_items', [], true).then((response) => {
        console.log(response);
        this.items = response;
      });
    },
    deleteItem(id) {
     confirm('Are you sure you want to delete this item?') &&  api.post('delete_item', {
       id: id
     }, true).then((response) => {
       if ( response.status === "01" ){
         this.getItems();
       }
     });
    }
  }
}
</script>
