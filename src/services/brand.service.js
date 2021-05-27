import axios from "axios";
import authHeader from "@/services/auth-header";


class BrandService {

    addBrand(brand) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/brand-api/',
            {
                name: brand.name,

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getBrands() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/brand-api/`, {headers: authHeader()})


    }

    getBrand(id) {
        const params = {
            id: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/brand-api/`, {headers: authHeader(), params})


    }


    deleteBrand(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/brand-api/`, {headers: authHeader(), params}).then(response => {
            return response;
        }).catch(error => {
            return error;
        });


    }

    updateBrand(brand) {

        const params = {
            id: brand.id

        };


        return axios.put(process.env.VUE_APP_API_URL + '/car-service/brand-api/',
            {

                name: brand.name

            }, {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }
}

export default BrandService