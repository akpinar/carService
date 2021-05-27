import axios from "axios";
import authHeader from "@/services/auth-header";


class CarService {


    getCarApi(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-car-by-id-api/`, {
            headers: authHeader(),
            params
        })


    }


    carAdd(car) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/car-api/',
            {
                profileUuid: car.profileUuid,
                plate: car.plate,
                brand: car.brand,
                model: car.model,
                year: car.year,
                engine: car.engine,
                oilType: car.oilType,
                chassisNumber: car.chassisNumber,
                currentKM: car.currentKM,
                engineNumber: car.engineNumber,
                color: car.color

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    deleteCar(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/car-api/`, {
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

    carUpdate(car,uuid) {

        const params = {
            id: uuid

        };
        return axios.put(process.env.VUE_APP_API_URL + '/car-service/car-api/',

            {
                profileUuid: car.profileUuid,
                plate: car.plate,
                brand: car.brand,
                model: car.model,
                year: car.year,
                engine: car.engine,
                oilType: car.oilType,
                chassisNumber: car.chassisNumber,
                currentKM: car.currentKM,
                engineNumber: car.engineNumber,
                color: car.color

            }, {headers: authHeader(),params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }
}

export default CarService