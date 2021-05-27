import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_API_URL;

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '/api/token/', {
                username: user.username,
                password: user.password
            })
            .then(response => {
               
                if (response.data.access) {
                    localStorage.setItem('user_group',response.data.group)
                    localStorage.setItem('username', user.username)
                    localStorage.setItem('user_token', response.data.access)
                    localStorage.setItem('user_refresh_token', response.data.refresh)
                    this.getUserInfo().then( response => {
                     localStorage.setItem('user_name_surname', response.data)
                    }

                                      

                    );

                }



                return response.data;
            });
    }

    getUserInfo() {

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/user-payload-api/`, {
            headers: authHeader()

        })}





    logout() {
        localStorage.removeItem('user');
    }

    localStorageControl() {
        if (localStorage.getItem('user_token') === null) {
            return false;
        } else {
            return true;
        }
    }

    register(user) {
        return axios.post(API_URL + '/car-service/user-api/', {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            password: user.password,
            mobile_phone: user.mobile_phone,
            gender: user.gender,
            address: user.address
        });
    }
    async regeneratePassword(email){
        return  axios.post(API_URL + '/car-service/password-regen/', {email}).then((response)=>{
            return response;}).catch(error =>{
                return error.response
            });
    }
}

export default new AuthService()