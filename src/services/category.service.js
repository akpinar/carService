import axios from "axios";
import authHeader from "@/services/auth-header";


class CategoryService {

    categoryAdd(category) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/category-api/',
            {
                name: category.name,
                parent: category.parent,


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    categoryUpdate(category) {

        const params = {
            id: category.id

        };


        return axios.put(process.env.VUE_APP_API_URL + '/car-service/category-api/',
            {

                name: category.name,
                parent : category.parent

            }, {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getCategory(id) {
        const params = {
            id: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/category-api/`, {headers: authHeader(), params})


    }


    deleteCategory(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/category-api/`, {
            headers: authHeader(),
            params
        }).then(response => {
            return response;
        }).catch((err) => {
            if (err.response) {
                return err.response
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })


    }


}

export default CategoryService