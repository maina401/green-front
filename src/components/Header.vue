<script setup lang="ts">

</script>

<template>
  <!-- app-Header -->
  <div class="app-header header sticky">
    <div class="container-fluid main-container">
      <div class="d-flex">
        <a aria-label="Hide Sidebar" class="app-sidebar__toggle" data-bs-toggle="sidebar"
           href="javascript:void(0)"></a>
        <!-- sidebar-toggle-->
        <a class="logo-horizontal " href="index.html">
          <img src="/assets/images/brand/logo.png" class="header-brand-img desktop-logo" alt="logo">
          <img src="/assets/images/brand/logo-3.png" class="header-brand-img light-logo1"
               alt="logo">
        </a>
        <!-- LOGO -->
        <div class="main-header-center ms-3 d-none d-lg-block">
          <input class="form-control" placeholder="Search for results..." type="search">
          <button class="btn px-0 pt-2"><i class="fe fe-search" aria-hidden="true"></i></button>
        </div>
        <div class="d-flex order-lg-2 ms-auto header-right-icons">
          <div class="dropdown d-none">
            <a href="javascript:void(0)" class="nav-link icon" data-bs-toggle="dropdown">
              <i class="fe fe-search"></i>
            </a>
            <div class="dropdown-menu header-search dropdown-menu-start">
              <div class="input-group w-100 p-2">
                <input type="text" class="form-control" placeholder="Search....">
                <div class="input-group-text btn btn-primary">
                  <i class="fe fe-search" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- SEARCH -->
          <button class="navbar-toggler navresponsive-toggler d-lg-none ms-auto" type="button"
                  data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-4"
                  aria-controls="navbarSupportedContent-4" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon fe fe-more-vertical"></span>
          </button>
          <div class="navbar navbar-collapse responsive-navbar p-0">
            <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
              <div class="d-flex order-lg-2">
                <div class="dropdown d-lg-none d-flex">
                  <a href="javascript:void(0)" class="nav-link icon" data-bs-toggle="dropdown">
                    <i class="fe fe-search"></i>
                  </a>
                  <div class="dropdown-menu header-search dropdown-menu-start">
                    <div class="input-group w-100 p-2">
                      <input type="text" class="form-control" placeholder="Search....">
                      <div class="input-group-text btn btn-primary">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- SEARCH -->
                <div class="dropdown  d-flex">
                  <a class="nav-link icon theme-layout nav-link-bg layout-setting">
                    <span class="dark-layout"><i class="fe fe-moon"></i></span>
                    <span class="light-layout"><i class="fe fe-sun"></i></span>
                  </a>
                </div>
                <!-- Theme-Layout -->
                <div class="dropdown d-flex profile-1">
                  <a href="javascript:void(0)" data-bs-toggle="dropdown"
                     class="nav-link leading-none d-flex">
                    <img src="/assets/images/users/21.jpg" alt="profile-user"
                         class="avatar  profile-user brround cover-image">
                  </a>
                  <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <div class="drop-heading">
                      <div class="text-center">
                        <h5 class="text-dark mb-0 fs-14 fw-semibold">Percy Kewshun</h5>
                        <small class="text-muted">Senior Admin</small>
                      </div>
                    </div>
                    <div class="dropdown-divider m-0"></div>
                    <a class="dropdown-item" @click.prevent="logout()">
                      <i class="dropdown-icon fe fe-alert-circle"></i> Sign out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /app-Header -->
</template>

<style scoped>

</style>
<script lang="ts">
export default {
  data() {
    return {

    }
  },
  methods: {
    checkAuth: function () {
      const user = localStorage.getItem('token')
      if (!user && this.$route.path !== '/login') {
        this.$router.push('/login')
      } else {
        // Check for token expiry
        const token = localStorage.getItem('token')
        if (!token) {
          this.$router.push('/login')
        } else {
          try {
            const tokenJson = JSON.parse(token)
            const tokenData = JSON.parse(atob(tokenJson.access_token.split('.')[1]))
            const expiry = tokenData.exp
            const now = new Date()
            const nowInSec = Math.floor(now.getTime() / 1000)
            if (nowInSec > expiry) {
              this.$router.push('/login')
            }
          } catch (e) {
            //clear token
            localStorage.removeItem('token')
            //interval clear
            this.$router.push('/login')
          }
        }
      }
    },
    logout: function () {
      localStorage.removeItem('token')
    }
  },
  mounted() {
    let interval=undefined;
    try {
      this.checkAuth();
      interval =setInterval(() => {
        this.checkAuth();
      }, 1000)

    }catch (e) {
      clearInterval(interval)
    }

  },
}
</script>