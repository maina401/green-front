<template>
  <!-- CONTAINER OPEN -->
  <div class="col col-login mx-auto mt-7">
    <div class="text-center">
      <img src="../assets/images/brand/logo-white.png" class="header-brand-img" alt="">
    </div>
  </div>

  <div class="container-login100">
    <div class="wrap-login100 p-6">
                            <span class="login100-form-title pb-5">
                                Welcome!
                            </span>
      <div class="panel panel-primary">
        <div class="tab-menu-heading">
          <div class="tabs-menu1">
            <!-- Tabs -->
            <ul class="nav panel-tabs">
              <li class="mx-0"><a href="#tab5" class="active" data-bs-toggle="tab">Login</a></li>
              <li class="mx-0"><a href="#tab6" data-bs-toggle="tab">Register</a></li>
            </ul>
          </div>
        </div>
        <div class="panel-body tabs-menu-body p-0 pt-5">
          <div class="tab-content">
            <div class="tab-pane active" id="tab5">
              <form class="login100-form validate-form" @submit.prevent="login">

                <div class="wrap-input100 validate-input input-group"
                     data-bs-validate="Valid email is required: ex@abc.xyz">
                  <a href="javascript:void(0)" class="input-group-text bg-white text-muted">
                    <i class="zmdi zmdi-email text-muted" aria-hidden="true"></i>
                  </a>
                  <input class="input100 border-start-0 form-control ms-0" v-model="loginFormData.email" type="email"
                         placeholder="Email">
                </div>
                <div class="wrap-input100 validate-input input-group" id="Password-toggle">
                  <a href="javascript:void(0)" class="input-group-text bg-white text-muted">
                    <i class="zmdi zmdi-eye text-muted" aria-hidden="true"></i>
                  </a>
                  <input class="input100 border-start-0 form-control ms-0" v-model="loginFormData.password"
                         type="password" placeholder="Password">
                </div>

                <div class="container-login100-form-btn">
                  <button type="submit" class="login100-form-btn btn-primary">
                    Login
                  </button>
                </div>
              </form>

            </div>
            <div class="tab-pane" id="tab6">
              <form class="login100-form validate-form" @submit.prevent="register">

                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Name <span class="text-red">*</span></label>
                      <input type="text" class="form-control" name="name" v-model="registerFormData.name"
                             placeholder="Name">
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Phone <span class="text-red">*</span></label>
                      <input type="text" class="form-control" v-model="registerFormData.phone" name="phone">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="form-label">Email address <span class="text-red">*</span></label>
                      <input type="email" class="form-control" v-model="registerFormData.email" placeholder="Email"
                             name="email">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label class="form-label">Password<span class="text-red">*</span></label>
                      <input type="password" class="form-control" v-model="registerFormData.password" name="password">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label class="form-label">Confirm Password <span class="text-red">*</span></label>
                      <input type="password" class="form-control" v-model="registerFormData.password_confirmation"
                             name="password_confirmation">
                    </div>
                  </div>
                  <div class="container-login100-form-btn">
                    <button type="submit" class="login100-form-btn btn-primary">
                      Register
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- CONTAINER CLOSED -->
</template>
<script>
import * as api from "@/utils/api";
export default {
  data() {
    return {
      registerFormData: {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        mobileNumber: ''
      },
      loginFormData: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    register() {
      api.post('register', this.registerFormData).then((response) => {
        if (response.status === '01') {
          localStorage.setItem('user', JSON.stringify(response.data))
          this.$router.push('/login')
        } else {
          alert(response.error.join('<br>'))
        }
      }).catch((error) => {
        console.log(error)
        alert(error.response.error.join('<br>'))
      })
    },
    login() {
      function randomBytes(number) {
        let random = ''
        for (let i = 0; i < number; i++) {
          random += Math.floor(Math.random() * 10)
        }
        return random
      }

      let data = {
        client_id: this.loginFormData.email,
        client_secret: btoa(randomBytes(6)+this.loginFormData.password),
      }
      api.post('login', data).then((response) => {
        console.log(response)
        if (response.status === '01') {
          localStorage.setItem('token', JSON.stringify(response))
          alert('Login Success')
          this.$router.push('/')
        } else {
          alert(response.message)
        }
      }).catch((error) => {
        console.log(error)
        alert(error.response.message)
      })
    },
    togglePassword() {
      const passwordInput = document.getElementById('Password-toggle')
      const passwordIcon = document.getElementById('Password-icon')
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text'
        passwordIcon.classList.remove('fa-eye')
        passwordIcon.classList.add('fa-eye-slash')
      } else {
        passwordInput.type = 'password'
        passwordIcon.classList.remove('fa-eye-slash')
        passwordIcon.classList.add('fa-eye')
      }
    },
  },
  mounted() {
    console.log('mounted')
  },
}
</script>
