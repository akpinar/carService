import axios from "axios";
import authHeader from "@/services/auth-header";

class GeneralService {


    getGroups() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/group-api/`, {headers: authHeader()})


    }


}

export default GeneralService