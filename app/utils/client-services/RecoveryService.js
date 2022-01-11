import axios from 'axios';
import { RECOVERY_API_URL } from '../routes/api';


class RecoveryService {

  // sends reset password link to provided email
  static sendPasswordRecoveryEmailToUser = async ({ email }) => {
    return axios.post(RECOVERY_API_URL, { email });
  }

  // sends put request to update user's password
  static updatePassword =  async (formData, uid) => {
    return axios.put(`${RECOVERY_API_URL}/${uid}`, formData);
  };

};


export default RecoveryService;