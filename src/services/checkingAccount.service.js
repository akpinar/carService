import axios from "axios";
import authHeader from "@/services/auth-header";

class CheckingAccountService {

    checkingAccountList() {

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/checking-account-api/`, {headers: authHeader()})


    }

    checkingAccountListByCustomer(id) {

        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/checking-customer-account-api/`, {headers: authHeader(),params})


    }

    getPaymentType() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/payment-type-select-api/`, {headers: authHeader()})


    }

    addPayment(payment) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/payment-account-api/',
            {
                checkingAccountUUID: payment.uuid,
                paymentAmount: payment.paymentAmount,
                paymentType: payment.paymentType


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    makeDiscount(discount) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/payment-discount-api/',
            {
                checkingAccountUUID: discount.uuid,
                paymentAmount: discount.paymentAmount,



            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


    getPaymentMovement(id) {
        const params = {
            uuid: id

        };
        return axios.get(process.env.VUE_APP_API_URL + '/car-service/payment-account-api/',


            {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


    getPaymentMovementPdf(id) {
        const params = {
            uuid: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-payment-movement-pdf-api/`,
        {
            responseType: 'arraybuffer',
            headers: authHeader(),
            params
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
        })


    }


}

export default CheckingAccountService