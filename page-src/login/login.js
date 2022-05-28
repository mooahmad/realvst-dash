// import required from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    components: {
    },
    data() {
        return {
            email: null,
            password: null,
            check: false,
            loginData: null,
            emailError: '',
            passError: ''
        }
    },

    methods: {
        logIn() {
            try {
                console.log(this.$v)
                axios.post('http://34.125.158.199/auth/login', {
                    "email": this.email,
                    "password": this.password

                }).then((response) => {
                    this.loginData = response.data
                    // localStorage.user_token =  this.loginData.access_token
                    localStorage.setItem('user_token', this.loginData.access_token)
                    localStorage.user_name =  this.loginData.user.name
                    localStorage.user_role =  this.loginData.user.role_name
                    this.emailError = this.loginData?.email[0],
                    this.passError = this.loginData?.password[0]

                })

                if(localStorage.getItem('user_token') && this.email != '' && this.password != ''){
                    this.$router.push('/investors')
                }

            } catch (e) {

                this.check = true
            }
        }
    },

    mounted(){
        if(localStorage.getItem('user_token')){
            this.$router.push('/investors')
        }
    }
}