import axios from "axios";
import authHeader from "@/services/auth-header";


class StaffService {


    deleteStaff(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/staff-api/`, {
            headers: authHeader(),
            params
        }).then(response => {
            return response;
        }).catch(error => {
            return error;
        });


    }


    addStaff(staff) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/staff-api/',
            {
                firstName: staff.firstName,
                lastName: staff.lastName,
                username: staff.username,
                mobilePhone: staff.mobilePhone,
                address: staff.address,
                group: staff.group


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


    updateStaff(staff) {

        const params = {
            id: staff.uuid

        };


        return axios.put(process.env.VUE_APP_API_URL + '/car-service/staff-api/',
            {

               firstName: staff.firstName,
                lastName: staff.lastName,
                username: staff.username,
                mobilePhone: staff.mobilePhone,
                address: staff.address,
                group: staff.group


            }, {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }



    getStaffs() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/staff-api/`, {headers: authHeader()})


    }

    getStaff(id) {
        const params = {
            id: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/staff-api/`, {headers: authHeader(), params})


    }

    getServicemanSelect() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/serviceman-select-api/`, {headers: authHeader()})


    }


}

export default StaffService