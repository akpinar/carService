import axios from "axios";
import authHeader from "@/services/auth-header";

class SettingService{
    getSettings() {
         return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-settings-api/`, {headers: authHeader()}).then(res=>{return res.data;})
    }
}
export default SettingService