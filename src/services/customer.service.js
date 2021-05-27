import axios from "axios";
import authHeader from "@/services/auth-header";


class CustomerService {

    customerAdd(customer) {

        customer.isCorporate = customer.taxNumber != '' || customer.taxNumber != null;


        return axios.post(process.env.VUE_APP_API_URL + '/car-service/customer-api/',
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                username: customer.username,
                mobilePhone: customer.mobilePhone,
                address: customer.address,
                isCorporate: customer.isCorporate,
                firmName: customer.firmName,
                taxNumber: customer.taxNumber,
                taxOffice: customer.taxOffice

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getSingleCustomer(id) {
        const params = {
            id: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/customer-get-api/`, {headers: authHeader(), params})


    }
    updateCustomer(customer) {

        const params = {
            id: customer.uuid

        };


        return axios.put(process.env.VUE_APP_API_URL + '/car-service/customer-api/',
            {

                firstName: customer.firstName,
                lastName: customer.lastName,
                username: customer.username,
                mobilePhone: customer.mobilePhone,
                address: customer.address,
                isCorporate: customer.isCorporate,
                firmName: customer.firmName,
                taxNumber: customer.taxNumber,
                taxOffice: customer.taxOffice

            }, {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }



    customerSendPassword(uuid,type) {

        const params = {
            id: uuid,
            type:type

        };


        return axios.post(process.env.VUE_APP_API_URL + '/car-service/customer-send-password-api/',
            {



            }, {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }




    customerGet(search, page, per_page) {

        axios.get(`http://localhost:8000/car-service/customer-api/?search=${search}&page=1&per_page=10`, {headers: authHeader()})
            .then(res => {
                return res.data.data;

            })
            .catch(err => console.log(err.response.data));


    }


    deleteCustomer(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/customer-api/`, {
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

export default CustomerService