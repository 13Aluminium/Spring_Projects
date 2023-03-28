import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8090/api/v1/users";

class EmployeeService {

    getUsers(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createUser(user){
        return axios.post(EMPLOYEE_API_BASE_URL, user);
    }

    getUserById(userId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + userId);
    }

    updateUser(user, userId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + userId);
    }
}

export default new EmployeeService()