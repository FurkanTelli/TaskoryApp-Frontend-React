import axios from "axios";


const API_URL = "http://localhost:5300/api/users";

export const UserService = {
    getAllUsers: async () => {
        const repsonse = await axios.get(`${API_URL}/getUsers`);
        return repsonse;
    },
    getUserById: async (id) => {
        console.log(id)
        const response = await axios.post(`${API_URL}/getUser/${id}`);
        return response
    },
    loginUser: async (objToSend) => {
        const response = await axios.post(`${API_URL}/login`, objToSend)
        return response;
    },
    updateUser: async (id, objToSend) => {
        const response = await axios.put(`${API_URL}/updateUser/${id}`, objToSend);
        return response;
    },
    registerUser: async (objToSend) => {
        const response = await axios.post(`${API_URL}/createUser`, objToSend);
        return response;
    },
    deleteUser: async (id, objToSend) => {
        const response = await axios.delete(`${API_URL}/deleteUser/${id}`, {
            data:objToSend
        });
        return response;
    }
}

// export default UserService;