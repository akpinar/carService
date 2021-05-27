import axios from "axios";
import authHeader from "@/services/auth-header";



class ServiceService {

    addService(service) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-api/',
            {
                carUUID: service.carUUID,
                serviceType: service.serviceType,
                serviceKM: service.serviceKM,
                complaint: service.complaint,
                responsiblePerson: service.responsiblePerson,
                serviceman: service.serviceman,
                camera:service.camera


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


    getServices() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/service-api/`, {headers: authHeader()})


    }

    getServiceType() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/service-type-select-api/`, {headers: authHeader()})


    }

    getServiceCamera(id) {
        const params = {
            uuid: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-camera-api/`, {headers: authHeader(),
        params})


    }

    getCarServices(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-car-services-api/`, {
            headers: authHeader(),
            params
        })


    }

    getServicesList(activePage) {
        const params = {
            activePage: activePage

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-services-api/`, {headers: authHeader(),params})


    }

    deleteService(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/service-api/`, {
            headers: authHeader(),
            params
        }).then(response => {
            return response;
        })


    }


    getServiceDetail(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-service-detail-api/`, {
            headers: authHeader(),
            params
        })


    }

    addServiceDetermination(uuid, photos, products, determination, laborPrice, laborTaxRate, laborName) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-determination-api/',
            {
                uuid: uuid,
                photos: photos,
                products: products,
                determination: determination,
                laborPrice: laborPrice,
                laborTaxRate: laborTaxRate,
                laborName: laborName


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getServiceProducts(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-service-products-api/`, {
            headers: authHeader(),
            params
        })


    }


    getServiceImages(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-service-images-api/`, {
            headers: authHeader(),
            params
        })


    }

    getServicePdf(id) {
        const params = {
            uuid: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-service-pdf-api/`,
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

    acceptService(uuid, isAccept) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-approve-api/',
            {
                uuid: uuid,
                isAccept: isAccept,


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch((err) => {
            if (err.response) {
                return err.response
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        });


    }

    getServiceCameraSelect() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/camera-select-api/`, {headers: authHeader()})


    }

    ServiceProcessing(uuid, situationNo, receiverPerson) {
        if (situationNo === 3) {

            return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-processing-api/',
                {
                    uuid: uuid,
                    situationNo: situationNo,
                    receiverPerson: receiverPerson


                }, {headers: authHeader()}).then(response => {


                return response;
            }).catch(error => {
                return error
            });


        } else {
            return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-processing-api/',
                {
                    uuid: uuid,
                    situationNo: situationNo,


                }, {headers: authHeader()}).then(response => {


                return response;
            }).catch(error => {
                return error
            });
        }


    }


}

export default ServiceService